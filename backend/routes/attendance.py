from fastapi import APIRouter

from controllers import attendance

router = APIRouter()
router.add_api_route("/{user_id}",attendance.attendance_by_user_id, methods=["POST"])