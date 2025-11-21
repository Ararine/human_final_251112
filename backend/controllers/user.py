from fastapi import Request, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from services.user import create_user


def register_controller(request: Request, db: Session = Depends(get_db)):
    data = request.json()  # 프론트에서 보낸 body(dict)
    new_user = create_user(db, data)
    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }
