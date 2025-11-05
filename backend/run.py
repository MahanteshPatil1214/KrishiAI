# mandi-price-tracker/run.py
from app import create_app

# Use 'development' configuration by default
app = create_app('development') 

if __name__ == '__main__':
    # Flask-CORS is initialized within create_app
    print("--- Starting Flask Mandi Price Tracker (Development) ---")
    app.run(debug=True)