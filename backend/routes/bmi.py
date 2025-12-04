from fastapi import APIRouter, Depends
from controllers import bmi
from utils import verify_token

router = APIRouter()
router.add_api_route("/",bmi.service_create_body_history, methods=["POST"])
router.add_api_route("/{record_id}",bmi.service_get_body_history, methods=["GET"])
router.add_api_route("/{record_id}",bmi.service_update_body_history, methods=["PUT"])
router.add_api_route("/{record_id}",bmi.service_delete_body_history, methods=["DELETE"])


