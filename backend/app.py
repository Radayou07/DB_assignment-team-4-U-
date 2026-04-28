from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
# Enable CORS to allow requests from your React frontend
CORS(app)

# --- Mock Data Endpoints ---

@app.route('/api/home', methods=['GET'])
def get_home_data():
    return jsonify({"message": "Welcome to the Inventory Control Dashboard"})

@app.route('/api/products', methods=['GET'])
def get_products():
    # This will eventually query your SQL database
    return jsonify([
        {"id": 1, "name": "Wireless Mouse", "price": 25.99},
        {"id": 2, "name": "Mechanical Keyboard", "price": 85.00}
    ])

@app.route('/api/orders', methods=['GET'])
def get_orders():
    return jsonify([{"order_id": 101, "status": "Pending"}])

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    return jsonify([{"product_id": 1, "stock_level": 150, "location": "Aisle 4"}])

@app.route('/api/warehouses', methods=['GET'])
def get_warehouses():
    return jsonify([{"id": 1, "name": "Main Facility", "capacity": "80%"}])

if __name__ == '__main__':
    app.run(debug=True, port=5000)