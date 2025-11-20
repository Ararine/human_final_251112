# 견본입니다 수정하지 말아주시기 바랍니다.
from fastapi import APIRouter
from controllers import test

router = APIRouter()
router.add_api_route("/",test.say_hello, methods=["GET"])

