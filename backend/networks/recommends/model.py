import os 
import pandas as pd
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from dotenv import load_dotenv
load_dotenv()
GEMINI_API = os.getenv("GEMINI_API")

class recommendModel:
    def __init__(self, api_key, model = "gemini-2.5-flash"):
        self.api = api_key
        self.llm = ChatGoogleGenerativeAI(
            model=model, google_api_key=self.api,
            temperature=0)
        self.model_name = model
        
    def get_meal_parser(self, target):
        class MealItem(BaseModel):
            음식명: str = Field(description="사용할 음식 목록에 있는 음식의 이름")
            중량_g: int = Field(description="음식의 중량(g)")

        class DayMeal(BaseModel):
            self.today = pd.Timestamp.today()
            self.dates = [(self.today + pd.Timedelta(days=i)).strftime('%Y-%m-%d') for i in range(3)]
            
            날짜: str = Field(description=f"{', '.join(self.dates)}날부터 연속적으로 YYYY-MM-DD 형태로 생성된 날짜 문자열")
            끼니별_식단: list[list[MealItem]] = Field(
                description="각 끼니별 음식 리스트. 예: [[아침_음식1, 아침_음식2], [점심_음식1, 점심_음식2], ...]"
            )

        class MealPlan(BaseModel):
            일자별_식단: list[DayMeal] = Field(description=f"{target} 목표를 위한 날짜별 식단 계획")

        # Parser 생성
        parser = JsonOutputParser(pydantic_object=MealPlan)
        format_instructions = parser.get_format_instructions()
        return parser, format_instructions
    
    def get_exercise_parser(self, target):
        class ExerciseItem(BaseModel):
            운동명: str = Field(description="운동 이름")
            세트: int = Field(description="세트 수")
            반복횟수: int = Field(description="1세트 당 반복 횟수")
            난이도: str = Field(description="난이도 (초급, 중급, 고급 등)")
            휴식_초: int = Field(description="세트 사이 휴식 시간(초)")

        class DayPlan(BaseModel):
            self.today = pd.Timestamp.today()
            self.dates = [(self.today + pd.Timedelta(days=i)).strftime('%Y-%m-%d') for i in range(3)]
            
            날짜: str = Field(description=f"{', '.join(self.dates)}날부터 연속적으로 YYYY-MM-DD 형태로 생성된 날짜 문자열")
            운동목록: list[ExerciseItem] = Field(description=f"{target}을 위한 해당 날짜의 운동 목록")

        class WorkoutCurriculum(BaseModel):
            총일수: int = Field(description=f"{target}을 위한 총 운동일 수 (n일)")
            일자별_운동: list[DayPlan] = Field(description=f"{target}을 위한 n일간 운동 커리큘럼")

        parser = JsonOutputParser(pydantic_object=WorkoutCurriculum)
        format_instructions = parser.get_format_instructions()
        return parser, format_instructions

    def get_chain(self, template, input_variables, parser, format_instructions):
        prompt = PromptTemplate(
            template=template,
            input_variables= input_variables,
            partial_variables={
                "format_instructions": format_instructions}
        )
        chain = prompt | self.llm | parser
        return chain


gemini_api = GEMINI_API
recommend_model = recommendModel(gemini_api)

# df = pd.read_excel(
#     "backend/networks/recommends/음식분류 AI 데이터 영양DB.xlsx")


# user_info = "사용자는 23세 몸무게 80kg 키 160cm 남성입니다. 다이어트를 목적으로 운동하고 있습니다."

# template = f"""
# 당신은 영양사입니다. 다음 음식명을 사용하여 
# 근력 향상에 좋은 3끼 식사를 조합하여 식단을 추천해주세요. 
# 각 끼니의 음식과 중량(g)을 적어주세요. 

# 대상자의 신체정보입니다.
# {user_info}

# 조건:
# - 근력 향상에 적합한 단백질 비율을 고려
# - 같은 음식 중복 금지
# - 3끼 구성
# - 칼로리 합계는 2000~2500 kcal 정도로 맞출 것

# 사용할 음식 목록: {{food_names}}

# {{format_instructions}}
# """

# food_name_list = df["음 식 명"].tolist()

# parser, format_instructions = recommend_model.get_meal_parser("근력 향상")
# chain = recommend_model.get_chain(
#     template, ["food_names"], parser, format_instructions)

# parsed_result = chain.invoke({"food_names": food_name_list})
# parsed_result
