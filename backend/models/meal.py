import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 기본 운동 생성
def insert_base_meal(name: str, calories: float, link: str):
    query = text("""
    INSERT INTO base_meals (name, calories, link)
    VALUES (:name, :calories, :link)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "name": name, "calories": calories, "link": link})
        conn.commit()
    return result.lastrowid

# 기본 운동 조회
def get_base_meals():
    query = text("SELECT * FROM base_meals")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    return df.to_dict(orient="records")

def get_base_meal_by_id(meal_id: int):
    query = text("SELECT * FROM base_meals WHERE id = :meal_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"meal_id": meal_id})
    return df.to_dict(orient="records")


# 기본 운동 수정
def update_base_meal_by_id(
    meal_id: int, name: str, calories: float, link: str):
    query = text(
        """UPDATE base_meals 
        SET name = :name, calories = :calories, link = :link 
        WHERE id = :meal_id"""
        )
    with engine.connect() as conn:
        result = conn.execute(
            query, {
                "name": name, "calories": calories,
                "link": link, "meal_id": meal_id})
        conn.commit()
    return result.rowcount

# 기본 운동 삭제
def delete_base_meal_by_id(meal_id: int):
    query = text("DELETE FROM base_meals WHERE id = :meal_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"meal_id": meal_id})
        conn.commit()
    return result.rowcount