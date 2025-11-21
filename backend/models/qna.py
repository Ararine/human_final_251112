import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 댓글 생성
def insert_qna(user_id: str,title:str, contents: str):
    query = text("""
    INSERT INTO qna (user_id, title, contents) VALUES (:user_id, :title, :contents)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "user_id": user_id, "title": title, "contents": contents})
        conn.commit()
    return result.lastrowid

def checked_title(title:str):
    query = text("""
    select * from qna where title = :title
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "title": title, })
        conn.commit()
    return result.lastrowid
