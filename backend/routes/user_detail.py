# routes/user_detail.py

from fastapi import APIRouter
from controllers.user_detail import (
    get_user_detail_info_by_id,
    create_user_detail_info,
    update_user_detail_info_by_id
)

router = APIRouter(prefix="/users", tags=["User Detail Info"])

@router.get("/{user_id}/detail")
def route_get_detail(user_id: int):
    return get_user_detail_info_by_id(user_id)

@router.post("/{user_id}/detail")
def route_create_detail(user_id: int, body: dict):
    return create_user_detail_info(
        user_id=user_id,
        goal=body.get("goal"),
        job=body.get("job"),
        activity_level=body.get("activity_level"),
        activity_duration=body.get("activity_duration"),
        sleep_duration=body.get("sleep_duration"),
        chronotype=body.get("chronotype"),
        disease=body.get("disease"),
        equipment=body.get("equipment"),
        food_restrictions=body.get("food_restrictions"),
        water_intake=body.get("water_intake")
    )

@router.put("/{user_id}/detail")
def route_update_detail(user_id: int, body: dict):
    return update_user_detail_info_by_id(
        user_id=user_id,
        goal=body.get("goal"),
        job=body.get("job"),
        activity_level=body.get("activity_level"),
        activity_duration=body.get("activity_duration"),
        sleep_duration=body.get("sleep_duration"),
        chronotype=body.get("chronotype"),
        disease=body.get("disease"),
        equipment=body.get("equipment"),
        food_restrictions=body.get("food_restrictions"),
        water_intake=body.get("water_intake")
    )
