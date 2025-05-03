import React, { useState } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";

const DynamicHeader = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleCheckboxChange = (option) => {
    setSelectedItems((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">Select Options</Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          padding: "10px",
          minWidth: "200px",
          position: "absolute", // Ensure it's absolute
          zIndex: 9999, // Ensure it's above other elements
        }}
        popperConfig={{ modifiers: [{ name: "preventOverflow", options: { boundary: "window" } }] }}
      >
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            label={option}
            checked={selectedItems.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
        ))}
        <hr />
        <Button
        style={{ position: "relative", overflow: "visible" }}
          variant="success"
          size="sm"
          onClick={() => alert(`Selected: ${selectedItems.join(", ")}`)}
        >
          Submit
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DynamicHeader;
