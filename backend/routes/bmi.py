from fastapi import APIRouter
from services import bmi

# CRUD 를 services/bmi 파일에다가 따로 다 만들고
# controllers/bmi 만들고
# 나중에 확인하고 수정
#  결론 - controllers 에 Create 추가 get 추가

"""
models/bmi 에 calculate_bmi,
calculate_bmr 함수들 serices/bmi로 이사
bmi, bmr은 서비스쪽에서 넘겨받는 형식으로 수정
"""

# 예시
router = APIRouter()
router.add_api_route("/", bmi.create_body_history, methods=["POST"])
router.add_api_route("/{bmi_id}", bmi.update_bmi_by_id, methods=["PUT"])

# from services.bmi import (
#     service_create_body_history,
#     service_get_body_history,
#     service_update_body_history,
#     service_delete_body_history
# )

# router = APIRouter(prefix="/body", tags=["Body History"])

# Create
@router.post("/")
def create_body(user_id: int, weight: float, height: float, age: int, gender: str):
    record_id = service_create_body_history(user_id, weight, height, age, gender)
    return {"record_id": record_id}


# Read
@router.get("/{record_id}")
def read_body(record_id: int):
    return service_get_body_history(record_id)


# Update
@router.put("/{record_id}")
def update_body(record_id: int, weight: float, height: float, age: int, gender: str):
    updated = service_update_body_history(record_id, weight, height, age, gender)
    return {"updated": updated}


# Delete
@router.delete("/{record_id}")
def delete_body(record_id: int):
    deleted = service_delete_body_history(record_id)
    return {"deleted": deleted}

