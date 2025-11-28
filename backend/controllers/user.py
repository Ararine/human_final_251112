from fastapi import status, Body, Path, Depends
from fastapi.responses import JSONResponse

from services import user
from utils import verify_token

# 사용자 생성
async def create_user(body: dict = Body(...)):
    try:
        email=body.get("email")
        password=body.get("password")
        age=body.get("age")
        gender=body.get("gender")
        height=body.get("height")
        weight=body.get("weight")

        results = user.create_user(
            email, password,
            age, gender, height, weight
        )
        return JSONResponse(
            {"message": "사용자 생성 완료", 
             "results": results}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "사용자 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        

# 사용자 조회
async def get_user(token=Depends(verify_token)):
    try:
        post = user.get_user()
        return JSONResponse(
            {
                "message":"사용자 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "사용자 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)


# 로그인
async def get_user_by_id(body: dict = Body(...)):
    try:
        email=body.get("email")
        password=body.get("password")
        logic, info = user.get_user_by_id(email, password)
        if logic==False:
            if info=="비활성화 계정":
                return JSONResponse(
                    {
                        "message":"로그인 실패",
                        "info":info,
                    }, 
                    status_code=status.HTTP_403_FORBIDDEN)
            else:
                return JSONResponse(
                    {
                        "message":"로그인 실패",
                        "info":info,
                    }, 
                    status_code=status.HTTP_401_UNAUTHORIZED)

        return JSONResponse(
            {
                "message":"로그인 성공",
                "token": info
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "로그인 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

# 사용자 수정
async def update_user_by_id(
    body: dict = Body(...)
):
    try:
        user_id = body.get("user_id")
        email = body.get("email")
        password = body.get("password")
        updated = user.update_user_by_id(user_id, email, password)

        if not updated:
            return JSONResponse(
                {"message": "사용자 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "사용자 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "사용자 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

async def update_user_active_by_id(
    user_id: int = Path(...),
    body: dict = Body(...),
    token=Depends(verify_token)
    ):
    print(body)
    # todo 관리자 권한인지 확인
    is_active = body.get("is_active")
    try:
        updated = user.update_user_active_by_id(user_id, is_active)

        if not updated:
            return JSONResponse(
                {"message": "사용자 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "사용자 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "사용자 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

# 사용자 삭제
async def delete_user_by_id(
    user_id: int = Path(...),
    token=Depends(verify_token)):
    # todo 관리자 권한인지 확인

    try:
        deleted = user.delete_user_by_id(user_id)
        if not deleted:
            return JSONResponse(
                {"message": "사용자 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "사용자 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "사용자 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
        