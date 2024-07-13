import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('/api/locations');
        setLocations(res.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h1>Corndog Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location._id}>{location.name} - Rating: {location.rating}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));