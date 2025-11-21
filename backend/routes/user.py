from fastapi import APIRouter, Body
from services.auth import register_user

router = APIRouter()

@router.post("/signup")
def signup(data: dict = Body(...)):
    return register_user(
        email=data["email"],
        password=data["password"],
        gender=data.get("gender"),
        age=data.get("age"),
        height=data.get("height"),
        weight=data.get("weight")
    )
