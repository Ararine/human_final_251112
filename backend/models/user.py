import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 사용자 생성(미사용)
def create_user(email: str, password: str):
    query = text("""
    INSERT INTO user (email, password)
    VALUES (:email, :password)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "email": email, "password": password})
        conn.commit()
    return result.lastrowid

# 사용자 조회
def get_user():
    query = text("SELECT id, email, type, is_active, points FROM user")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    return df.to_dict(orient="records")

# 로그인
def get_user_by_email(email: str):
    query = text("SELECT * FROM user WHERE  email = :email")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"email": email})
    return df.to_dict(orient="records")


# 사용자 수정
def update_user_by_id(user_id: int, email: str, password: str):
    query = text("UPDATE user SET email = :email, password = :password WHERE id = :user_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id, "email": email, "password": password})
        conn.commit()
    return result.rowcount

# 사용자 활성화/비활성화
def update_user_active_by_id(user_id: int, changed_active:int):
    query = text("UPDATE user SET is_active = :is_active WHERE id = :user_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id, "is_active": changed_active})
        conn.commit()
    return result.rowcount

# 사용자 삭제
def delete_user_by_id(user_id: int):
    query = text("DELETE FROM user WHERE id = :user_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        conn.commit()
    return result.rowcount

# 사용자 생성
def create_user_with_base_info(
    email: str, password: str,
    gender: str, age: int, height: float, weight: float
):
    with engine.begin() as conn:  # 트랜잭션 시작
        # user 생성
        user_query = text("""
            INSERT INTO user (email, password)
            VALUES (:email, :password)
        """)
        result = conn.execute(user_query, {"email": email, "password": password})
        user_id = result.lastrowid

        # user_base_info 생성
        base_query = text("""
            INSERT INTO user_base_info (user_id, gender, age, height, weight)
            VALUES (:user_id, :gender, :age, :height, :weight)
        """)
        result = conn.execute(base_query, {
            "user_id": user_id, "gender": gender,
            "age": age, "height": height, "weight": weight
        })
    return result.lastrowid

def get_user_info(user_id: int):
    query = """
    SELECT * 
    FROM user_base_info ub 
    JOIN user_detail_info ud
        ON ub.user_id = ud.user_id
    WHERE  ub.user_id = :user_id
    """
    query = text(query)
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
    return df
