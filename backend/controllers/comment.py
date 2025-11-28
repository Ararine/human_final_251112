from fastapi import status, Body, Path, Depends
from fastapi.responses import JSONResponse

from services import comment
from utils import verify_token

# 댓글 생성
async def create_comment(body: dict = Body(...), user=Depends(verify_token)):
    try:
        post_id=body.get("post_id")
        user_id=user["user_id"]
        comments=body.get("contents")
        post_id = comment.create_comment(
            post_id, user_id, comments
        )
        return JSONResponse(
            {"message": "댓글 생성 완료", 
             "post_id": post_id}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        return JSONResponse(
            {"message": "댓글 생성 실패", "error":str(e)}, 
            status_code=status.HTTP_400_BAD_REQUEST)
        

# 게시글 상세 조회
async def get_comment_by_post_id(post_id: int = Path(...)):
    try:
        post = comment.get_comment_by_post_id(post_id)
        return JSONResponse(
            {
                "message":"댓글 조회 성공",
                "data": post
            }, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "댓글 조회 실패", "error":str(e)},
            status_code=status.HTTP_404_NOT_FOUND)

# 게시글 수정
async def update_comment_by_id(
    comment_id: int = Path(...), 
    body: dict = Body(...)
):
    try:
        comments = body.get("contents")
        print(comments)
        updated = comment.update_comment_by_id(comment_id, comments)

        if not updated:
            return JSONResponse(
                {"message": "댓글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(
            {"message": "댓글 수정 성공"},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        return JSONResponse(
            {"message": "댓글 수정 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST
        )

async def delete_comment_by_id(comment_id: int = Path(...)):
    try:
        deleted = comment.delete_comment_by_id(comment_id)
        if not deleted:
            return JSONResponse(
                {"message": "댓글 없음"}, 
                status_code=status.HTTP_404_NOT_FOUND)
        return JSONResponse(
            {"message": "댓글 삭제 완료"}, 
            status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(
            {"message": "댓글 삭제 실패", "error":str(e)},
            status_code=status.HTTP_400_BAD_REQUEST)
        