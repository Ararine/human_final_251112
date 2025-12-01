import pandas as pd
from networks.recommends.model import recommend_model

from models import exercise, user

def create_curriculum(user_id, n_days, available_time):
    
    # 사용자 정보
    user_info = user.get_user_info(user_id)
    df = user_info.drop(
        ["created_at", "points", "is_public", 
         "user_id", "food_restrictions", "water_intake"
         ],axis=1)
    row = df.iloc[0]
    info_str = ', '.join(
        [f"{col}: {str(row[col])}" for col in df.columns])

    template = f"""
    당신은 10년 경력의 전문 퍼스널 트레이너(PT)입니다.  
    아래 대상자의 신체 정보와 조건을 바탕으로 
    사용자의 신체 정보와 조건을 고려하여 
    {n_days}일간 근력 향상 운동 계획을 작성해주세요.

    [운동 가능 시간 정보]
    사용자가 하루에 운동할 수 있는 시간: {available_time}분
    
    대상자의 신체정보입니다.
    {info_str}

    조건:
    - 각 날마다 3~5개의 운동 포함
    - 주 3~5회 운동 기준
    - 같은 운동 중복 금지
    - 하루 총 운동 시간({available_time}분)을 넘지 않도록 세트/횟수 조절
    
    - 각 운동은 '운동명 / 세트 × 횟수 / 난이도 / 휴식시간' 형태로 제시
    - 상체·하체·전신 운동이 균형 있게 포함될 것
    - 대상자의 직업, 활동량, 수면 패턴을 고려한 난이도 조절
    - 적절히 휴식일도 섞어서 제공할 것
    - 기구 사용 정보에 맞게 운동 선정 (예: 덤벨, 바벨 있음 → 해당 도구 사용)
    - 초보자도 이해할 수 있게 간단한 설명 포함
    - 운동은 반드시 아래 제공된 운동 목록(ex_names) 안에서만 선택
    - 운동명은 변경하지 말 것
    
    참고 가능한 운동 목록: {{ex_names}}

    {{format_instructions}}
    """
    target=row["goal"]
    parser, format_instructions = recommend_model.get_exercise_parser(target)
    chain = recommend_model.get_chain(
        template, ["ex_names"], parser, format_instructions)
    # 기본 운동 목록 및 링크 정보
    ex_data = exercise.get_exercies()
    ex_data = pd.DataFrame(ex_data)
    ex_list = ex_data["name"]
    result = chain.invoke({"ex_names": ex_list})
    
    # 결과에 링크 정보 추가
    link_dict = pd.Series(ex_data.link.values, index=ex_data.name).to_dict()
    for day in result['일자별_운동']:
        for ex in day['운동목록']:
            ex_name = ex['운동명']
            ex['link'] = link_dict.get(ex_name, None)  # 없으면 None
    return result

# 기본 운동 생성
def create_exercise(name:str, type:str, link:str):
    post_id = exercise.insert_exercise(name, type, link)
    return post_id

# 기본 운동 조회
def get_exercies():
    post_data = exercise.get_exercies()
    return post_data

def get_exercies_by_ex_id(ex_id: int):
    post_data = exercise.get_exercies_by_ex_id(ex_id)
    return post_data

# 기본 운동 수정
def update_exercise_by_ex_id(ex_id: int, name: str, type:str, link:str):
    updated = exercise.update_exercise_by_ex_id(ex_id, name, type, link)
    return updated

# 기본 운동 삭제
def delete_exercise_by_ex_id(ex_id: int):
    deleted = exercise.delete_exercise_by_ex_id(ex_id)
    return deleted