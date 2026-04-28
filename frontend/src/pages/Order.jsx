import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Order() {
   const [data, setData] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/order')
      .then(response => setData(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <h1>Orders Page</h1>
      <p>Order management content will appear here.</p>
    </div>
  );
}
