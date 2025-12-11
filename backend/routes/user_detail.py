from fastapi import APIRouter,Depends

from controllers import user_detail
from utils import verify_token

router = APIRouter()
router.add_api_route("/",user_detail.create_user_detail_info, methods=["POST"]
                     , dependencies=[Depends(verify_token)]
                     )

router.add_api_route("/",user_detail.get_user_detail, methods=["GET"]
                     , dependencies=[Depends(verify_token)]
                     )
router.add_api_route("/",user_detail.update_user_detail_info_by_id, methods=["PUT"]
                     , dependencies=[Depends(verify_token)]
                     )
