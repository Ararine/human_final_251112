
import torch
import numpy as np
from PIL import Image
import torchvision.transforms as T

import sys
sys.path.append("backend/networks/calories/ObjectDetection/yolov3")

from utils import utils
from models import Darknet

class MealVolumeModel:
    def __init__(self, weight_path):
        self.weight_path = weight_path
        self.setup()        
    def setup(self):
        ckpt = torch.load(
            self.weight_path, map_location=torch.device("cpu"))
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
        return probs

"""
model_path = "./backend/networks/calories/weights/new_opencv_ckpt_b84_e200.pth"
sample = r"./backend/networks/calories/Regression/sample.JPG"
calories_model = MealVolumeModel(weight_path=model_path)
pil_img = Image.open(sample)
calories_model.predict(pil_img)
# Q1, Q2, Q3, Q4, Q5로 25% 50% 75% 100% 125%로 분류하는 형태로 제공
"""

class MealDetectionModel:
    def __init__(self,config_path, weight_path, labels_list, img_size = (320,192)):
        self.config_path = config_path
        self.weight_path = weight_path
        self.img_size = img_size
        self.labels_list = labels_list
        self.setup()
        
    def setup(self):
        self.model = Darknet(self.config_path, self.img_size)
        weight = torch.load(self.weight_path, map_location=torch.device("cpu"))
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
        output = utils.non_max_suppression(
            inf_out, conf_threshold, iou_threshold ,multi_label=False ,classes=None, agnostic=None)
        output = [i.detach().cpu().numpy() for i in output]
        return output
    

"""
imgsz = (320,192)
yolo_util_path = "backend/networks/calories"
config_path = f"{yolo_util_path}/ObjectDetection/yolov3/cfg/yolov3-spp-403cls.cfg"
weight_path = f"{yolo_util_path}/weights/best_403food_e200b150v2.pt"
names = utils.load_classes(f"{yolo_util_path}/ObjectDetection/yolov3/data/403food.names")

meal_detection_model = MealDetectionModel(config_path, weight_path, names)
sample = r"./backend/networks/calories/Regression/sample.JPG"
pil_img = Image.open(sample)
output = meal_detection_model.predict(pil_img)

#  시각화
transform = T.Compose([
    T.Resize(imgsz),  # YOLOv3 input size
])
img = transform(pil_img)
view_img = np.array(img)
import cv2
for det in output[0]:
    x1, y1, x2, y2, score, cls = det.tolist()
    cls = int(cls)
    cv2.rectangle(view_img,
                    (int(x1), int(y1)),
                    (int(x2), int(y2)),
                    (0, 255, 0), 2)
    label = f"{names[cls]} {score:.2f}"
    cv2.putText(view_img, label, (int(x1), int(y1) - 5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6,
                (0, 255, 0), 2)

cv2.imwrite("test.png", view_img[...,::-1])
"""

