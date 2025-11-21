# services/auth.py
from db.pool import execute_query
from fastapi import HTTPException
import pymysql
from config import config

# DB 연결
def get_connection():
    conn = pymysql.connect(
        host=config["DB"]["HOST"],
        user=config["DB"]["USER_ID"],
        password=config["DB"]["PASSWORD"],
        db="final",
        port=config["DB"]["PORT"],
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn

# 회원가입
def register_user(email, password, gender=None, age=None, height=None, weight=None):
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            # 1. user 테이블 insert
            sql_user = """
            INSERT INTO user (email, password)
            VALUES (%s, %s)
            """
            cursor.execute(sql_user, (email, password))
            user_id = cursor.lastrowid  # 방금 생성된 PK

            # 2. user_base_info 테이블 insert
            sql_base = """
            INSERT INTO user_base_info (user_id, gender, age, height, weight)
            VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql_base, (user_id, gender, age, height, weight))

            conn.commit()
            return {"message": "User registered successfully", "user_id": user_id}

    except Exception as e:
        raise Exception(f"DB Error: {str(e)}")
    finally:
        conn.close()
