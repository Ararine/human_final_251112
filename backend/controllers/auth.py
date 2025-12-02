from fastapi import APIRouter, Body
from services.auth import register_user

router = APIRouter()

@router.post("/register")
def register(
    email: str = Body(...),
    password: str = Body(...),
    gender: str = Body(None),
    age: int = Body(None),
    height: float = Body(None),
    weight: float = Body(None)    
):
    return register_user(email, password, gender, age, height, weight)
