import json
import numpy as np 
import pandas as pd
from pathlib import Path

from networks.calories.model import calories_model
from networks.recommends.model import recommend_model

from models import meal, user

# 칼로리 추정
def get_calories(pil_img):
    det_res, vol_res = calories_model.predict(
        pil_img, conf_threshold=0.015)
    if not det_res is None:
        det_res = det_res[det_res[:,-1]!=0]

    idx = [int(i) for i in det_res[:,-1]]
    idx = [i for i in idx if i<402] # 예외처리
    selected_rows = calories_model.meta_data.loc[idx]
    
    factor = calories_model.qvalues[np.argmax(vol_res)]

    df_numerics = selected_rows.select_dtypes(include=['number']) 
    selected_rows[df_numerics.columns] = df_numerics * factor
    if (det_res is not None and len(det_res) > 0):
        x1, y1, x2, y2, conf = det_res[:,:-1].T.tolist()
        result = {"x1":x1, "y1":y1, "x2":x2, "y2":y2, "confidence":conf}
    else:
        result = {"x1": [], "y1": [], "x2": [], "y2": [], "confidence": []}
    return result, selected_rows.to_dict(orient="records")


def create_meal_list(user_id, n_days, n_times):
    UPLOAD_DIR = Path(f"./uploaded_data/json/meal")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    start_date = pd.Timestamp.today().strftime('%Y-%m-%d')
    end_date = (pd.Timestamp.today() + pd.Timedelta(days=int(n_days))).strftime('%Y-%m-%d')
    file_location = f"{UPLOAD_DIR}/user_{user_id:05d}_{start_date}.json"
    
    df = meal.get_meals_hist_by_id(user_id, start_date)
    if len(df)!=0:
        df = df[0]
        file_location = df["file_url"]
        with open(file_location, "r", encoding="utf-8") as f:
            result = json.load(f)    
        return result
    else:
        # 사용자 정보
        user_info = user.get_user_info(user_id)
        df = user_info.drop(
            ["created_at", "points", "is_public", 
            "user_id", "food_restrictions", "water_intake"
            ],axis=1)
        row = df.iloc[0]
        info_str = ', '.join(
            [f"{col}: {str(row[col])}" for col in df.columns])
        target=row["goal"]

        template = f"""
        당신은 전문 영양사입니다. 아래 대상자의 신체 정보와 조건을 바탕으로,
        {target}에 적합한 식단을 {n_days}일 동안 {n_times}끼로 구성해주세요. 
        각 끼니별로 음식명과 중량(g)을 반드시 제공해야 합니다.
        
        대상자의 신체정보입니다.
        {info_str}

        조건:
        - {target} 목표에 맞는 단백질, 탄수화물, 지방 비율 고려
        - 같은 음식은 하루 또는 {n_days} 동안 반복 금지
        - 하루 {n_times}끼를 정확히 구성
        - {n_days}일간 식단 모두 제공
        - 초보자도 이해할 수 있게 간단한 설명 포함
        - 음식명은 반드시 제공된 목록(food_names) 안에서만 선택

        사용할 음식 목록: {{food_names}}

        {{format_instructions}}
        """
        
        parser, format_instructions = recommend_model.get_meal_parser(target)
        chain = recommend_model.get_chain(
            template, ["food_names"], parser, format_instructions)
        # 기본 운동 목록 및 링크 정보
        meal_data = meal.get_base_meals()
        meal_data = pd.DataFrame(meal_data)
        print(meal_data)
        meal_list = meal_data["name"]
        result = chain.invoke({"food_names": meal_list})
        # 결과에 링크 정보 추가
        link_dict = pd.Series(meal_data.link.values, index=meal_data.name).to_dict()
        for day_plan in result['일자별_식단']:            # 각 날짜별 식단
            for meal_list in day_plan["끼니별_식단"]:     # 하루의 각 끼니
                for meal_item in meal_list:              # 끼니 안의 음식 항목
                    food_name = meal_item['음식명']
                    meal_item['link'] = link_dict.get(food_name, None)  # 링크 추가
        with open(file_location, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=4)
        # DB에 저장
        meal.insert_meals_hist(
            user_id, start_date, end_date, file_location)    

        return result


def get_curriculum_by_id(user_id):
    today_date = pd.Timestamp.today().strftime('%Y-%m-%d')
    df = meal.get_meals_hist_by_id(user_id, today_date)
    if len(df)!=0:
        df = df[0]
        file_location = df["file_url"]
        with open(file_location, "r", encoding="utf-8") as f:
            result = json.load(f)    
        return result
    
def delete_curriculum_by_id(user_id):
    today_date = pd.Timestamp.today().strftime('%Y-%m-%d')
    df = meal.delete_meals_hist_by_id(user_id, today_date)
    return df

# 기본 식단 생성
def create_base_meal(name:str, calories:float, link:str):
    post_id = meal.insert_base_meal(name, calories, link)
    return post_id

# 기본 식단 조회
def get_base_meals():
    post_data = meal.get_base_meals()
    return post_data

def get_base_meal_by_id(meal_id: int):
    post_data = meal.get_base_meal_by_id(meal_id)
    return post_data

# 기본 식단 수정
def update_base_meal_by_id(meal_id: int, name: str, calories:float, link:str):
    updated = meal.update_base_meal_by_id(meal_id, name, calories, link)
    return updated

# 기본 식단 삭제
def delete_base_meal_by_id(meal_id: int):
    deleted = meal.delete_base_meal_by_id(meal_id)
    return deleted