from fastapi import APIRouter, Depends

from controllers import meal
# from utils import verify_token

router = APIRouter()
router.add_api_route("/",meal.create_base_meal, methods=["POST"])
router.add_api_route("/",meal.get_base_meal, methods=["GET"])
router.add_api_route("/{meal_id}",meal.get_base_meal_by_id, methods=["GET"])
router.add_api_route("/{meal_id}",meal.update_base_meal_by_id, methods=["PUT"])
router.add_api_route("/{meal_id}",meal.delete_base_meal_by_id, methods=["DELETE"])