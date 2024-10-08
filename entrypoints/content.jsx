import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Content script for LinkedIn's "Grow My Network" page.
export default defineContentScript({
  matches: ['https://www.linkedin.com/mynetwork/grow/*'],

  main() {
    const ConnectButton = () => {
      const [isProcessing, setIsProcessing] = useState(false); // Track connection request processing.

      const handleConnectClick = () => {
        if (isProcessing) return; // Prevent multiple clicks during processing.
        setIsProcessing(true); // Start processing state.

        // Get all "Connect" buttons on the page.
        const connectButtons = Array.from(document.querySelectorAll('button'))
          .filter(button => button.innerText.trim().includes('Connect'));

        if (connectButtons.length === 0) {
          alert('No connection buttons available to click.');
          setIsProcessing(false); // Reset processing state.
          return;
        }

        let index = 0; // Track the current button index.

        const clickButton = () => {
          const button = connectButtons[index];
          if (button) {
            button.click(); // Click the button.
            console.log(`Clicked Connect button at index: ${index}`);
          }
        };

        clickButton(); // Click the first button.
        index++;

        // Click remaining buttons at random intervals.
        const interval = setInterval(() => {
          if (index >= connectButtons.length) {
            clearInterval(interval); // Stop when done.
            alert('All connection requests have been sent!');
            setIsProcessing(false); // Reset processing state.
            return;
          }
          clickButton(); // Click the next button.
          index++;
        }, Math.random() * 2000 + 1000); // Random delay: 1-3 seconds.
      };

      return (
        <button
          onClick={handleConnectClick}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '12px 20px',
            backgroundColor: isProcessing ? '#005582' : '#0073b1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, transform 0.3s',
            transform: isProcessing ? 'scale(1.05)' : 'scale(1)',
          }}
          disabled={isProcessing} // Disable button during processing.
        >
          {isProcessing ? 'Connecting...' : 'Connect with All'}
        </button>
      );
    };

    // Render the ConnectButton component into the page.
    const renderConnectButton = () => {
      if (document.getElementById('connect-button-container')) return; // Exit if button exists.

      const container = document.createElement('div'); // Create container for the button.
      container.id = 'connect-button-container';
      document.body.appendChild(container); // Append to body.

      const root = createRoot(container); // Create a React root.
      root.render(<ConnectButton />); // Render the component.
    };

    // Remove button if not on the specified URL.
    const hideConnectButton = () => {
      const container = document.getElementById('connect-button-container');
      if (container) container.remove();
    };

    // Add event listener for DOM content loaded.
    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.href.includes('/mynetwork/grow')) {
        renderConnectButton(); // Render if on correct page.
      } else {
        hideConnectButton(); // Hide button otherwise.
      }
    });

    // Observe URL changes for single-page applications.
    const observer = new MutationObserver(() => {
      if (window.location.href.includes('/mynetwork/grow')) {
        renderConnectButton(); // Re-render if on the correct page.
      } else {
        hideConnectButton(); // Hide button if navigating away.
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  },
});
