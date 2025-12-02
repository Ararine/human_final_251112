from fastapi import APIRouter
from controllers import meal, exercise

router = APIRouter()
router.add_api_route("/calories", meal.get_calories, methods=["POST"])
router.add_api_route("/curriculum", exercise.create_curriculum, methods=["POST"])
router.add_api_route("/meal_list", meal.recommended_meal_list, methods=["POST"])