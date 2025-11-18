from dotenv import load_dotenv

load_dotenv()  

config = {
    "FRONT_PORT": 3000,
    "BACKEND_PORT": 5001,
    "DB":{
        "USER_ID":"root",
        "PASSWORD":"1234",
        "HOST":"localhost:3306"
    },
}

cors_config = {
    "allow_origins":[
        f"http://localhost:{config['FRONT_PORT']}"
        ],
    #  "allow_origins":["*"],
    "allow_credentials":True,
    "allow_methods":["*"],
    "allow_headers":["*"],
}

config.update({"CORS":cors_config})