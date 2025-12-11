from fastapi import APIRouter, Depends
from controllers import bodyhistory
from utils import verify_token

router = APIRouter()
 
router.add_api_route("/", bodyhistory.create_body_history, methods=["POST"])
router.add_api_route("/{user_id}", bodyhistory.service_get_body_history, methods=["GET"])
router.add_api_route("/{record_id}", bodyhistory.update_body_history, methods=["PUT"])
router.add_api_route("/{record_id}", bodyhistory.delete_body_history, methods=["DELETE"])

