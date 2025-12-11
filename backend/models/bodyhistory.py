from sqlalchemy import text
from db.pool import engine
import pandas as pd


# ============================================================
# 1. INSERT – 몸 변화 이력 생성
# ============================================================
def create_body_history(user_id: int, weight: float, height: float | None, bmi: float, bmr: float):
    query = text("""
        INSERT INTO body_history (
            user_id, weight, height, bmi, bmr
        ) VALUES (
            :user_id, :weight, :height, :bmi, :bmr
        )
    """)

    params = {
        "user_id": user_id,
        "weight": weight,
        "height": height,
        "bmi": bmi,
        "bmr": bmr
    }

    with engine.begin() as conn:
        result = conn.execute(query, params)
        new_id = result.lastrowid

    return new_id



# ============================================================
# 2. SELECT – 전체 변화 이력 조회 (그래프용)
# ============================================================
def get_body_history_all(user_id: int):
    query = text("""
        SELECT id, user_id, weight, height, bmi, bmr, recorded_at
        FROM body_history
        WHERE user_id = :user_id
        ORDER BY recorded_at ASC
    """)

    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"user_id": user_id})

    if df.empty:
        return []

    df["recorded_at"] = df["recorded_at"].astype(str)
    return df.to_dict(orient="records")



# ============================================================
# 3. UPDATE – 특정 기록 수정 (height optional)
# ============================================================
def update_body_history(
    record_id: int,
    weight: float | None,
    height: float | None,
    bmi: float | None,
    bmr: float | None
):
    # 1) 기존 값 조회
    select_query = text("""
        SELECT weight, height, bmi, bmr
        FROM body_history
        WHERE id = :record_id
    """)

    with engine.connect() as conn:
        exist = conn.execute(select_query, {"record_id": record_id}).fetchone()

    if not exist:
        return 0

    # 기존 DB 값 유지
    current_weight, current_height, current_bmi, current_bmr = exist

    new_weight = weight if weight is not None else current_weight
    new_height = height if height is not None else current_height
    new_bmi = bmi if bmi is not None else current_bmi
    new_bmr = bmr if bmr is not None else current_bmr

    # 2) 업데이트 실행
    update_query = text("""
        UPDATE body_history
        SET 
            weight = :weight,
            height = :height,
            bmi = :bmi,
            bmr = :bmr
        WHERE id = :record_id
    """)

    params = {
        "record_id": record_id,
        "weight": new_weight,
        "height": new_height,
        "bmi": new_bmi,
        "bmr": new_bmr
    }

    with engine.begin() as conn:
        result = conn.execute(update_query, params)

    return result.rowcount



# ============================================================
# 4. DELETE – 특정 기록 삭제
# ============================================================
def delete_body_history(record_id: int):
    query = text("""
        DELETE FROM body_history
        WHERE id = :record_id
    """)

    with engine.begin() as conn:
        result = conn.execute(query, {"record_id": record_id})

    return result.rowcount
