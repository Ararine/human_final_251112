import pandas as pd
from sqlalchemy import text

from db.pool import engine
# 출석
def insert_attendance(user_id: str):
    query = text("INSERT INTO attendance (user_id) VALUES (:user_id)")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        conn.commit()
    return result.lastrowid


# 개별 당일 출석
def get_today_attendance_by_user_id(user_id: int):
    query = text("SELECT * FROM attendance  WHERE user_id = :user_id AND attended_at = CURRENT_DATE")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
    if df.shape[0]:
        df["attended_at"] = df["attended_at"].astype(str) 
    return df.to_dict(orient="records")

# 개인별 모든 출석
def get_attendance_by_user_id(user_id: int):
    query = text("SELECT * FROM attendance  WHERE user_id = :user_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
    if df.shape[0]:
        df["attended_at"] = df["attended_at"].astype(str) 
    return df.to_dict(orient="records")


# 상점 추가
def update_attendance_score(user_id: int):
    query = text("UPDATE user SET points = points + 20  WHERE id = :user_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        conn.commit()
    return result.rowcount