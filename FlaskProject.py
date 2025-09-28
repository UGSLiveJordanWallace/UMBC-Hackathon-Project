import flask
from flask import Flask, request
from MH_BackEndData import plan
from prompt_generation import generateprompt
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    origins=["*"]
)

@app.route('/handle_post', methods=["POST", "OPTIONS"])
def handle_post():
    if request.method == "POST":
        data = request.get_json()
        geolocation = data['geolocation']
        ingredientList = data['ingredientList']
        dietaryRestrictions = data["dietaryRestrictions"]
        allergens = data["allergies"]
        numHCMeals = data["numHCMeals"]

        response = flask.jsonify(plan(generateprompt(geolocation,ingredientList,dietaryRestrictions,allergens,numHCMeals)))
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response
    return {"error": "Server Error"}

if __name__ == '__main__':
    app.run()
