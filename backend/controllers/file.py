from fastapi import status, File, UploadFile, Depends
from fastapi.responses import JSONResponse

from services import file as file_services
from utils import verify_token


# 파일 업로드 생성
async def upload(file:UploadFile = File(...), user=Depends(verify_token)):
    try:
        user_id=user["user_id"]
        file_services.upload(file, user_id)
        return JSONResponse(
            {"message": "파일 업로드 완료"}, 
            status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "업로드 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        