async function processPDF(event) {
    const file = event.target.files[0];

    if (file) {
        let formData = new FormData();
        formData.append("file", file);

        const location = "Delhi";  

        try {
            const response = await fetch(`http://127.0.0.1:8000/extract?location=${location}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            document.getElementById("n-value").textContent = data.N;
            document.getElementById("p-value").textContent = data.P;
            document.getElementById("k-value").textContent = data.K;
            document.getElementById("ph-value").textContent = data.pH;
            document.getElementById("temp-value").textContent = data.temperature + "°C";
            document.getElementById("humidity-value").textContent = data.humidity + "%";
            document.getElementById("rainfall-value").textContent = data.rainfall + " mm";

        } catch (error) {
            console.error("Error fetching NPK and weather data:", error);
        }
    }
}

async function sendToModel() {
    const n = parseFloat(document.getElementById("n-value").textContent);
    const p = parseFloat(document.getElementById("p-value").textContent);
    const k = parseFloat(document.getElementById("k-value").textContent);
    const ph = parseFloat(document.getElementById("ph-value").textContent);
    const temperature = parseFloat(document.getElementById("temp-value").textContent);
    const humidity = parseFloat(document.getElementById("humidity-value").textContent);
    const rainfall = parseFloat(document.getElementById("rainfall-value").textContent);

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ n, p, k, ph, temperature, humidity, rainfall })
    });

    const data = await response.json();
    document.getElementById("model-output").textContent = `Recommended Crop: ${data.crop}`;
}
