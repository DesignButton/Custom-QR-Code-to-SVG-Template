const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-qr', async (req, res) => {
    const { url } = req.body;
    const qrCodeApiUrl = 'https://api.qrcode-monkey.com/qr/custom';
    const qrCodeData = {
        data: url,
        config: {
            body: "square",
            eye: "frame13",
            eyeBall: "ball15",
            bgColor: "#FFFFFF",
            bodyColor: "#000000",
            eye1Color: "#000000",
            eye2Color: "#000000",
            eye3Color: "#000000"
        },
        size: 1000,
        download: false,
        file: "svg"
    };

    try {
        const response = await axios.post(qrCodeApiUrl, qrCodeData, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
