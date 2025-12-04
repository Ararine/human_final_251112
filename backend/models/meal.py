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
    query = text("SELECT * FROM base_meals WHERE link IS NOT NULL AND link <> ''")
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

###########

def insert_meals_hist(
    user_id: int, start_date: str, end_date: str, file_url:str
    ):
    query = text("""
    INSERT INTO meals_hist (
        user_id, start_date, end_date, file_url)
    VALUES (:user_id, :start_date, :end_date, :file_url)
    """
    )
    with engine.connect() as conn:
        result = conn.execute(query,{
            "user_id":user_id, "start_date":start_date, 
            "end_date":end_date, "file_url":file_url})
        conn.commit()
    return result.lastrowid

def get_meals_hist_by_id(user_id: int, today_date:str):
    query = text("""
        SELECT *
        FROM meals_hist
        WHERE user_id = :user_id
          AND start_date <= :today_date
          AND end_date >= :today_date
    """)
    
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id, "today_date":today_date})
        df["created_at"] = df["created_at"].astype(str)  
        df["start_date"] = df["start_date"].astype(str)  
        df["end_date"] = df["end_date"].astype(str)  
    return df.to_dict(orient="records")


def delete_meals_hist_by_id(user_id: int, today_date: str):
    query = text("""
        DELETE FROM meals_hist
        WHERE user_id = :user_id
          AND start_date <= :today_date
          AND end_date >= :today_date
    """)

    # engine.begin() → 트랜잭션 자동 commit
    with engine.connect() as conn:
        result = conn.execute(query, {
            "user_id": user_id,
            "today_date": today_date
        })
        conn.commit()
    return result.rowcount 