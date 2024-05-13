import React, { useRef } from 'react';
import ReactToPdf from 'react-to-pdf';

const MyComponent = () => {
  // Create a ref to hold reference of the component you want to convert to PDF
  const componentRef = useRef();

  // Function to trigger PDF generation
  const handleGeneratePdf = () => {
    if (componentRef.current) {
      // If the component ref exists, generate PDF
      componentRef.current.savePdf();
    } else {
      console.error("Target element not found.");
    }
  };

  return (
    <div>
      {/* Your PDF content component */}
      <div ref={componentRef}>
        <h1>Hello, PDF!</h1>
        <p>This is some content for the PDF.</p>
      </div>

      {/* Button to trigger PDF generation */}
      <button onClick={handleGeneratePdf}>Generate PDF</button>

      {/* ReactToPdf component */}
      <ReactToPdf targetRef={componentRef} filename="generated.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate PDF</button>}
      </ReactToPdf>
    </div>
  );
};

export default MyComponent;
