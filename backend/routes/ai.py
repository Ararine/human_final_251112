from fastapi import APIRouter
from controllers import meal, exercise

router = APIRouter()
router.add_api_route("/calories", meal.get_calories, methods=["POST"])
router.add_api_route("/curriculum", exercise.create_curriculum, methods=["POST"])
router.add_api_route("/curriculum", exercise.get_curriculum, methods=["GET"])
router.add_api_route("/curriculum", exercise.delete_curriculum, methods=["DELETE"])
router.add_api_route("/meal_list", meal.create_recommended_meal, methods=["POST"])
router.add_api_route("/meal_list", meal.get_recommended_meal, methods=["GET"])
router.add_api_route("/meal_list", meal.remove_recommended_meal, methods=["DELETE"])