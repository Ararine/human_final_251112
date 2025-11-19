import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 게시글 생성
def insert_post(title: str, contents: str, user_id: str):
    query = text("INSERT INTO post (title, contents, user_id) VALUES (:title, :contents, :user_id)")
    with engine.connect() as conn:
        result = conn.execute(query, {"title": title, "contents": contents, "user_id": user_id})
        conn.commit()
        return result.lastrowid

# 게시글 전체 조회
def fetch_all_posts():
    query = text("SELECT * FROM post")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    # datetime → 문자열 변환
    df["create_at"] = df["create_at"].astype(str) 
    df["updated_at"] = df["updated_at"].astype(str)  
    return df.to_dict(orient="records")

# 게시글 상세 조회
def fetch_post_by_id(post_id: int):
    query = text("SELECT * FROM post WHERE id=:post_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"post_id": post_id})
    # datetime → 문자열 변환
    df["create_at"] = df["create_at"].astype(str) 
    df["updated_at"] = df["updated_at"].astype(str)  
    return df.to_dict(orient="records")

# 게시글 수정
def update_post_by_id(post_id: int, title: str, contents: str):
    query = text("UPDATE post SET title=:title, contents=:contents WHERE id=:post_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"title": title, "contents": contents, "post_id": post_id})
        conn.commit()
        return result.rowcount > 0

# 게시글 삭제
def delete_post_by_id(post_id: int):
    query = text("DELETE FROM post WHERE id=:post_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"post_id": post_id})
        conn.commit()
        deleted = result.rowcount > 0
    return deleted