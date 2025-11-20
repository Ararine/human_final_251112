from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from db.database import get_db
from services.user import create_user, get_user_by_email

router = APIRouter()

@router.post("/signup")
def signup(
    email: str = Body(...),
    password: str = Body(...),
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(db, email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = create_user(db, email, password)
    return {
        "id": new_user.id,
        "email": new_user.email,
        "type": new_user.type,
        "points": new_user.points
    }
