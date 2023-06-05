import { useState } from "react";
import { jsPDF } from "jspdf";

const DynamicPDF = () => {
  const [x, setX] = useState(10);
  const [y, setY] = useState(20);
  const [text, setText] = useState("");
  const [pdfData, setPdfData] = useState("");

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text(x, y, text);
    const pdfOutput = doc.output("datauristring");
    setPdfData(pdfOutput);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-2">
        <div>
          <label htmlFor="xInput">X-coordinate:</label>
          <input
            id="xInput"
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="yInput">Y-coordinate:</label>
          <input
            id="yInput"
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="textInput">Text:</label>
          <input
            id="textInput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleGeneratePDF}>Generate PDF</button>

      {pdfData && (
        <div>
          <h3>PDF Preview:</h3>
          <iframe
            src={pdfData}
            width="100%"
            height="500px"
            title="PDF Preview"
          ></iframe>
        </div>
      )}
    </div>
  );
};
export default DynamicPDF;
