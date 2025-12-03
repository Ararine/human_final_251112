
from models import user_base


#  사용자 아이디 별 유저 기본 정보 조회
def read_user_base_info_by_user_id(user_id: int):
    print(1)
    post_data = user_base.get_user_base_info_by_id(
        user_id)

    print(2)
    # print(post_data)

    return post_data

# 사용자 아이디 별 유저 기본 정보 수정
def update_user_base_info_by_user_id(
    user_id:int, 
    # info_email: str, info_type: str,
    info_gender: str,info_age:int,
    info_height:float, info_weight:float):
    updated = user_base.update_user_base_info_by_id(
        user_id, 
        info_gender,
        info_age, info_height, info_weight)
    return updated

