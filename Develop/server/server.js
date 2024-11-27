import 'dotenv/config'; // Load environment variables
import express from 'express'; // Import Express
import fileUpload from 'express-fileupload'; // Middleware for handling file uploads
import { v2 as cloudinary } from 'cloudinary'; // Cloudinary SDK

// Initialize Express app
const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Middleware: Enable file uploads
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: './temp',
        limits: { fileSize: 10 * 1024 * 1024 },
        debug: true,
    })
);

// Test route to ensure server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// API Route to Handle Image Upload
app.post('/upload', async (req, res) => {
    console.log('Files:', req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const fileKey = Object.keys(req.files)[0];
    const file = req.files[fileKey];

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'linkzen',
        });
        res.json({ imageUrl: result.secure_url });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Image upload failed' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
