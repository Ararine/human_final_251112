import pandas as pd
from sqlalchemy import text

from db.pool import engine

# 1. QnA 생성 (INSERT)
def insert_qna(user_id: int, title: str, contents: str):
    query = text("""
        INSERT INTO qna (user_id, title, contents)
        VALUES (:user_id, :title, :contents)
    """)

    with engine.connect() as conn:
        result = conn.execute(query, {
            "user_id": user_id,
            "title": title,
            "contents": contents
        })
        conn.commit()

    return result.lastrowid

# 2. 제목 중복 체크
def checked_title(title: str):
    query = text("""
        SELECT * FROM qna WHERE title = :title
    """)

    with engine.connect() as conn:
        result = conn.execute(query, {"title": title})
        rows = result.fetchall()

    return len(rows) > 0   # 있으면 True

# 3. 모든 QnA 목록 조회 (SELECT ALL)
def get_all_qna():
    query = """
        SELECT 
            q.*, 
            u.email
        FROM qna AS q
        INNER JOIN user AS u
            ON q.user_id = u.id
        ORDER BY q.created_at DESC;
    """
    query = text(query)
    with engine.connect() as conn:
        df = pd.read_sql(query, conn)
    df["created_at"] = df["created_at"].astype(str) 
    df["updated_at"] = df["updated_at"].astype(str) 

    return df.to_dict(orient="records")

# 4. 특정 QnA 한 개 조회 (SELECT ONE)
def get_qna_by_id(qna_id: int):
    query = text("""
        SELECT * FROM qna WHERE id = :id
    """)

    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"id": qna_id})
    df["created_at"] = df["created_at"].astype(str) 
    df["updated_at"] = df["updated_at"].astype(str) 

    return df.to_dict(orient="records")

# 5. QnA 수정 (UPDATE)
def update_qna(qna_id: int, title: str, contents: str):
    query = text("""
        UPDATE qna
        SET title = :title,
            contents = :contents,
            updated_at = NOW()
        WHERE id = :id
    """)

    with engine.connect() as conn:
        result = conn.execute(query, {
            "id": qna_id,
            "title": title,
            "contents": contents
        })
        conn.commit()

    return result.rowcount   # 수정된 row 수

# 6. QnA 삭제 (DELETE)
def delete_qna(qna_id: int):
    query = text("""
        DELETE FROM qna WHERE id = :id
    """)

    with engine.connect() as conn:
        result = conn.execute(query, {"id": qna_id})
        conn.commit()

    return result.rowcount

# 7. 해당 유저의 QnA 목록 조회
def get_qna_by_user_id(user_id: int):
    query = text("""
        SELECT * FROM qna WHERE user_id = :user_id ORDER BY created_at DESC
    """)
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})
        df["created_at"] = df["created_at"].astype(str)
        df["updated_at"] = df["updated_at"].astype(str)
        return df.to_dict(orient="records")

