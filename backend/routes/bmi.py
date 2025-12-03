from fastapi import APIRouter, Depends
from controllers import bmi
from utils import verify_token

router = APIRouter()
router.add_api_route("/",bmi.controllers_create_body_history, methods=["POST"])
router.add_api_route("/{recode_id}",bmi.controllers_get_body_history, methods=["GET"])
router.add_api_route("/{recode_id}",bmi.controllers_update_body_history, methods=["PUT"])
router.add_api_route("/{recode_id}",bmi.controllers_delete_body_history, methods=["DELETE"])


