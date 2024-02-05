import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/message') // Update to match your backend URL
      .then(response => response.json())
      .then(data => setMessage(data.text))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Message from the server: {message}
        </p>
      </header>
    </div>
  );
}

export default App;
