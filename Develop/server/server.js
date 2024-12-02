import dotenv from 'dotenv'; // Load environment variables
import path from 'path';
import { fileURLToPath } from 'url'; // For ES module compatibility
import express from 'express'; // Import Express
import fileUpload from 'express-fileupload'; // Middleware for handling file uploads
import { v2 as cloudinary } from 'cloudinary'; // Cloudinary SDK
import fs from 'fs'; // File system for debugging

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv and explicitly set .env file location
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Debugging: Check if .env file exists and log its path
console.log('Current Directory (__dirname):', __dirname);
console.log('Environment File Exists:', fs.existsSync(path.join(__dirname, '.env')));
console.log('Environment Variables Before Config:', {
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
});

// Initialize Express app
const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Debugging: Log Cloudinary configuration
console.log('Cloudinary Config:', {
    cloudName: process.env.CLOUD_NAME || 'undefined',
    apiKey: process.env.API_KEY || 'undefined',
    apiSecret: process.env.API_SECRET || 'undefined',
});

// Middleware: Enable file uploads
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: './temp',
        limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10 MB
        debug: true,
    })
);

// Test route to ensure the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// API Route to Handle Image Upload
app.post('/upload', async (req, res) => {
    console.log('Files:', req.files);

    // Check if a file is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    // Get the uploaded file
    const fileKey = Object.keys(req.files)[0];
    const file = req.files[fileKey];

    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'linkzen',
        });
        console.log('Upload successful:', result);
        res.json({ imageUrl: result.secure_url });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Image upload failed' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));