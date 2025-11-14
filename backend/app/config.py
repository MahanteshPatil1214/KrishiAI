# mandi-price-tracker/app/config.py
import os

class Config:
    # Basic Config
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'XbdnSWWAunOW1XXj9nGakk4ZipRFR2kZbMpVolWMuCM'
    
    # API Config
    BASE_API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"

class DevelopmentConfig(Config):
    DEBUG = True
    # NOTE: Keep your actual API Key here for easy development setup
    API_KEY = "579b464db66ec23bdd0000013ca15fe853e6402a7fb20f661e2eedb2" 

class ProductionConfig(Config):
    DEBUG = False
    # Load API Key from environment variables in production
    API_KEY = os.environ.get('MANDI_API_KEY') or 'production-key-placeholder'

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}