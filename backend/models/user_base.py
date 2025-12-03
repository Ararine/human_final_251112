import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 사용자 기본 생성
def create_user_base_info(user_id: str, gender: str, age:int, height:float, weight:float):
    query = text("""
    INSERT INTO user_base_info (user_id, gender, age, height, weight)
    VALUES (:user_id, :gender, :age, :height, :weight)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "user_id": user_id, "gender": gender, "age":age, 
            "height":height, "weight":weight})
        conn.commit()
    return result.lastrowid

# 사용자 기본정보 조회
def get_user_base_info_by_id(user_id: int):
    print(user_id)
    query = text("SELECT * FROM user_base_info where user_id = :user_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
        df["created_at"] = df["created_at"].astype(str)  
    return df.to_dict(orient="records")

# 사용자 기본정보 수정
def update_user_base_info_by_id(user_id: int, gender:str, age:str, height:float, weight:float):
    query = text("UPDATE user_base_info SET gender = :gender, age = :age, height = :height, weight = :weight WHERE id = :user_id")
    with engine.connect() as conn:
        params = {
            "user_id": user_id,
            "gender": gender,
            "age": age,
            "height": height,
            "weight": weight
        }
        result = conn.execute(query, params)
        conn.commit()
    return result.rowcount

# 사용자 삭제
def delete_user_base_info_by_id(user_id: int):
    query = text("DELETE FROM user_base_info WHERE id = :user_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        conn.commit()
    return result.rowcount