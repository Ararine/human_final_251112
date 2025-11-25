
import torch
import numpy as np
from PIL import Image
import torchvision.transforms as T

import sys
sys.path.append("backend/networks/calories/ObjectDetection/yolov3")

from utils import utils
from models import Darknet
imgsz = (320,192)
yolo_util_path = "backend/networks/calories/ObjectDetection"
model = Darknet(f"{yolo_util_path}/yolov3/cfg/yolov3-spp-403cls.cfg", imgsz)
weight_path = f"{yolo_util_path}/best_403food_e200b150v2.pt"
model.load_state_dict(torch.load(weight_path, map_location=torch.device("cpu"))['model'], strict=False)
model.fuse()
names = utils.load_classes(f"{yolo_util_path}/yolov3/data/403food.names")

sample = r"c:\Users\human\Downloads\New_sample\원천데이터\합본_양추정_이미지_TRAIN\image\김밥\Q3\side_주먹밥김밥류_접시_김밥_Q3_00007.JPG"
img = Image.open(sample).convert("RGB")
transform = T.Compose([
    T.Resize(imgsz),  # YOLOv3 input size
    T.ToTensor()           # C,H,W로 변환
])
img = transform(img).unsqueeze(0)  # [1, 3, H, W]
# img = img[:,::-1]
img.min(),img.max()
model.eval()

with torch.no_grad():
    inf_out, train_out = model(img, augment=False) # 큰 객체[0], 중간객체[1], 작은객체[2]

output = utils.non_max_suppression(
    inf_out,0.2, 0.45 ,multi_label=False ,classes=None, agnostic=None)
output = output[0].detach().cpu().numpy()
import cv2
img = Image.open(sample).convert("RGB")
transform = T.Compose([
    T.Resize(imgsz),  # YOLOv3 input size
])
img = transform(img)
view_img = np.array(img)

for det in output:
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

# Save result

cv2.imwrite("test.png", view_img[...,::-1])

