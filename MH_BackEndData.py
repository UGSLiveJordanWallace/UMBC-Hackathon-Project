from google import genai
from google.genai import types
from dotenv import load_dotenv
from pydantic import BaseModel
import os

class Item(BaseModel):
    day:int
    meal:str
    menu_item:str
    health_asmt:str
    hc:bool
    
class Meal(BaseModel):
    meal:str
    healthiness:int

class Meals(BaseModel):
    place:str
    meals:list[Meal]

def plan(name):
    API_Key = os.getenv('API_Key')
    load_dotenv()

    client = genai.Client(api_key=API_Key)

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=name,
        config={
            "response_mime_type": "application/json",
            "response_schema":list[Item]
        },
    )
    return response.text


