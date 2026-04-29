import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

function Products() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    product_quantity: '',
    image: '',
    company: '',
    expire: '',
    category_id: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset and open modal for adding
  const handleAddNew = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      name: '',
      price: '',
      product_quantity: '',
      image: '',
      company: '',
      expire: '',
      category_id: ''
    });
    setIsPanelOpen(true);
  };

  // Open modal for editing
  const handleEdit = (product) => {
    setIsEditMode(true);
    setEditId(product.id);
    setFormData({
      name: product.name || '',
      price: product.price || '',
      product_quantity: product.product_quantity || '',
      image: product.image || '',
      company: product.company || '',
      expire: product.expire ? product.expire.split('T')[0] : '',
      category_id: product.category_id || ''
    });
    setIsPanelOpen(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProducts(); // Refresh list
        } else {
          const error = await response.json();
          console.error('Delete error:', error);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Close modal
  const handleClose = () => {
    setIsPanelOpen(false);
    setFormData({
      name: '',
      price: '',
      product_quantity: '',
      image: '',
      company: '',
      expire: '',
      category_id: ''
    });
  };
  // Order product
  const handleOrder = (product) => {
    // For now, just log it or you can navigate to orders page
    console.log('Order product:', product);
    alert(`Order placed for: ${product.name}`);
    // Later you can navigate to orders page with this product
    // navigate('/orders', { state: { product } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isEditMode 
        ? `http://localhost:5000/api/products/${editId}`
        : 'http://localhost:5000/api/products';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      console.log('Submitting to:', url, 'Method:', method, 'Data:', formData);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        handleClose();
        fetchProducts();
      } else {
        const error = await response.json();
        console.error('Submit error:', error);
        alert('Error: ' + (error.error || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again.');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'N/A';
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCategoryName(product.category_id).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id); // Sort by ID

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">Real-time tracking global stock levels</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <button 
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Add Product
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <input 
            type="text"
            placeholder="Search products by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Product List</h2>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Image</th>
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Expire</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">
                        <img 
                          src={product.image || 'https://via.placeholder.com/40'} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40?text=No+Img';
                          }}
                        />
                      </td>
                      <td className="py-3">{product.id}</td>
                      <td className="py-3 font-medium">{product.name}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {getCategoryName(product.category_id)}
                        </span>
                      </td>
                      <td className="py-3">${product.price}</td>
                      <td className="py-3">
                        <span className={`font-medium ${
                          product.product_quantity === 0 ? 'text-red-500' :
                          product.product_quantity < 10 ? 'text-orange-500' :
                          'text-green-500'
                        }`}>
                          {product.product_quantity}
                        </span>
                      </td>
                      <td className="py-3">{product.company || 'N/A'}</td>
                      <td className="py-3">
                        {product.expire ? new Date(product.expire).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3">
                        {product.product_quantity === 0 ? (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Out of Stock</span>
                        ) : product.product_quantity < 10 ? (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Low Stock</span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">In Stock</span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOrder(product)}
                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          >
                            Order
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal 
        isOpen={isPanelOpen} 
        onClose={handleClose}
        title={isEditMode ? "Edit Product" : "Add New Product"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input 
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder='Ra Dayou'
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input 
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder='67'
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input 
                type="number"
                name="product_quantity"
                value={formData.product_quantity}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder='168'
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input 
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder='idk.icm'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expire Date</label>
              <input 
                type="date"
                name="expire"
                value={formData.expire}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <button 
              type="button"
              onClick={handleClose}  // ← Use handleClose instead of setIsPanelOpen
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEditMode ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Products;