# mandi-price-tracker/app/api/routes.py
from flask import Blueprint, request, jsonify, current_app
from .services import MOCK_DATA, fetch_mandi_data

# Define the Blueprint
api = Blueprint('api', __name__)

# Endpoint to get the initial list of states
@api.route("/get_states", methods=["GET"])
def get_states():
    """Returns all available states from the mock data list."""
    all_states = sorted(list(MOCK_DATA.keys()))
    return jsonify({"states": all_states})

# Endpoint to get districts based on state
@api.route("/get_districts", methods=["POST"])
def get_districts():
    """Returns districts (markets) for a selected state (using mock list)."""
    state = request.json.get("state")
    districts = sorted(list(MOCK_DATA.get(state, {}).keys()))
    return jsonify({"districts": districts})

# Endpoint to get commodities based on state and district
@api.route("/get_commodities", methods=["POST"])
def get_commodities():
    """Returns commodities for a selected district."""
    state = request.json.get("state")
    district = request.json.get("district")
    
    commodities_api_names = MOCK_DATA.get(state, {}).get(district, [])
    return jsonify({"commodities": sorted(commodities_api_names)})

# Core endpoint to fetch price data from the external API
@api.route("/get_prices", methods=["POST"])
def get_prices():
    """Fetches all price data using the live Mandi API."""
    data = request.json
    state = data.get("state")
    district = data.get("district")
    commodity = data.get("commodity")

    if not all([state, district, commodity]):
        return jsonify({"error": "Missing selection parameters."}), 400
        
    # Retrieve configuration variables from the Flask app instance
    api_key = current_app.config['API_KEY']
    base_url = current_app.config['BASE_API_URL']

    price_data = fetch_mandi_data(state, district, commodity, api_key, base_url)
    
    return jsonify(price_data)