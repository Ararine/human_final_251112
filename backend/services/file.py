import shutil
from pathlib import Path

from models import comment, attendance
UPLOAD_DIR = Path("./uploaded_data")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def upload(file, user_id):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    attendance.update_attendance_score(user_id)
    return 