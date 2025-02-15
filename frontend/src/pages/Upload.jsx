import React from "react";
import UploadForm from "../components/UploadForm";

function Upload() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">🌱 Crop Disease Detection</h1>
            <UploadForm />
        </div>
    );
}

export default Upload;
