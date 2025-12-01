
import torch
import numpy as np
import pandas as pd
from PIL import Image
import torchvision.transforms as T

import sys
sys.path.append("backend/networks/calories/ObjectDetection/yolov3")

import yolov3_utils
from yolov3_models import Darknet

class MealVolumeModel:
    def __init__(self, weight_path):
        self.weight_path = weight_path
        self.setup()        
    def setup(self):
        ckpt = torch.load(
            self.weight_path, map_location=torch.device("cpu"), weights_only=False)
        self.model = ckpt["model_ft"]
        self.model.load_state_dict(ckpt["state_dict"])
        self.model.eval()
        self.transforms = T.Compose([
            T.Resize(256),
            T.CenterCrop(224),
            T.ToTensor(),
            T.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225])])
    def predict(self, pil_img):
        preprocess_data = self.transforms(pil_img)
        input_tensor = np.expand_dims(preprocess_data, 0)
        input_tensor = torch.from_numpy(input_tensor)
        logits = self.model(input_tensor)
        probs = logits.softmax(dim=-1)
        return probs.detach().cpu()

"""
model_path = "./backend/networks/calories/weights/new_opencv_ckpt_b84_e200.pth"
sample = r"./backend/networks/calories/Regression/sample.JPG"
calories_model = MealVolumeModel(weight_path=model_path)
pil_img = Image.open(sample)
calories_model.predict(pil_img)
# Q1, Q2, Q3, Q4, Q5로 25% 50% 75% 100% 125%로 분류하는 형태로 제공
"""

class MealDetectionModel:
    def __init__(self,config_path, weight_path, img_size = (320,192)):
        self.config_path = config_path
        self.weight_path = weight_path
        self.img_size = img_size
        self.setup()
        
    def setup(self):
        self.model = Darknet(self.config_path, self.img_size)
        weight = torch.load(self.weight_path, map_location=torch.device("cpu"), weights_only=False)
        self.model.load_state_dict(weight["model"], strict = False)
        self.model.fuse()
        self.model.eval()
        self.transform = T.Compose([
            T.Resize(self.img_size),  # YOLOv3 input size
            T.ToTensor()           # C,H,W로 변환
        ])
    
    def predict(self, pil_img, conf_threshold=0.2, iou_threshold = 0.45):
        img = self.transform(pil_img).unsqueeze(0)        
        with torch.no_grad():
            inf_out, _ = self.model(img, augment=False) 
        output = yolov3_utils.utils.non_max_suppression(
            inf_out, conf_threshold, iou_threshold ,multi_label=False ,classes=None, agnostic=None)
        resized_h, resized_w = self.img_size
        original_w, original_h = pil_img.size
        x_scale = original_w / resized_w
        y_scale = original_h / resized_h
        det = output[0]
        if det is None or len(det) == 0:
            return None, None
        det = det.detach().cpu().numpy()
        det_scaled = det.copy()
        det_scaled[:, [0, 2]] *= x_scale
        det_scaled[:, [1, 3]] *= y_scale
        return det_scaled, det

"""
imgsz = (320,192)
yolo_util_path = "backend/networks/calories"
config_path = f"{yolo_util_path}/ObjectDetection/yolov3/cfg/yolov3-spp-403cls.cfg"
weight_path = f"{yolo_util_path}/weights/best_403food_e200b150v2.pt"
names = utils.load_classes(f"{yolo_util_path}/ObjectDetection/yolov3/data/403food.names")

meal_detection_model = MealDetectionModel(config_path, weight_path)
sample = r"./backend/networks/calories/Regression/sample.JPG"
pil_img = Image.open(sample)
output, _ = meal_detection_model.predict(pil_img)
pil_img.size
imgsz
#  시각화
transform = T.Compose([
    T.Resize(imgsz),  # YOLOv3 input size
])
resized_h, resized_w = imgsz
original_w, original_h = pil_img.size
x_scale = original_w / resized_w
y_scale = original_h / resized_h

img = transform(pil_img)
view_img = np.array(pil_img)
import cv2
for det in output[0]:
    x1, y1, x2, y2, score, cls = det.tolist()
    x1 *= x_scale
    x2 *= x_scale
    y1 *= y_scale
    y2 *= y_scale
    cls = int(cls)
    h, w = view_img.shape[:2]
    scale = max(h, w) / 1000           # 이미지 크기 비례
    font_scale = 0.6 * scale
    thickness = int(2 * scale)
    rect_thickness = int(3 * scale)
    # bounding box
    cv2.rectangle(view_img,
                  (int(x1), int(y1)),
                  (int(x2), int(y2)),
                  (0, 255, 0),
                  rect_thickness)
    # label text
    label = f"{names[cls]} {score:.2f}"
    cv2.putText(view_img, label, (int(x1), int(y1) - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                font_scale,
                (0, 255, 0),
                thickness)

cv2.imwrite("test.png", view_img[...,::-1])
"""

class MealCaloriesModel:
    def __init__(
        self, 
        det_config_path, 
        det_weight_path,
        vol_weight_path,
        meta_data_path
        ):
        self.det_model = MealDetectionModel(
            config_path=det_config_path,
            weight_path=det_weight_path,
        )
        self.vol_model = MealVolumeModel(
            weight_path=vol_weight_path
        )
        self.meta_data = pd.read_excel(meta_data_path)
        self.qvalues = np.arange(0.25,1.5, 0.25)
    def predict(self, pil_img, conf_threshold = 0.015, iou_threshold = 0.45):
        det_results, _ = self.det_model.predict(pil_img, conf_threshold, iou_threshold)
        vol_results = self.vol_model.predict(pil_img)
        # labels = [self.labels[int(i[:,-1])] for i in det_results]
        return det_results, vol_results

yolo_util_path = "backend/networks/calories"
config_path = f"{yolo_util_path}/ObjectDetection/yolov3/cfg/yolov3-spp-403cls.cfg"
weight_path = f"{yolo_util_path}/weights/best_403food_e200b150v2.pt"
vol_model_path = f"{yolo_util_path}/weights/new_opencv_ckpt_b84_e200.pth"
names = yolov3_utils.utils.load_classes(f"{yolo_util_path}/ObjectDetection/yolov3/data/403food.names")
meta_data_path = "./backend/networks/calories/음식분류 AI 데이터 영양DB.xlsx"
calories_model = MealCaloriesModel(
    config_path,
    weight_path,
    vol_model_path,
    meta_data_path
)

"""
yolo_util_path = "backend/networks/calories"
config_path = f"{yolo_util_path}/ObjectDetection/yolov3/cfg/yolov3-spp-403cls.cfg"
weight_path = f"{yolo_util_path}/weights/best_403food_e200b150v2.pt"
vol_model_path = f"{yolo_util_path}/weights/new_opencv_ckpt_b84_e200.pth"
names = utils.load_classes(f"{yolo_util_path}/ObjectDetection/yolov3/data/403food.names")
meta_data_path = "./backend/networks/calories/음식분류 AI 데이터 영양DB.xlsx"
calories_model = MealCaloriesModel(
    config_path,
    weight_path,
    vol_model_path,
    meta_data_path
)

sample = r"./backend/networks/calories/Regression/sample.JPG"
sample = r"d:\음식 이미지 및 영양정보 텍스트\Validation\[원천]음식분류_01\01015009\01_015_01015009_160852306765632_1.jpeg"
pil_img = Image.open(sample)
det_res, vol_res = calories_model.predict(pil_img, conf_threshold=0.015)
if not det_res is None:
    det_res = det_res[det_res[:,-1]!=0]

idx = [int(i) for i in det_res[:,-1]]
selected_rows = calories_model.meta_data.loc[idx]
qvalues = np.arange(0.25,1.5, 0.25)
factor = qvalues[np.argmax(vol_res)]

df_numerics = selected_rows.select_dtypes(include=['number']) 
selected_rows[df_numerics.columns] = df_numerics * factor
selected_rows
"""