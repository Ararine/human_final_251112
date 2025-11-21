from fastapi import status, Body, Path
from fastapi.responses import JSONResponse

from services import qna

# qna 생성
async def create_qna(user_id: int = Path(...),
                         body: dict = Body(...)):
    try:
        is_logic, response = qna.create_qna(
            user_id,
            title=body.get("title"),
            contents=body.get("contents"),
        )
        if is_logic == False:
            return JSONResponse(
                {"message": "같은 이름의 게시물이 존재합니다"
                 }, status_code=status.HTTP_409_CONFLICT # 상태번호 확인 필요
                )
            
        return JSONResponse(
            {"message": "qna 등록 완료", 
             "post_id": response}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "qna 등록 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        