from models import bmi, user_base

# -----------------------------------
# BMI & BMR 계산
# -----------------------------------
def calculate_bmi(weight: float, height: float):
    return round(weight / ((height / 100) ** 2), 2)


def calculate_bmr(weight: float, height: float, age: int, gender: str):
    gender = gender.lower()
    
    if gender in ["male"]:
        bmr = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age)
    elif gender in ["female"]:
        bmr = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age)
    else:
        bmr = 0

    return round(bmr, 2)

# -----------------------------------
# CREATE
# -----------------------------------
def service_create_body_history(
    user_id, weight, height):
    user_info = user_base.get_user_base_info_by_id(user_id)
    # 확인 필요
    
    age = user_info[0]["age"]
    gender = user_info[0]["gender"]
    print(age, gender)
    # service 계층에서 계산 수행
    bmi_value = calculate_bmi(weight, height)
    bmr_value = calculate_bmr(weight, height, age, gender)
    print(bmi_value, bmr_value)
    # models에 계산된 값 전달
    return bmi.create_body_history(
        user_id=user_id,
        height=height,     
        weight=weight,
        bmi=bmi_value,
        bmr=bmr_value
    )

# -----------------------------------
# READ
# -----------------------------------
def service_get_body_history(record_id):
    return bmi.get_body_history_by_id(record_id)

# -----------------------------------
# UPDATE
# -----------------------------------
# def service_update_body_history(record_id, weight, height, age, gender):
#     bmi_value = calculate_bmi(weight, height)
#     bmr_value = calculate_bmr(weight, height, age, gender)
#     return bmi.update_body_history(
#         record_id=record_id,
#         weight=weight,
#         height=height,
#         bmi=bmi_value,
#         bmr=bmr_value
#     )
def service_update_body_history(
    record_id, user_id, height, weight):
    user_info = user_base.get_user_base_info_by_id(user_id)
    age = user_info[0]["age"]
    gender = user_info[0]["gender"]

    bmi_value = calculate_bmi(weight, height)
    bmr_value = calculate_bmr(weight, height, age, gender)
    return bmi.update_body_history(
        record_id=record_id,
        weight=weight,
        height=height,
        bmi=bmi_value,
        bmr=bmr_value
    )

# -----------------------------------
# DELETE
# -----------------------------------
def service_delete_body_history(record_id):
    return bmi.delete_body_history(record_id)

"""
def insert_post(title: str, contents: str, user_id: str):
    query1 = text("INSERT INTO user_base_info (title, contents, user_id) VALUES (:title, :contents, :user_id)")
    query2 = text("INSERT INTO body_history (title, contents, user_id) VALUES (:title, :contents, :user_id)")
    with engine.connect() as conn:
        result = conn.execute(query1, {"title": title, "contents": contents, "user_id": user_id})
        result = conn.execute(query2, {"title": title, "contents": contents, "user_id": user_id})
        conn.commit()
        return result.lastrowid
"""