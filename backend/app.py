import os
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Enable CORS to allow requests from your React frontend
CORS(app)

# --- Database Connection Helper ---
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Database Connection Error: {err}")
        return None

# --- Mock Data Endpoints ---

@app.route('/api/home', methods=['GET'])
def get_home_data():
    return jsonify({"message": "Welcome to the Inventory Control Dashboard"})

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Fail to connect to database."}), 500
    
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM products;")
        products = cursor.fetchall()
        return jsonify(products)
    finally:
        cursor.close()
        conn.close()

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