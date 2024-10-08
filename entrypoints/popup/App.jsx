import React from 'react';
import './App.css'; // Import the CSS file 

// Define the main App component
const App = () => {
  return (
    // Main container for the application with class for styling
    <div className="app-container">
      {/* Title of the application, styled using CSS class */}
      <h1 className="app-title">LinkedIn Auto Connect</h1>

      {/* Description paragraph explaining the functionality of the app */}
      <p className="app-description">
        Click "Connect with All" on the LinkedIn page to send connection requests.
      </p>
    </div>
  );
};

// Export the App component as the default export
export default App;
