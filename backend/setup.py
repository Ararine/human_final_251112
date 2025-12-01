
import pandas as pd

from backend.config import config
from sqlalchemy import create_engine, text

user_id = config["DB"]["USER_ID"]
password = config["DB"]["PASSWORD"]
host = config["DB"]["HOST"]
port = config["DB"]["PORT"]
database = "final"

db_url = f"mysql+pymysql://{user_id}:{password}@{host}:{port}/{database}?charset=utf8mb4"

engine = create_engine(
    db_url,
    echo=True,
    pool_pre_ping=True
)

column_mapping = {
    "index":"id",
    "음 식 명": "food_name",
    "중량(g)": "weight_g",
    "에너지(kcal)": "energy_kcal",
    "탄수화물(g)": "carbs_g",
    "당류(g)": "sugars_g",
    "지방(g)": "fat_g",
    "단백질(g)": "protein_g",
    "칼슘(mg)": "calcium_mg",
    "인(mg)": "phosphorus_mg",
    "나트륨(mg)": "sodium_mg",
    "칼륨(mg)": "potassium_mg",
    "마그네슘(mg)": "magnesium_mg",
    "철(mg)": "iron_mg",
    "아연(mg)": "zinc_mg",
    "콜레스테롤(mg)": "cholesterol_mg",
    "트랜스지방(g)": "trans_fat_g"
}

# base meals와 food_nutrition 데이터 입력

df = pd.read_excel(
    "backend/networks/recommends/음식분류 AI 데이터 영양DB.xlsx")
df = df.reset_index()
df = df.rename(columns=column_mapping)
base_meal_data = df[["food_name", "weight_g", "energy_kcal"]].copy()
base_meal_data.columns = ["name", "weight", "calories"]
base_meal_data.to_sql("base_meals", engine, if_exists="append", index=False)

new_df = pd.read_excel(r"c:\Users\human\Desktop\info.xlsx")
new_df["칼로리"] = [int(i.replace("약", "").replace("kcal", "")) for i in new_df["칼로리"]]
new_df["1인분 무게"] = [int(i.replace("g", "")) for i in new_df["1인분 무게"]]
new_df.columns = ["name", "weight", "calories"]
new_df.to_sql("base_meals", engine, if_exists="append", index=False)

numeric_cols = [
    'weight_g', 'energy_kcal', 'carbs_g', 'sugars_g', 'fat_g', 'protein_g',
    'calcium_mg', 'phosphorus_mg', 'sodium_mg', 'potassium_mg',
    'magnesium_mg', 'iron_mg', 'zinc_mg', 'cholesterol_mg', 'trans_fat_g'
]

for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')

df.to_sql("food_nutrition", engine, if_exists="append", index=False)

