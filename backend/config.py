# config.py
from dotenv import load_dotenv

load_dotenv()

config = {
    "FRONT_PORT": 3000,
    "BACKEND_PORT": 5001,
    "DB": {
        "USER_ID": "root",
        "PASSWORD": "1234",
        "HOST": "localhost",
        "PORT": 3306,
        "DATABASE": "final"
    },
    "JWT_SECRET": "your_secret_key"
}

cors_config = {
    "allow_origins": [f"http://localhost:{config['FRONT_PORT']}"],
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"]
}

config.update({"CORS": cors_config})
