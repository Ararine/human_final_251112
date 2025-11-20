from fastapi import APIRouter
from controllers.test import hello_controller  # <- 기존 say_hello 대신

router = APIRouter()

router.add_api_route("/", hello_controller, methods=["GET"])  # 이름 변경
