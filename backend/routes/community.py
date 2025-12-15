from fastapi import APIRouter,Depends

from controllers import community
from utils import verify_token

router = APIRouter()
router.add_api_route("/report",community.read_reported_posts, methods=["GET"])
router.add_api_route("/report/{post_id}",community.create_reported_post, methods=["POST"])
router.add_api_route("/report/delete/{post_id}",community.delete_reported_post, methods=["POST"])
router.add_api_route("/admin/{post_id}",community.admin_delete_post, methods=["DELETE"])
router.add_api_route("/",community.create_post, methods=["POST"])
router.add_api_route("/",community.read_posts, methods=["GET"])
# router.add_api_route("/user/{user_id}",community.read_posts_by_user_id, methods=["GET"])
router.add_api_route("/{post_id}",community.read_post, methods=["GET"])
router.add_api_route("/{post_id}",community.update_post, methods=["PUT"], dependencies=[Depends(verify_token)])
router.add_api_route("/{post_id}",community.delete_post, methods=["DELETE"], dependencies=[Depends(verify_token)])
router.add_api_route("/report/{post_id}",community.create_reported_post, methods=["POST"])
router.add_api_route("/user/{user_id}", community.read_user_posts, methods=["GET"]) 
