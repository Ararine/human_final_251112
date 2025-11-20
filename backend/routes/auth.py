from fastapi import APIRouter

from controllers import test

router = APIRouter()
router.add_api_route("/",test.say_hello, methods=["GET"])
# test 대신에 컨트롤러 만들어서 수정해주시기 바랍니다.