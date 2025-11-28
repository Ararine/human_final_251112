import json, faiss, os
import pandas as pd
from huggingface_hub import login
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel, Field
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser
from dotenv import load_dotenv
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
GEMINI_API = os.getenv("GEMINI_API")

# 허깅 페이스 로그인 API
login(token=HF_TOKEN)
# gemini api 
gemini_api = GEMINI_API
genai.configure(api_key=gemini_api)
saved_dir = "backend/networks/recommends"


model = SentenceTransformer("jhgan/ko-sroberta-multitask")
df = pd.read_excel(
    "backend/networks/recommends/음식분류 AI 데이터 영양DB.xlsx")

def row_to_text_all_columns(row):
    return " | ".join([f"{col}: {row[col]}" for col in row.index])

texts = df.apply(row_to_text_all_columns, axis=1).tolist()
metadatas = df.to_dict(orient="records")

"""
faiss 기반 벡터 스토어 생성(미활용)
"""
# embeddings = model.encode(
#     texts, 
#     normalize_embeddings=True,
#     show_progress_bar=True)

# dim = embeddings.shape[1]  # 벡터 차원
# index = faiss.IndexFlatIP(dim)  # 내적 기반 검색
# index.add(embeddings)
# with open(f"{saved_dir}/food_metadata.json", "w", encoding="utf-8") as f:
#     json.dump(metadatas, f, ensure_ascii=False, indent=2)
    
# faiss.write_index(index, f"{saved_dir}/theme_index.faiss")

"""
벡터 스토어 기반 식단 추천(미활용)
파이프라인
 1. 조건을 만족하는 상위 30개 음식 목록 추출
 2. 음식을 기반으로 식단 조합
"""

# #  1. 조건을 만족하는 상위 30개 음식 목록 추출
# # 로드
# with open(f"{saved_dir}/food_metadata.json", "r", encoding="utf-8") as f:
#     metadatas = json.load(f)
# index = faiss.read_index(f"{saved_dir}/theme_index.faiss")
# model = SentenceTransformer("jhgan/ko-sroberta-multitask")

# query = "몸무게가 60kg 키가 180cm 인 사람을 위한 에너지 낮고 단백질 높고 트랜스지방 낮고 나트륨 낮은 음식 추천해줘"
# query_emb = model.encode([query], normalize_embeddings=True)
# D, I = index.search(query_emb, 30)

# results = [metadatas[i] for i in I[0]]
# candidates = pd.DataFrame(results)

# #  2. 음식을 기반으로 식단 조합
# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash", google_api_key=gemini_api)

# # 개별 음식 항목의 구조
# class MealItem(BaseModel):
#     음식명: str = Field(description="사용할 음식 목록에 있는 음식의 이름")
#     중량_g: int = Field(description="음식의 중량(g)")

# # 전체 식단 계획의 최종 구조
# class MealPlan(BaseModel):
#     아침_식단: list[MealItem] = Field(description="근력 향상을 위한 아침 식사의 구성 음식들 (음식명과 중량 리스트)")
#     점심_식단: list[MealItem] = Field(description="근력 향상을 위한 점심 식사의 구성 음식들 (음식명과 중량 리스트)")
#     저녁_식단: list[MealItem] = Field(description="근력 향상을 위한 저녁 식사의 구성 음식들 (음식명과 중량 리스트)")

# template = """
# 당신은 영양사입니다. 다음 음식명을 사용하여 
# 근력 향상에 좋은 3끼 식사 조합을 추천해주세요. 
# 각 끼니의 음식과 중량(g)을 적어주세요. 

# 조건:
# - 근력 향상에 적합한 단백질 비율을 고려
# - 같은 음식 중복 금지
# - 3끼 구성
# - 칼로리 합계는 2000~2500 kcal 정도로 맞출 것

# 사용할 음식 목록: {food_names}

# {format_instructions}
# """
# # JsonOutputParser 생성 및 형식 지침 가져오기
# parser = JsonOutputParser(pydantic_object=MealPlan)
# format_instructions = parser.get_format_instructions()

# prompt = PromptTemplate(
#     template=template,
#     input_variables=["food_names"],
#     partial_variables={"format_instructions": format_instructions}
# )
# chain = prompt | llm | parser
# food_names = candidates["음 식 명"].tolist()
# parsed_result = chain.invoke({"food_names": food_names})
# parsed_result

"""
LangChain 기반 식단 추천
"""

class MealItem(BaseModel):
    음식명: str = Field(description="사용할 음식 목록에 있는 음식의 이름")
    중량_g: int = Field(description="음식의 중량(g)")

class MealPlan(BaseModel):
    아침_식단: list[MealItem] = Field(description="근력 향상을 위한 아침 식사의 구성 음식들 (음식명과 중량 리스트)")
    점심_식단: list[MealItem] = Field(description="근력 향상을 위한 점심 식사의 구성 음식들 (음식명과 중량 리스트)")
    저녁_식단: list[MealItem] = Field(description="근력 향상을 위한 저녁 식사의 구성 음식들 (음식명과 중량 리스트)")

# JsonOutputParser 생성 및 형식 지침 가져오기
parser = JsonOutputParser(pydantic_object=MealPlan)
format_instructions = parser.get_format_instructions()

template = """
당신은 영양사입니다. 다음 음식명을 사용하여 
근력 향상에 좋은 3끼 식사를 조합하여 식단을 추천해주세요. 
각 끼니의 음식과 중량(g)을 적어주세요. 

조건:
- 근력 향상에 적합한 단백질 비율을 고려
- 같은 음식 중복 금지
- 3끼 구성
- 칼로리 합계는 2000~2500 kcal 정도로 맞출 것

사용할 음식 목록: {food_names}

{format_instructions}
"""

prompt = PromptTemplate(
    template=template,
    input_variables=["food_names"],
    partial_variables={"format_instructions": format_instructions}
)
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", google_api_key=gemini_api)
chain = prompt | llm | parser

# 체인 실행
with open(f"{saved_dir}/food_metadata.json", "r", encoding="utf-8") as f:
    metadatas = json.load(f)

food_names = [i["음 식 명"] for i in metadatas]

parsed_result = chain.invoke({"food_names": food_names})
parsed_result