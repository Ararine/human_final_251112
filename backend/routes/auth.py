from fastapi import APIRouter

from controllers import test

router = APIRouter()
router.add_api_route("/",test.hello_controller, methods=["GET"])

from controllers.test import hello_controller

router = APIRouter()

@router.get("/hello")
def hello():
    return hello_controller()