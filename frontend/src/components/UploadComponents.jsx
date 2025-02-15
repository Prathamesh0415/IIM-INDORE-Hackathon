import { useState } from "react";

const UploadComponents = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setData(null); // Reset previous data
    setPrediction(""); // Reset prediction result
  };

  // Extract Data from PDF
  const processPDF = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/extract?location=Delhi", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to extract data!");

      const result = await response.json();
      console.log("Extracted Data:", result); // Debugging log
      setData(result);
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Error extracting data. Check the console for details.");
    }
  };

  // Send Data for Crop Prediction
  const sendToModel = async () => {
    if (!data) return alert("Extract data first before predicting!");

    // Ensure extracted values are valid numbers
    const payload = {
      n: parseFloat(data.N) || 0,
      p: parseFloat(data.P) || 0,
      k: parseFloat(data.K) || 0,
      ph: parseFloat(data.pH) || 0,
      temperature: parseFloat(data.temperature) || 0,
      humidity: parseFloat(data.humidity) || 0,
      rainfall: parseFloat(data.rainfall) || 0,
    };

    console.log("Sending Data for Prediction:", payload); // Debugging log

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Prediction failed!");

      const result = await response.json();
      console.log("Prediction Result:", result); // Debugging log
      setPrediction(result.crop);
    } catch (error) {
      console.error("Error predicting crop:", error);
      alert("Error predicting crop. Check the console for details.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Soil Report</h2>
      
      {/* File Upload Input */}
      <input type="file" onChange={handleFileChange} className="mb-4 border p-2 w-full" />

      {/* Extract Data Button */}
      <button onClick={processPDF} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Extract Data
      </button>

      {/* Display Extracted Data */}
      {data && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p><strong>N:</strong> {data.N}</p>
          <p><strong>P:</strong> {data.P}</p>
          <p><strong>K:</strong> {data.K}</p>
          <p><strong>pH:</strong> {data.pH}</p>
          <p><strong>Temp:</strong> {data.temperature}°C</p>
          <p><strong>Humidity:</strong> {data.humidity}%</p>
          <p><strong>Rainfall:</strong> {data.rainfall}mm</p>

          {/* Predict Crop Button */}
          <button
            onClick={sendToModel}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Predict Crop
          </button>
        </div>
      )}

      {/* Display Prediction Result */}
      {prediction && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h3 className="font-bold text-lg">Recommended Crop: {prediction}</h3>
        </div>
      )}
    </div>
  );
};

export default UploadComponents;
