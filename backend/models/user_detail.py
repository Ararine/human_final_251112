import pandas as pd
from sqlalchemy import text

from db.pool import engine

from sqlalchemy import text

# 사용자 상세 정보 생성
def create_user_detail_info(
    user_id: int, goal: str, job: str,
    activity_level: str, activity_duration: float,
    sleep_duration: float, chronotype: str,
    disease: str, equipment: str,
    food_restrictions: str, water_intake: float):
    
    query = text("""
    INSERT INTO user_detail_info 
        (
            user_id, goal, job, activity_level, 
            activity_duration, sleep_duration,
            chronotype, disease, equipment, 
            food_restrictions, water_intake
        )
    VALUES (
        :user_id, :goal, :job, :activity_level, 
        :activity_duration, :sleep_duration,
        :chronotype, :disease, :equipment, 
        :food_restrictions, :water_intake
    )
    """)
    
    params = {
        "user_id": user_id,
        "goal": goal,
        "job": job,
        "activity_level": activity_level,
        "activity_duration": activity_duration,
        "sleep_duration": sleep_duration,
        "chronotype": chronotype,
        "disease": disease,
        "equipment": equipment,
        "food_restrictions": food_restrictions,
        "water_intake": water_intake
    }

    with engine.begin() as conn:  # 자동 커밋/롤백
        result = conn.execute(query, params)
    
    return result.lastrowid

# 사용자 상세정보 조회
def get_user_detail_info_by_id(user_id: int):
    query = text("SELECT * FROM user_detail_info where user_id = :user_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
        df["activity_duration"] = df["activity_duration"].astype(str)  
        df["sleep_duration"] = df["sleep_duration"].astype(str)  
    return df.to_dict(orient="records")

# 사용자 상세정보 수정
def update_user_detail_info_by_id(
    user_id: int, goal: str, job: str,
    activity_level: str, activity_duration: float,
    sleep_duration: float, chronotype: str,
    disease: str, equipment: str,
    food_restrictions: str, water_intake: float
):
    query = text("""
        UPDATE user_detail_info
        SET goal = :goal,
            job = :job,
            activity_level = :activity_level,
            activity_duration = :activity_duration,
            sleep_duration = :sleep_duration,
            chronotype = :chronotype,
            disease = :disease,
            equipment = :equipment,
            food_restrictions = :food_restrictions,
            water_intake = :water_intake
        WHERE user_id = :user_id
    """)
    
    params = {
        "user_id": user_id,
        "goal": goal,
        "job": job,
        "activity_level": activity_level,
        "activity_duration": activity_duration,
        "sleep_duration": sleep_duration,
        "chronotype": chronotype,
        "disease": disease,
        "equipment": equipment,
        "food_restrictions": food_restrictions,
        "water_intake": water_intake
    }

    with engine.begin() as conn:  # 자동 commit/rollback
        result = conn.execute(query, params)
    
    return result.rowcount

# 사용자 상세정보 삭제
def delete_user_detail_info_by_id(user_id: int):
    query = text("DELETE FROM user_detail_info WHERE user_id = :user_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        conn.commit()
    return result.rowcount