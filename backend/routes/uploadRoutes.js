import express from "express";
import upload from "../middlewares/multerConfig.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Prepare FormData to send to FastAPI
        const formData = new FormData();
        formData.append("file", fs.createReadStream(req.file.path));

        // Send file to FastAPI model
        const response = await axios.post("http://127.0.0.1:8001/predict", formData, {
            headers: { ...formData.getHeaders() },
        });

        // Send model predictions back to frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to process image" });
    }
});

export default router;
