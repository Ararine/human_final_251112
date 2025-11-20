from fastapi import APIRouter

from controllers import community

router = APIRouter()
router.add_api_route("/",community.create_post, methods=["POST"])
router.add_api_route("/",community.read_posts, methods=["GET"])
router.add_api_route("/user/{user_id}",community.read_posts_by_user_id, methods=["GET"])
router.add_api_route("/{post_id}",community.read_post, methods=["GET"])
router.add_api_route("/{post_id}",community.update_post, methods=["PUT"])
router.add_api_route("/{post_id}",community.delete_post, methods=["DELETE"])
router.add_api_route("/report/{post_id}",community.create_reported_post, methods=["POST"])
router.add_api_route("/user/{user_id}", community.read_user_posts, methods=["GET"]) 