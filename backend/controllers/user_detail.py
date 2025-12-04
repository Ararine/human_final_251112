from services.user_detail import (
    get_user_detail_info_by_id,
    update_user_detail_info_by_id,
    create_user_detail_info
)

def get_user_detail(user_id: int):
    return get_user_detail_info_by_id(user_id)

def update_user_detail(user_id: int, body: dict):
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

def create_user_detail(user_id: int, body: dict):
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
