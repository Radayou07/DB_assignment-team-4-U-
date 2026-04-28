import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Product() {
  // 1. Set up state to hold the data, loading status, and any errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch the data when the page loads
  useEffect(() => {
    // Make sure this URL matches your Flask port and endpoint
    axios.get('http://127.0.0.1:5000/api/products')
      .then(response => {
        // response.data contains the JSON array sent by Flask
        setProducts(response.data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch data from the backend.");
        setLoading(false);
      });
  }, []); // The empty array [] ensures this only runs once when the component mounts

  // 3. Show loading or error messages if necessary
  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div>{error}</div>;

  // 4. Render the database data onto the screen
  return (
    <div>
      <h2>Product Inventory</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Company</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Expiration Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Stock Level</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the products array and create a table row for each item */}
          {products.map(product => (
            <tr key={product.id}>
              <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>${product.price}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.company}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.expire}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.category_id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {/* Optional: Add basic styling logic based on data */}
                <span style={{ color: product.product_quantity < 50 ? 'red' : 'green' }}>
                  {product.product_quantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}