import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 사용자 기본 생성
def create_user_base_info(
    user_id: str, gender: str, age:int, height:float, weight:float,
    bmi:float, bmr:float
    ):
    user_base_query = text("""
    INSERT INTO user_base_info (user_id, gender, age, height, weight)
    VALUES (:user_id, :gender, :age, :height, :weight)
    """)

    body_history_query = text("""
        INSERT INTO body_history (
            user_id, weight, height, bmi, bmr
        ) VALUES (
            :user_id, :weight, :height, :bmi, :bmr
        )
    """)
    params = {
        "user_id": user_id,
        "weight": weight, "height": height,
        "bmi": bmi, "bmr": bmr
    }
        
    with engine.connect() as conn:
        result = conn.execute(user_base_query, {
            "user_id": user_id, "gender": gender, "age":age, 
            "height":height, "weight":weight})
        result = conn.execute(body_history_query, params)
        conn.commit()
    return result.lastrowid

# 사용자 기본정보 조회
def get_user_base_info_by_id(user_id: int):
    query = text("SELECT * FROM user_base_info where user_id = :user_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
        df["created_at"] = df["created_at"].astype(str)  
    return df.to_dict(orient="records")

# 사용자 기본정보 수정
def update_user_base_info_by_id(
    user_id: int, gender:str, age:str, height:float, weight:float,
    bmi:float, bmr:float):
    user_base_query = text(
        """
        UPDATE user_base_info 
        SET gender = :gender, age = :age, 
            height = :height, weight = :weight 
        WHERE user_id = :user_id
        """)
    user_base_params = {
                "user_id": user_id,
                "gender": gender,
                "age": age,
                "height": height,
                "weight": weight
            }
    body_history_query = text("""
        INSERT INTO body_history (
            user_id, weight, height, bmi, bmr
        ) VALUES (
            :user_id, :weight, :height, :bmi, :bmr
        )
    """)
    body_history_params = {
        "user_id": user_id,
        "weight": weight, "height": height,
        "bmi": bmi, "bmr": bmr
    }
        
    with engine.connect() as conn:
        result = conn.execute(user_base_query, user_base_params)
        result = conn.execute(body_history_query, body_history_params)
        conn.commit()
    return result.rowcount

# 사용자 삭제
def delete_user_base_info_by_id(user_id: int):
    query = text("DELETE FROM user_base_info WHERE id = :user_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        conn.commit()
    return result.rowcount