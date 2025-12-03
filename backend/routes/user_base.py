from fastapi import APIRouter,Depends

from controllers import user_base
from utils import verify_token

router = APIRouter()
router.add_api_route("/{user_id}",user_base.read_user_base_info_by_user_id, methods=["GET"]
                    #  , dependencies=[Depends(verify_token)]
                     )
router.add_api_route("/{user_id}",user_base.update_user_base_info_by_user_id, methods=["PUT"]
                    #  , dependencies=[Depends(verify_token)]
                     )
