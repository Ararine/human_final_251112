from fastapi import APIRouter,Depends

from controllers import user
from utils import verify_token

router = APIRouter()
router.add_api_route("/",user.create_user, methods=["POST"])
router.add_api_route("/login",user.get_user_by_id, methods=["POST"])
router.add_api_route("/all",user.get_user, methods=["POST"], dependencies=[Depends(verify_token)])
router.add_api_route("/{user_id}",user.update_user_by_id, methods=["PUT"])
router.add_api_route("/{user_id}/active",user.update_user_active_by_id, methods=["PUT"], dependencies=[Depends(verify_token)])
router.add_api_route("/{user_id}",user.delete_user_by_id, methods=["DELETE"], dependencies=[Depends(verify_token)])