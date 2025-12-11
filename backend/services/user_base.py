
from models import user_base

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


#  사용자 아이디 별 유저 기본 정보 조회
def read_user_base_info_by_user_id(user_id: int):
    post_data = user_base.get_user_base_info_by_id(
        user_id)
    return post_data

# 사용자 아이디 별 유저 기본 정보 수정
def update_user_base_info_by_user_id(
    user_id:int, 
    # info_email: str, info_type: str,
    info_gender: str,info_age:int,
    info_height:float, info_weight:float):

    bmi_value = calculate_bmi(info_weight, info_height)
    bmr_value = calculate_bmr(info_weight, info_height, info_age, info_gender)

    updated = user_base.update_user_base_info_by_id(
        user_id, 
        info_gender,
        info_age, info_height, info_weight,
        bmi_value, bmr_value
        )
    return updated

