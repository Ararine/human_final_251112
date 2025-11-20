# controllers/test.py

from services.test import get_hello_message

def hello_controller():
    return get_hello_message()
