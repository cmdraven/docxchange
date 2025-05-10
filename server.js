const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const path = require('path');

cloudinary.config({
  cloud_name: 'dqj5x8hqy',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT || 3000;

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(express.static(path.join(__dirname, 'public')));


app.post('/file', async (req, res) => {
  try {
    const file = req.files.file;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Error uploading file');
  }
});

app.get('/file/:publicId', async (req, res) => {
  try {
    const publicId = req.params.publicId;
    // In a real application, you might want to fetch details from your own database
    // and then construct the Cloudinary URL. For simplicity here, we'll just
    // assume the publicId is sufficient to generate the URL.
    const url = cloudinary.url(publicId, { secure: true });
    res.json({ url });
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(500).send('Error retrieving file');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});