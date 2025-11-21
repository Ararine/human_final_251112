from fastapi import APIRouter

from controllers import qna

router = APIRouter()
router.add_api_route("/{user_id}",qna.create_qna, methods=["POST"])