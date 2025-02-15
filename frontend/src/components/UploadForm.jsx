import React, { useState } from "react";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
        }
    };

    // Upload image to the backend
    const uploadImage = async () => {
        if (!file) {
            alert("Please select an image first!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:3000/krishi/disease/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to get response from server");

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to detect disease.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">🌱 Upload Image for Disease Detection</h2>

            {/* Image Upload Input */}
            <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 p-2 border rounded-lg"
            />

            {/* Image Preview */}
            {preview && (
                <div className="mb-4">
                    <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-lg shadow-md" />
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={uploadImage}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                disabled={loading}
            >
                {loading ? "🔍 Detecting..." : "📤 Upload & Detect"}
            </button>

            {/* Prediction Results */}
            {result && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-80">
                    <h3 className="text-lg font-semibold">📝 Predictions:</h3>
                    <ul className="list-disc ml-6">
                        {result.top_3_predictions.map((item, index) => (
                            <li key={index} className="mt-2">
                                <strong>{index + 1}. {item.disease}:</strong> {item.probability.toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
