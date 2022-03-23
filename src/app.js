/** @format */

const express = require('express');
const dotenv = require('dotenv');
const upload = require('./utils/multer');
const cloudinary = require('./utils/cloudinary');
const fs = require('fs');
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/upload-images', upload.array('image'), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'Images');

  if (req.method === 'POST') {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls,
    });
  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`,
    });
  }
});

module.exports = app;
