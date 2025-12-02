import pandas as pd
from sqlalchemy import text
from db.pool import engine


# -----------------------------
# Insert
# -----------------------------
def create_body_history(
    user_id: int, weight: float, height: float, 
    age: int, gender: str, bmi:float, bmr:float):

    # bmi = calculate_bmi(weight, height)
    # bmr = calculate_bmr(weight, height, age, gender)

    query = text("""
        INSERT INTO body_history (
            user_id, weight, height, age, gender, bmi, bmr
        ) VALUES (
            :user_id, :weight, :height, :age, :gender, :bmi, :bmr
        )
    """)

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

    return result.lastrowid


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
def update_body_history(record_id: int, weight: float, height: float, age: int, gender: str):

    # bmi = calculate_bmi(weight, height)
    # bmr = calculate_bmr(weight, height, age, gender)

    query = text("""
        UPDATE body_history
        SET weight = :weight,
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
