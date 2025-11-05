# mandi-price-tracker/app/__init__.py
from flask import Flask, render_template
from flask_cors import CORS 

def create_app(config_name='default'):
    # Initialize the Flask application
    app = Flask(__name__)
    
    # Load configuration from config.py
    from .config import config
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    CORS(app) 
    
    # --- Register Blueprints ---
    
    # Register the Core API Blueprint
    from .api.routes import api as api_blueprint
    # All routes in api/routes.py will be prefixed with '/api'
    app.register_blueprint(api_blueprint, url_prefix='/api') 
    
    # Simple root route for demonstration/frontend hosting
    @app.route("/")
    def index():
        # This assumes your React build files are in the 'static' folder
        # or you're serving the frontend separately.
        # For this setup, we'll return a simple welcome message:
        return "Backend is running successfully. Access API endpoints at /api/..."
    
    return app