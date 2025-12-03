from fastapi import status, Body, Path, Depends
from fastapi.responses import JSONResponse

from services import user_base
from utils import verify_token

# 유저 기본 정보 생성
# , user=Depends(verify_token)

# 유저 기본 정보 조회

# 사용자 아이디 별 유저 기본 정보 조회
async def read_user_base_info_by_user_id(
    user_id: int = Path(...), 
    # user=Depends(verify_token)
    ):
    try:
        # user_id=user["user_id"]
        post = user_base.read_user_base_info_by_user_id(
            user_id)
        print(post)
        return JSONResponse(
            {
                "message":"유저 기본 정보 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "유저 기본 정보 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

# 사용자 아이디 별 유저 기본 정보 수정
async def update_user_base_info_by_user_id(
    user_id: int = Path(...), 
    body: dict = Body(...),
    # user=Depends(verify_token)
):
    try:
        info_gender = body.get("gender")
        info_age = body.get("age")
        info_height = body.get("height")
        info_weight = body.get("weight")
        updated = user_base.update_user_base_info_by_user_id(
            user_id, 
            info_gender, info_age,
            info_height, info_weight)
        if not updated:
            return JSONResponse(
                {"message": "유저 기본 정보 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "유저 기본 정보 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "유저 기본 정보 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )
# 사용자 기본 정보 삭제 
