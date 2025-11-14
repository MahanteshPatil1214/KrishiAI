# mandi-price-tracker/app/api/services.py
import requests
from collections import defaultdict

# ==============================================================================
# MOCK DATA (Should ideally be moved to a small database or external file later)
# ==============================================================================

MOCK_DATA = {
    "Andhra Pradesh": {
        "Chittor": ["Tomato"]
    },
    "Bihar": {
        "Kishanganj": ["Onion", "Potato"]
    },
    "Gujarat": {
        "Amreli": ["Brinjal", "Cabbage", "Cauliflower", "Coriander(Leaves)", "Ginger(Green)", "Green Chilli", "Guar", "Lemon", "Tomato", "Bhindi(Ladies Finger)"],
        "Anand": ["Banana"],
        "Chhota Udaipur": ["Cotton", "Maize"]
    },
    "Haryana": {
        "Bhiwani": ["Apple", "Bottle Gourd", "Cabbage", "Cauliflower", "Guava", "Onion", "Pomegranate", "Potato", "Raddish", "Tomato"],
        "Gurgaon": ["Apple", "Banana", "Bitter Gourd", "Bottle Gourd", "Cabbage", "Carrot", "Cauliflower", "Guava", "Onion", "Pomegranate", "Potato", "Tomato", "Bhindi(Ladies Finger)"],
        "Rewari": ["Banana", "Brinjal", "Cabbage", "Capsicum", "Onion", "Potato", "Raddish"]
    },
    "Himachal Pradesh": {
        "Kangra": ["Apple", "Banana", "Beetroot", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Cabbage", "Capsicum", "Carrot", "Cauliflower", "Colacasia", "Coriander(Leaves)", "Cucumbar(Kheera)", "French Beans (Frasbean)", "Garlic", "Ginger(Green)", "Green Chilli", "Guava", "Indian Colza(Sarson)", "Lemon", "Mashrooms", "Methi(Leaves)", "Mousambi(Sweet Lime)", "Onion", "Orange", "Papaya", "Peas Wet", "Persimon(Japani Fal)", "Pineapple", "Pomegranate", "Potato", "Pumpkin", "Raddish", "Spinach", "Tomato", "Turnip", "Bhindi(Ladies Finger)"]
    },
    "Jammu And Kashmir": {
        "Kathua": ["Apple", "Banana", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Cabbage", "Capsicum", "Carrot", "Cauliflower", "Coriander(Leaves)", "Cucumbar(Kheera)", "Garlic", "Ginger(Green)", "Guava", "Indian Beans (Seam)", "Kinnow", "Knool Khol", "Lemon", "Mashrooms", "Mousambi(Sweet Lime)", "Onion", "Orange", "Papaya", "Peas Wet", "Pineapple", "Pomegranate", "Potato", "Pumpkin", "Raddish", "Round Gourd", "Spinach", "Tomato", "Turnip", "Bhindi(Ladies Finger)"]
    },
    "Karnataka": { 
        "Bangalore": ["Tomato", "Onion", "Potato"],
        "Mysore": ["Rice", "Banana", "Coconut"]
    },
    "Kerala": {
        "Alappuzha": ["Amaranthus", "Amphophalus", "Ashgourd", "Banana", "Banana - Green", "Beetroot", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Cabbage", "Capsicum", "Carrot", "Cauliflower", "Colacasia", "Cowpea(Veg)", "Cucumbar(Kheera)", "Ginger(Green)", "Green Chilli", "Mango", "Onion", "Bhindi(Ladies Finger)"],
        "Ernakulam": ["Amaranthus", "Arecanut(Betelnut/Supari)", "Ashgourd", "Banana", "Banana - Green", "Beetroot", "Bitter Gourd", "Black Pepper", "Bottle Gourd", "Brinjal", "Cabbage", "Carrot", "Cauliflower", "Coconut Seed", "Colacasia", "Cowpea(Veg)", "Cucumbar(Kheera)", "Drumstick", "Elephant Yam (Suran)", "Field Pea", "Ginger(Dry)", "Ginger(Green)", "Green Chilli", "Indian Beans (Seam)", "Lemon", "Little Gourd (Kundru)", "Mango (Raw-Ripe)", "Onion", "Pineapple", "Potato", "Pumpkin", "Snakeguard", "Tapioca", "Tomato", "Bhindi(Ladies Finger)"],
        "Idukki": ["Banana", "Ginger(Green)"],
        "Kottayam": ["Amaranthus", "Amphophalus", "Ashgourd", "Banana", "Banana - Green", "Beetroot", "Bitter Gourd", "Brinjal", "Cabbage", "Cauliflower", "Coconut", "Colacasia", "Cowpea(Veg)", "Cucumbar(Kheera)", "Drumstick", "Elephant Yam (Suran)", "Ginger(Green)", "Green Chilli", "Indian Beans (Seam)", "Lemon", "Little Gourd (Kundru)", "Mango (Raw-Ripe)", "Onion", "Pineapple", "Potato", "Pumpkin", "Snakeguard", "Tapioca", "Tomato", "Bhindi(Ladies Finger)"],
        "Kozhikode(Calicut)": ["Amaranthus", "Amphophalus", "Ashgourd", "Banana - Green", "Beetroot", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Cabbage", "Carrot", "Cauliflower", "Cluster Beans", "Coconut Seed", "Cowpea(Veg)", "Cucumbar(Kheera)", "Drumstick", "French Beans (Frasbean)", "Ginger(Green)", "Green Chilli", "Onion", "Potato", "Pumpkin", "Raddish", "Snakeguard", "Tomato", "Bhindi(Ladies Finger)"],
        "Pathanamthitta": ["Coconut Oil"],
        "Thirssur": ["Cowpea(Veg)", "Cucumbar(Kheera)", "Green Chilli", "Onion", "Potato", "Pumpkin", "Tapioca", "Tomato", "Duster Beans"],
        "Thiruvananthapuram": ["Amaranthus", "Ashgourd", "Banana", "Bitter Gourd", "Brinjal", "Cabbage", "Carrot", "Cauliflower", "Cluster Beans", "Colacasia", "Cowpea(Veg)", "Drumstick", "Elephant Yam (Suran)", "Green Chilli", "Pineapple", "Pumpkin", "Snakeguard"],
        "Wayanad": ["Amaranthus", "Banana", "Bitter Gourd", "Coffee", "Cowpea(Veg)", "Cucumbar(Kheera)", "Ginger(Dry)", "Green Chilli", "Paddy(Dhan)(Common)", "Pepper Ungarbled", "Pumpkin", "Rubber"]
    },
    "Madhya Pradesh": {
        "Dhar": ["Cotton"],
        "Jabalpur": ["Maize"],
        "Jhabua": ["Soyabean"],
        "Panna": ["Wheat"],
        "Raisen": ["Wheat"],
        "Ujjain": ["Onion"],
        "Vidisha": ["Soyabean"]
    },
    "Nagaland": {
        "Kohima": ["Beans", "Cabbage", "Carrot", "Ginger(Green)", "Potato"],
        "Mokokchung": ["Ashgourd", "Banana - Green", "Bitter Gourd", "Cabbage", "Cauliflower", "Chow Chow", "Pumpkin", "Bhindi(Ladies Finger)"],
        "Tsemenyu": ["Banana", "Beans", "Chow Chow", "Leafy Vegetable", "Papaya", "Yam (Ratalu)"]
    },
    "Odisha": {
        "Boudh": ["Banana - Green", "Bhindi(Ladies Finger)", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Cabbage", "Cauliflower", "Cucumbar(Kheera)", "Pointed Gourd (Parval)", "Pumpkin", "Tomato"],
        "Khurda": ["Bitter Gourd", "Brinjal", "Cauliflower", "Fish", "Garlic", "Ginger(Dry)", "Onion", "Pointed Gourd (Parval)", "Potato", "Tomato"]
    },
    "Punjab": {
        "Ludhiana": ["Bottle Gourd", "Onion", "Potato", "Raddish"],
        "Patiala": ["Onion", "Potato", "Tomato"]
    },
    "Rajasthan": {
        "Balotra": ["Green Gram (Moong)(Whole)", "Moath Dal", "Onion", "Potato", "Tomato"],
        "Dungarpur": ["Cabbage"],
        "Hanumangarh": ["Bajra(Pearl Millet/Cumbu)", "Bengal Gram(Gram)(Whole)", "Onion", "Potato", "Tomato"]
    },
    "Telangana": {
        "Adilabad": ["Maize"],
        "Karimnagar": ["Cotton", "Maize"],
        "Khammam": ["Paddy(Dhan)(Common)"],
        "Warangal": ["Beetroot", "Bhindi(Ladies Finger)", "Bitter Gourd", "Brinjal", "Cabbage", "Capsicum", "Carrot", "Cauliflower", "Colacasia", "Cucumbar(Kheera)", "Field Pea", "French Beans (Frasbean)", "Green Chilli", "Potato", "Ridgeguard(Tori)", "Tomato"]
    },
    "Tripura": {
        "Dhalai": ["Ashgourd", "Banana - Green", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Colacasia"]
    },
    "Uttar Pradesh": {
        "Badaun": ["Paddy(Dhan)(Common)", "Potato"],
        "Bulandshahar": ["Bhindi(Ladies Finger)", "Bottle Gourd", "Brinjal", "Cauliflower", "Cucumbar(Kheera)", "Garlic", "Ginger(Green)", "Green Chilli", "Lemon", "Onion", "Potato", "Pumpkin"],
        "Etawah": ["Onion", "Paddy(Dhan)(Basmati)", "Potato", "Tomato"],
        "Ghazipur": ["Green Chilli"],
        "Hathras": ["Onion", "Potato", "Tomato"],
        "Khiri (Lakhimpur)": ["Apple", "Bhindi(Ladies Finger)", "Bottle Gourd", "Brinjal", "Cabbage", "Garlic", "Green Chilli", "Gur(Jaggery)", "Lemon", "Onion", "Pointed Gourd (Parval)", "Potato", "Pumpkin", "Tomato", "Wheat"],
        "Mau(Maunathbhanjan)": ["Apple", "Banana", "Bhindi(Ladies Finger)", "Bitter Gourd", "Bottle Gourd", "Brinjal", "Cauliflower", "Cucumbar(Kheera)", "Green Chilli", "Onion", "Potato", "Tomato"],
        "Prayagraj": ["Onion"],
        "Rampur": ["Paddy(Dhan)(Common)", "Wood"],
        "Sambhal": ["Apple", "Bottle Gourd", "Brinjal", "Cauliflower", "Onion", "Potato", "Tomato"]
    },
    "West Bengal": {
        "Hooghly": ["Bhindi(Ladies Finger)", "Bitter Gourd", "Brinjal", "Cauliflower", "Garlic", "Ginger(Dry)", "Green Chilli", "Onion", "Pointed Gourd (Parval)", "Potato", "Rice", "Ridgeguard(Tori)", "Tomato"],
        "Murshidabad": ["Jute", "Rice"]
    }
}


# ==============================================================================
# Helper functions for API interaction (REAL API LOGIC)
# ==============================================================================

def normalize_record(record, default_commodity):
    """Helper to convert API response fields to consistent types."""
    return {
        "date": record.get("arrival_date", "N/A"), 
        "min": int(float(record.get("min_price", 0))) if record.get("min_price") else 0,
        "max": int(float(record.get("max_price", 0))) if record.get("max_price") else 0,
        "modal": int(float(record.get("modal_price", 0))) if record.get("modal_price") else 0,
        "unit": record.get("unit", "Quintal"),
        "commodity_found": record.get("commodity", default_commodity), 
    }

def fetch_mandi_data(state, district, commodity, API_KEY, BASE_API_URL):
    """
    Function to fetch current price, district-wide price range, historical data,
    and competitive market prices using the API Key and Base URL from config.
    """
    
    state_api_value = state.title() 
    district_api_value = district.title() 
    commodity_api_value = commodity.title() 

    # --- 1. FIRST API CALL: Fetch Current and Previous Day Prices (Exact Match) ---
    current_params = {
        "api-key": API_KEY,
        "format": "json",
        "filters[state.keyword]": state_api_value,    
        "filters[district]": district_api_value,      
        "filters[commodity]": commodity_api_value,    
        "sort": "arrival_date", 
        "limit": 2 
    }
    
    current_price_record = None
    previous_price_record = None 
    current_error = None
    
    try:
        response = requests.get(BASE_API_URL, params=current_params, timeout=10)
        response.raise_for_status() 
        raw_data = response.json()
        data_records = raw_data.get('records', [])

        if data_records:
            current_price_record = data_records[0]
            previous_price_record = data_records[1] if len(data_records) > 1 else None
        
    except requests.exceptions.RequestException as e:
        print(f"Current Price API Request failed: {e}")
        current_error = f"Failed to fetch current price: API connection timed out or failed. Please try again."

    # --- CRITICAL CHECK: Exit immediately if the main price record failed to fetch ---
    if current_error or not current_price_record:
        return {"error": current_error or f"No recent records found for '{commodity}' in '{district}' of '{state}'. Please try a different combination."}


    # --- 2. SECOND API CALL: Fetch Historical/Range Data (Broad District Search) ---
    historical_params = {
        "api-key": API_KEY,
        "format": "json",
        "filters[state.keyword]": state_api_value,    
        "filters[district]": district_api_value,      
        "sort": "arrival_date", 
        "limit": 50 
    }
    
    min_prices = []
    max_prices = []
    
    try:
        response = requests.get(BASE_API_URL, params=historical_params, timeout=10)
        response.raise_for_status() 
        raw_data = response.json()
        data_records = raw_data.get('records', [])

        for record in data_records:
            try:
                min_prices.append(int(float(record.get("min_price", 0))))
                max_prices.append(int(float(record.get("max_price", 0))))
            except ValueError:
                continue 

    except requests.exceptions.RequestException as e:
        print(f"Range API Request failed: {e}")

    # --- 3. THIRD API CALL: Fetch 30-Day History for Trend Chart (Specific Commodity) ---
    trend_params = {
        "api-key": API_KEY,
        "format": "json",
        "filters[state.keyword]": state_api_value,
        "filters[district]": district_api_value,
        "filters[commodity]": commodity_api_value,
        "sort": "arrival_date",
        "limit": 30 
    }

    historical_trend_data = []

    try:
        response = requests.get(BASE_API_URL, params=trend_params, timeout=10)
        response.raise_for_status() 
        raw_data = response.json()
        trend_records = raw_data.get('records', [])
        
        for record in trend_records:
            normalized = normalize_record(record, commodity)
            if normalized['modal'] > 0:
                historical_trend_data.append({
                    "date": normalized['date'],
                    "modal": normalized['modal']
                })

    except requests.exceptions.RequestException as e:
        print(f"Trend API Request failed: {e}")

    # --- 4. FOURTH API CALL: Fetch Competitive Markets (State-Wide Search) ---
    competitive_params = {
        "api-key": API_KEY,
        "format": "json",
        "filters[state.keyword]": state_api_value,    
        "filters[commodity]": commodity_api_value,
        "sort": "arrival_date",
        "limit": 100 
    }

    competitive_markets = []
    
    try:
        response = requests.get(BASE_API_URL, params=competitive_params, timeout=10)
        response.raise_for_status() 
        raw_data = response.json()
        comp_records = raw_data.get('records', [])

        # --- Aggregation Logic ---
        market_map = {} # Store only the latest record for each district/market

        # Define the current market key for exclusion
        current_market_key = f"{district_api_value.lower()}-{current_price_record.get('market', '').lower()}"

        for record in comp_records:
            district_name = record.get('district')
            market_name = record.get('market')
            modal_price_str = record.get('modal_price')
            
            if not district_name or not market_name or not modal_price_str:
                continue
                
            try:
                modal_price = int(float(modal_price_str))
            except ValueError:
                continue

            # Key for the map ensures we only use the latest record (since data is sorted by date)
            market_key = f"{district_name.lower()}-{market_name.lower()}"
            
            # 1. Skip if it's the user's currently selected district/market
            # 2. Only accept the first record encountered for a market (which is the newest)
            if market_key != current_market_key and market_key not in market_map:
                
                market_map[market_key] = {
                    "district": district_name.title(),
                    "market": market_name.title(),
                    "modal": modal_price
                }

        # Convert map values to a list and sort by modal price (descending)
        sorted_markets = sorted(
            list(market_map.values()), 
            key=lambda x: x['modal'], 
            reverse=True
        )
        
        # Take the top 3 competitive markets
        competitive_markets = sorted_markets[:3]

    except requests.exceptions.RequestException as e:
        print(f"Competitive Market API Request failed: {e}")
        
    # --- 5. Final Data Assembly ---
    normalized_current = normalize_record(current_price_record, commodity)
    
    # Price Change Calculation
    price_change = {
        "amount": 0, "percent": 0.0, "status": "N/A"
    }

    if previous_price_record:
        normalized_previous = normalize_record(previous_price_record, commodity)
        
        current_modal = normalized_current['modal']
        previous_modal = normalized_previous['modal']
        
        if previous_modal > 0:
            amount_change = current_modal - previous_modal
            percent_change = (amount_change / previous_modal) * 100
            
            price_change = {
                "amount": amount_change,
                "percent": round(percent_change, 2),
                "status": "UP" if amount_change > 0 else ("DOWN" if amount_change < 0 else "FLAT")
            }

    # District Range Calculation (using list comprehensions to exclude 0s)
    valid_min_prices = [p for p in min_prices if p > 0]
    valid_max_prices = [p for p in max_prices if p > 0]
    
    district_range = {
        "date": normalized_current.get('date'),
        "min_district": min(valid_min_prices) if valid_min_prices else 0,
        "max_district": max(valid_max_prices) if valid_max_prices else 0,
        "unit": "Quintal"
    }

    final_commodity = normalized_current.get('commodity_found', commodity)
    
    return {
        "commodity": final_commodity.title(), 
        "state": state,
        "district": district,
        "current": normalized_current,
        "range": district_range,
        "history": historical_trend_data,
        "change": price_change,
        "competitive_markets": competitive_markets
    }