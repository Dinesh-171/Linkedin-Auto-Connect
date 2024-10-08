import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Define a content script that will run on LinkedIn's "Grow My Network" page.
export default defineContentScript({
  
  // Specify the URL pattern where this script will run.
  matches: ['https://www.linkedin.com/mynetwork/grow/*'],
  
  main() {
    // Define the ConnectButton component, which handles the connection requests.
    const ConnectButton = () => {
      const [isProcessing, setIsProcessing] = useState(false); // State to track if connection requests are being processed.

      // Function to handle the click event for sending connection requests.
      const handleConnectClick = () => {
        // If already processing, prevent further clicks.
        if (isProcessing) return;

        setIsProcessing(true); // Set processing state to true to indicate the process has started.

        try {
          // Select all buttons on the page and filter those that contain the text "Connect".
          const connectButtons = Array.from(document.querySelectorAll('button')).filter(
            (button) => button.tagName === 'BUTTON' && button.innerText.trim().includes('Connect')
          );

          // If no connect buttons are found, notify the user and exit.
          if (connectButtons.length === 0) {
            console.log('No connection buttons found on the page.');
            alert('No connection buttons available to click.');
            setIsProcessing(false); // Reset processing state.
            return;
          }

          let index = 0; // Initialize an index to keep track of the current button being clicked.

          // Function to click a button at the current index.
          const clickButton = () => {
            const button = connectButtons[index];
            if (button) {
              try {
                button.click(); // Attempt to click the button.
                console.log(`Success: Clicked Connect button at index: ${index}`);
              } catch (error) {
                console.error(`Error clicking button at index ${index}:`, error);
              }
            }
          };

          // Perform the first click immediately for a quicker user experience.
          clickButton();
          index++;

          // Use an interval to click the remaining buttons with a random delay.
          const interval = setInterval(() => {
            // Stop the process once all buttons have been clicked.
            if (index >= connectButtons.length) {
              clearInterval(interval); // Clear the interval.
              console.log('All connection requests have been processed.');
              alert('All connection requests have been sent!');
              setIsProcessing(false); // Reset processing state.
              return;
            }

            clickButton(); // Click the next button.
            index++; // Move to the next button.
          }, Math.random() * (3000 - 1000) + 1000); // Random delay between 1-3 seconds to simulate human behavior.
        } catch (error) {
          // Handle any errors that occur during the connection process.
          console.error('An error occurred while sending connection requests:', error);
          alert('Something went wrong. Please try again.');
          setIsProcessing(false); // Reset processing state.
        }
      };

      // Render a button to initiate the connection process.
      return (
        <button
          onClick={handleConnectClick}
          style={{
            position: 'fixed', // Fixed position so it stays on the screen.
            top: '20px', // 20px from the top.
            right: '20px', // 20px from the right.
            zIndex: '9999', // High z-index to ensure it stays on top.
            padding: '12px 20px', // Padding for a larger clickable area.
            backgroundColor: isProcessing ? '#005582' : '#0073b1', // Change color based on processing state.
            color: '#ffffff', // White text color.
            border: 'none', // Remove default border.
            borderRadius: '5px', // Rounded corners.
            fontSize: '16px', // Font size.
            cursor: 'pointer', // Pointer cursor to indicate clickability.
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add subtle shadow for depth.
            transition: 'background-color 0.3s, transform 0.3s', // Smooth transition for color and scale.
            transform: isProcessing ? 'scale(1.05)' : 'scale(1)', // Slightly enlarge button when processing.
          }}
          disabled={isProcessing} // Disable the button when processing.
        >
          {isProcessing ? 'Connecting...' : 'Connect with All'}
        </button>
      );
    };

    // Function to render the ConnectButton component into the page.
    function renderConnectButton() {
      const container = document.createElement('div'); // Create a container for the button.
      container.setAttribute('id', 'connect-button-container'); // Assign an ID for easier identification.
      document.body.appendChild(container); // Append the container to the body.

      const root = createRoot(container); // Create a React root for the container.
      root.render(<ConnectButton />); // Render the ConnectButton component into the container.
    }

    // Add an event listener to render the button once the window has fully loaded.
    window.addEventListener('load', renderConnectButton);
  },
});
