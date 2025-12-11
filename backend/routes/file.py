from fastapi import APIRouter,Depends

from controllers import file
from utils import verify_token

router = APIRouter()
router.add_api_route("/upload",file.upload, methods=["POST"], dependencies=[Depends(verify_token)])
