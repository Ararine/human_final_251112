from models import bodyhistory



# -------------------------------------
# CREATE - BMI/BMR은 이미 계산되어 들어옴
# -------------------------------------
def service_create_body_history(
    user_id: int,
    weight: float,
    height: float | None,
    bmi: float = None,
    bmr: float = None
):
    return bodyhistory.create_body_history(
        user_id=user_id,
        weight=weight,
        height=height,
        bmi=bmi,
        bmr=bmr
    )



# -------------------------------------
# READ - 유저 전체 이력 조회 (그래프용)
# -------------------------------------
def service_get_body_history(user_id: int):
    return bodyhistory.get_body_history_all(user_id)



# -------------------------------------
# UPDATE - BMI/BMR 계산 없음 / 전달받은 값 저장만
# -------------------------------------
def service_update_body_history(
    record_id: int,
    weight: float,
    height: float,
    bmi: float,
    bmr: float
):
    return bodyhistory.update_body_history(
        record_id=record_id,
        weight=weight,
        height=height,
        bmi=bmi,
        bmr=bmr
    )



# -------------------------------------
# DELETE - 특정 이력 삭제
# -------------------------------------
def service_delete_body_history(record_id: int):
    return bodyhistory.delete_body_history(record_id)
