
from models import attendance

# 개별 출석
def attendance_by_user_id(user_id: str):
    row = attendance.get_today_attendance_by_user_id(user_id)
    data = attendance.get_attendance_by_user_id(user_id)
    if not row:
        attendance.insert_attendance(user_id)
        attendance.update_attendance_score(user_id)
    return row, data
