import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 기본 운동 생성
def insert_exercise(name: str, type: str, link: str):
    query = text("""
    INSERT INTO base_exercises (name, type, link)
    VALUES (:name, :type, :link)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "name": name, "type": type, "link": link})
        conn.commit()
    return result.lastrowid

# 기본 운동 조회
def get_exercies():
    query = text("SELECT * FROM base_exercises")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    return df.to_dict(orient="records")

def get_exercies_by_ex_id(ex_id: int):
    query = text("SELECT * FROM base_exercises WHERE id = :ex_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"ex_id": ex_id})
    return df.to_dict(orient="records")


# 기본 운동 수정
def update_exercise_by_ex_id(ex_id: int, name: str, type: str, link: str):
    query = text("UPDATE base_exercises SET name = :name, type = :type, link = :link WHERE id = :ex_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"name": name, "type": type, "link": link, "ex_id": ex_id})
        conn.commit()
    return result.rowcount

# 기본 운동 삭제
def delete_exercise_by_ex_id(ex_id: int):
    query = text("DELETE FROM base_exercises WHERE id = :ex_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"ex_id": ex_id})
        conn.commit()
    return result.rowcount


###########

# 기본 운동 생성
def insert_curriculum(
    user_id: int, start_date: str, end_date: str, file_url:str
    ):
    query = text("""
    INSERT INTO curriculum_hist (
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

def get_curriculum_by_id(user_id: int, today_date:str):
    query = text("""
        SELECT *
        FROM curriculum_hist
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


def delete_curriculum_by_id(user_id: int, today_date: str):
    query = text("""
        DELETE FROM curriculum_hist
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