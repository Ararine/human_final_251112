import pandas as pd
from sqlalchemy import text
from db.pool import engine
from services import bmi, user_base


# -----------------------------
# Insert
# -----------------------------
def create_body_history(
    user_id: int, weight: float, height: float,
    age: int, gender: str, bmi: float, bmr: float):

    query = text("""
        INSERT INTO body_history (
            user_id, weight, height, age, gender, bmi, bmr
        ) VALUES (
            :user_id, :weight, :height, :age, :gender, :bmi, :bmr
        )
    """)
# age gender 삭제 필요
    params = {
        "user_id": user_id,
        "weight": weight,
        "height": height,
        "age": age,
        "gender": gender,
        "bmi": bmi,
        "bmr": bmr
    }

    with engine.begin() as conn:
        result = conn.execute(query, params)
        new_id = result.lastrowid   # 안전하게 저장

    return new_id


# -----------------------------
# Select
# -----------------------------
def get_body_history_by_id(record_id: int):
    query = text("""
        SELECT *
        FROM body_history
        WHERE id = :record_id
    """)

    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"record_id": record_id})

    return df.to_dict(orient="records")


# -----------------------------
# Update
# -----------------------------
def update_body_history(
    record_id: int, weight: float, height: float, 
    age: int, gender: str, bmi: float, bmr: float):

    # age gender 삭제 필요
    query = text("""
        UPDATE body_history
        SET 
            weight = :weight,
            height = :height,
            age = :age,
            gender = :gender,
            bmi = :bmi,
            bmr = :bmr
        WHERE id = :record_id
    """)

    params = {
        "record_id": record_id,
        "weight": weight,
        "height": height,
        "age": age,
        "gender": gender,
        "bmi": bmi,
        "bmr": bmr
    }

    with engine.begin() as conn:
        result = conn.execute(query, params)

    return result.rowcount


# -----------------------------
# Delete
# -----------------------------
def delete_body_history(record_id: int):
    query = text("""
        DELETE FROM body_history
        WHERE id = :record_id
    """)

    with engine.begin() as conn:
        result = conn.execute(query, {"record_id": record_id})

    return result.rowcount
