from models import qna

# 게시글 생성
def create_qna(title: str, contents: str, user_id: int):
    res = qna.checked_title(title)
    if len(res):
        # 같은 이름의 테이블이 존재하면 할 처리
        result = None
        is_logic = False
    else:
        # 같은 이름의 테이블이 존재하지 않으면 할 처리
        result = qna.insert_qna(user_id, title, contents)
        is_logic = True
    return is_logic, result
