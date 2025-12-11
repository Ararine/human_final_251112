from models import user_detail


def create_user_detail_info(
    user_id: int, goal: str, job: str,
    activity_level: str, activity_duration: float,
    sleep_duration: float, chronotype: str,
    disease: str, equipment: str,
    food_restrictions: str, water_intake: float):
    
    return user_detail.create_user_detail_info(
        user_id=user_id,
        goal=goal,
        job=job,
        activity_level=activity_level,
        activity_duration=activity_duration,
        sleep_duration=sleep_duration,
        chronotype=chronotype,
        disease=disease,
        equipment=equipment,
        food_restrictions=food_restrictions,
        water_intake=water_intake,
    )

def get_user_detail_info_by_id(user_id: int):
    return user_detail.get_user_detail_info_by_id(user_id)

def update_user_detail_info_by_id(
    user_id: int, goal: str, job: str,
    activity_level: str, activity_duration: float,
    sleep_duration: float, chronotype: str,
    disease: str, equipment: str,
    food_restrictions: str, water_intake: float
):
    print(user_id, goal, job)
    return user_detail.update_user_detail_info_by_id(
        user_id=user_id,
        goal=goal,
        job=job,
        activity_level=activity_level,
        activity_duration=activity_duration,
        sleep_duration=sleep_duration,
        chronotype=chronotype,
        disease=disease,
        equipment=equipment,
        food_restrictions=food_restrictions,
        water_intake=water_intake,
    )
