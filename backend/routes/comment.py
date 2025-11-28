from fastapi import APIRouter,Depends

from controllers import comment
from utils import verify_token

router = APIRouter()
router.add_api_route("/",comment.create_comment, methods=["POST"], dependencies=[Depends(verify_token)])
router.add_api_route("/{post_id}",comment.get_comment_by_post_id, methods=["GET"])
router.add_api_route("/{comment_id}",comment.update_comment_by_id, methods=["PUT"])
router.add_api_route("/{comment_id}",comment.delete_comment_by_id, methods=["DELETE"])