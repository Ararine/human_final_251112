import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 댓글 생성
def insert_comment(post_id: str, user_id: str, comments: str):
    query = text("""
    INSERT INTO comment (post_id, comment_user_id, comment)
    VALUES (:post_id, :user_id, :comments)
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {
            "post_id": post_id, "user_id": user_id, "comments": comments})
        conn.commit()
    return result.lastrowid

# 해당 게시글의 댓글 조회
def get_comments_by_post_id(post_id: int):
    query = text("SELECT c.*, u.email FROM comment c JOIN user u ON c.comment_user_id = u.id  WHERE post_id = :post_id")
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"post_id": post_id})
    return df.to_dict(orient="records")


# 특정 댓글 수정
def update_comment_by_id(comment_id: int, comments: str):
    query = text("UPDATE comment SET comment = :comments  WHERE id = :comment_id")
    with engine.connect() as conn:
        result = conn.execute(query, {"comments": comments, "comment_id": comment_id})
        conn.commit()
    return result.rowcount

# 특정 댓글 삭제
def delete_comment_by_id(comment_id: int):
    query = text("DELETE FROM comment WHERE id = :comment_id ")
    with engine.connect() as conn:
        result = conn.execute(query, {"comment_id": comment_id})
        conn.commit()
    return result.rowcount