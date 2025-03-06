import React, { useState } from "react"; // Import React and useState hook
import data from "./data"; // Import data from a local file
import "./style.css"; // Import CSS for styling

// Define the Accordion component
export default function Accordion() {
  // State for single selection
  const [selected, setSelected] = useState(null);
  
  // State to enable/disable multiple selection
  const [enableMultiSelected, setEnableMultiSelected] = useState(false);
  
  // State to hold multiple selected items
  const [multiple, setMultiple] = useState([]);

  // Function to handle single selection
  function handleSingleSelection(currentId) {
    // If the current item is already selected, deselect it; otherwise, select it
    setSelected(currentId === selected ? null : currentId);
  }

  // Function to handle multiple selection
  function handleMultiSelection(currentId) {
    // Create a copy of the current multiple selections
    let updatedMultiple = [...multiple];
    
    // Check if the current ID is already in the selections
    const index = updatedMultiple.indexOf(currentId);
    
    // If not found, add it; if found, remove it
    if (index === -1) {
      updatedMultiple.push(currentId);
    } else {
      updatedMultiple.splice(index, 1);
    }

    // Update the state with the new selections
    setMultiple(updatedMultiple);
  }

  // Log the current selections for debugging
  console.log(selected, multiple);

  return (
    <div className="Wrapper">
      {/* Button to toggle multiple selection mode */}
      <button onClick={() => setEnableMultiSelected(!enableMultiSelected)}>
        Enable Multi Selection
      </button>
      
      <div className="Accordion">
        {data && data.length > 0 ? (
          data.map(item => (
            <div className="Item" key={item.id}>
              {/* Clickable title that handles selection based on mode */}
              <div
                onClick={enableMultiSelected ? () => handleMultiSelection(item.id) : () => handleSingleSelection(item.id)}
                className="title"
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              
              {/* Show content if the item is selected */}
              {(selected === item.id || multiple.includes(item.id)) && (
                <div className="content">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No data present!</div>
        )}
      </div>
    </div>
  );
}