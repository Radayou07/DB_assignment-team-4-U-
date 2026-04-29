from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text  # ← Import text
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
db_host = os.getenv('DB_HOST', 'localhost')
db_user = os.getenv('DB_USER', 'root')
db_password = os.getenv('DB_PASSWORD', '')
db_name = os.getenv('DB_NAME', 'your_database')

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ==================== PRODUCT ROUTES ====================

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        result = db.session.execute(text("""
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        """))
        products = []
        for row in result:
            products.append({
                'id': row[0],
                'name': row[1],
                'price': float(row[2]),
                'product_quantity': row[3],
                'image': row[4],
                'company': row[5],
                'expire': str(row[6]) if row[6] else None,
                'category_id': row[7],
                'category_name': row[8]
            })
        return jsonify(products)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.json
        result = db.session.execute(text("""
            INSERT INTO products (name, price, product_quantity, image, company, expire, category_id)
            VALUES (:name, :price, :quantity, :image, :company, :expire, :category_id)
        """), {
            'name': data['name'],
            'price': data['price'],
            'quantity': data['product_quantity'],
            'image': data.get('image', ''),
            'company': data.get('company', ''),
            'expire': data.get('expire') if data.get('expire') else None,
            'category_id': data.get('category_id') if data.get('category_id') else None
        })
        db.session.commit()
        return jsonify({'id': result.lastrowid, 'message': 'Product created'}), 201
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        data = request.json
        db.session.execute(text("""
            UPDATE products 
            SET name=:name, price=:price, product_quantity=:quantity, image=:image, 
                company=:company, expire=:expire, category_id=:category_id
            WHERE id=:id
        """), {
            'name': data['name'],
            'price': data['price'],
            'quantity': data['product_quantity'],
            'image': data.get('image', ''),
            'company': data.get('company', ''),
            'expire': data.get('expire') if data.get('expire') else None,
            'category_id': data.get('category_id') if data.get('category_id') else None,
            'id': id
        })
        db.session.commit()
        return jsonify({'message': 'Product updated'})
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        db.session.execute(text("DELETE FROM products WHERE id = :id"), {'id': id})
        db.session.commit()
        return jsonify({'message': 'Product deleted'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== CATEGORY ROUTES ====================

@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        result = db.session.execute(text("SELECT * FROM categories"))
        categories = []
        for row in result:
            categories.append({
                'id': row[0],
                'name': row[1],
                'description': row[2]
            })
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categories', methods=['POST'])
def create_category():
    try:
        data = request.json
        result = db.session.execute(text("""
            INSERT INTO categories (name, description) VALUES (:name, :description)
        """), {'name': data['name'], 'description': data.get('description', '')})
        db.session.commit()
        return jsonify({'id': result.lastrowid, 'message': 'Category created'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== CUSTOMER ROUTES ====================

@app.route('/api/customers', methods=['GET'])
def get_customers():
    try:
        result = db.session.execute(text("""
            SELECT c.*, COUNT(o.id) as total_orders
            FROM customer c
            LEFT JOIN `order` o ON c.id = o.customer_id
            GROUP BY c.id
        """))
        customers = []
        for row in result:
            customers.append({
                'id': row[0],
                'name': row[1],
                'number': row[2],
                'address': row[3],
                'image': row[4],
                'total_orders': row[5]
            })
        return jsonify(customers)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/customers', methods=['POST'])
def create_customer():
    try:
        data = request.json
        result = db.session.execute(text("""
            INSERT INTO customer (name, number, address, image)
            VALUES (:name, :number, :address, :image)
        """), {
            'name': data['name'],
            'number': data.get('number', ''),
            'address': data.get('address', ''),
            'image': data.get('image', '')
        })
        db.session.commit()
        return jsonify({'id': result.lastrowid, 'message': 'Customer created'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    try:
        data = request.json
        db.session.execute(text("""
            UPDATE customer SET name=:name, number=:number, address=:address, image=:image 
            WHERE id=:id
        """), {
            'name': data['name'],
            'number': data.get('number', ''),
            'address': data.get('address', ''),
            'image': data.get('image', ''),
            'id': id
        })
        db.session.commit()
        return jsonify({'message': 'Customer updated'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        db.session.execute(text("DELETE FROM customer WHERE id = :id"), {'id': id})
        db.session.commit()
        return jsonify({'message': 'Customer deleted'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ==================== ORDER ROUTES ====================

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        
        # Insert order
        result = db.session.execute(text("""
            INSERT INTO `order` (date, payment_status, customer_id)
            VALUES (:date, :payment_status, :customer_id)
        """), {
            'date': datetime.now().date(),
            'payment_status': data['payment_status'],
            'customer_id': data['customer_id']
        })
        
        order_id = result.lastrowid
        
        # Insert order detail
        db.session.execute(text("""
            INSERT INTO order_detail (quantity, price, order_id, product_id)
            VALUES (:quantity, :price, :order_id, :product_id)
        """), {
            'quantity': data['quantity'],
            'price': data['price'],
            'order_id': order_id,
            'product_id': data['product_id']
        })
        
        # If payment done, subtract stock
        if data['payment_status'] == 1:
            db.session.execute(text("""
                UPDATE products SET product_quantity = product_quantity - :quantity
                WHERE id = :product_id AND product_quantity >= :quantity
            """), {
                'quantity': data['quantity'],
                'product_id': data['product_id']
            })
        
        db.session.commit()
        return jsonify({'id': order_id, 'message': 'Order created'}), 201
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        result = db.session.execute(text("""
            SELECT o.id, o.date, o.payment_status, c.name as customer_name
            FROM `order` o
            LEFT JOIN customer c ON o.customer_id = c.id
            ORDER BY o.date DESC
        """))
        orders = []
        for row in result:
            orders.append({
                'id': row[0],
                'date': str(row[1]),
                'payment_status': row[2],
                'customer_name': row[3]
            })
        return jsonify(orders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)