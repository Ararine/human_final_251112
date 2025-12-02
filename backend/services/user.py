
from models import user, user_base, user_detail
import utils
# 유저 생성
def create_user(
    email: str, password: str, 
    age:int, gender:str, height:float, weight:float):
    hashed_password = utils.hash_password(password)
    response = user.create_user_with_base_info(
        email, hashed_password, gender, age, height, weight)
    # bmi table 행 추가 기능 구현 필요
    
    return response

# 유저 조회
def get_user():
    post_data = user.get_user()
    return post_data

# 로그인
def get_user_by_id(email: str, password: str):
    # 유저 활성화 여부(is_active) 고려해서 로그인되게 수정
    df = user.get_user_by_email(email)
    if not df or len(df) == 0:
        return False, ""
    user_id = df[0]["id"]
    db_password = df[0]["password"]
    user_type = df[0]["type"]
    user_points = df[0]["points"]
    is_active = df[0]["is_active"]
    if is_active=="-1":
        return False, "비활성화 계정"
    data = {
        "user_id":user_id, 
        "email":email,
        "type":user_type, 
        "points":user_points, 
        "is_active":is_active
        }
    logic = utils.verify_password(password, db_password)
    # 비밀번호 틀리면 토큰 발급 안 함
    if not logic:
        return False, "" 
    token = utils.create_access_token(data)
    return logic, token

# 유저 수정
def update_user_by_id(user_id: int, email:str, password: str):
    hashed_password = utils.hash_password(password)
    updated = user.update_user_by_id(user_id, email, hashed_password)
    return updated

# 사용자 활성화/비활성화
def update_user_active_by_id(user_id: int, active:int):
    changed_active = str(int(active) * -1)
    updated = user.update_user_active_by_id(user_id, changed_active)
    return updated

# 유저 삭제
def delete_user_by_id(user_id: int):
    # 관리자거나 본인이거나
    deleted = user.delete_user_by_id(user_id)
    return deleted

