require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads
const cloudinary = require('cloudinary').v2; // Cloudinary SDK

// Initialize Express app
const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Middleware: Enable file uploads
// Enable file uploads (before any routes)
app.use(fileUpload({
    useTempFiles: true,          // Enable temporary file usage
    tempFileDir: './temp',       // Set the temp directory to your new folder
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
    debug: true,                 // Enable debugging for more detailed logs
}));

// Middleware: Debugging incoming requests (optional)
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

// Test route to ensure server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// API Route to Handle Image Upload
app.post('/upload', async (req, res) => {
    try {
        // Check if files are uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Dynamically handle any key
        const fileKey = Object.keys(req.files)[0];
        const file = req.files[fileKey];

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: 'Unsupported file type.' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'linkzen',
        });

        // Respond with the Cloudinary URL
        res.json({ imageUrl: result.secure_url });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Image upload failed.' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
