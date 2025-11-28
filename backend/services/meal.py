
import numpy as np 

from networks.calories.model import calories_model
from models import meal

# 칼로리 추정
def get_calories(pil_img):
    det_res, vol_res = calories_model.predict(
        pil_img, conf_threshold=0.015)
    if not det_res is None:
        det_res = det_res[det_res[:,-1]!=0]

    idx = [int(i) for i in det_res[:,-1]]
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