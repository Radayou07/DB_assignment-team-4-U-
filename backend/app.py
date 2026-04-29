from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
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

# Models
class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    product_quantity = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(1000))
    company = db.Column(db.String(45))
    expire = db.Column(db.Date)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    
    category = db.relationship('Category', backref='products')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price),
            'product_quantity': self.product_quantity,
            'image': self.image,
            'company': self.company,
            'expire': str(self.expire) if self.expire else None,
            'category_id': self.category_id,
            'category_name': self.category.name if self.category else None
        }

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    description = db.Column(db.String(255))
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

# GET all products
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# GET single product
@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        product = Product.query.get_or_404(id)
        return jsonify(product.to_dict())
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# POST create product
@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.json
        print("Received data:", data)
        
        product = Product(
            name=data['name'],
            price=data['price'],
            product_quantity=data['product_quantity'],
            image=data.get('image', ''),
            company=data.get('company', ''),
            expire=datetime.strptime(data['expire'], '%Y-%m-%d').date() if data.get('expire') else None,
            category_id=data.get('category_id') if data.get('category_id') else None
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({'id': product.id, 'message': 'Product created successfully'}), 201
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# PUT update product
@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        data = request.json
        print(f"Updating product {id}:", data)
        
        product = Product.query.get_or_404(id)
        
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.product_quantity = data.get('product_quantity', product.product_quantity)
        product.image = data.get('image', product.image)
        product.company = data.get('company', product.company)
        product.expire = datetime.strptime(data['expire'], '%Y-%m-%d').date() if data.get('expire') else None
        product.category_id = data.get('category_id') if data.get('category_id') else None
        
        db.session.commit()
        
        return jsonify({'message': 'Product updated successfully'})
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# DELETE product
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        print(f"Deleting product {id}")
        
        product = Product.query.get_or_404(id)
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'})
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# GET all categories
@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        categories = Category.query.all()
        return jsonify([category.to_dict() for category in categories])
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# POST create category
@app.route('/api/categories', methods=['POST'])
def create_category():
    try:
        data = request.json
        category = Category(
            name=data['name'],
            description=data.get('description', '')
        )
        db.session.add(category)
        db.session.commit()
        
        return jsonify({'id': category.id, 'message': 'Category created'}), 201
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Creates tables if they don't exist
    app.run(debug=True, port=5000)