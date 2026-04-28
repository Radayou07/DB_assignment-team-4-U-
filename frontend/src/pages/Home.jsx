// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/home')
      .then(response => setData(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Message from Backend: {data}</p>
    </div>
  );
}