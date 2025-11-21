from fastapi import APIRouter, Request, Response, Depends
from controllers import auth
from db.database import get_db

router = APIRouter()


@router.post("/login")
async def login(req: Request, res: Response, db=Depends(get_db)):
    return auth.login_controller(req, res, db)


@router.post("/logout")
async def logout(res: Response):
    return auth.logout_controller(res)


@router.get("/verify")
async def verify(req: Request):
    return auth.verify_controller(req)
