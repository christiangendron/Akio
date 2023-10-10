const fs = require('fs');
const https = require('https');
const path = require('path'); // Import the path module

module.exports.saveImages = async (originalImageUrl) => {
  const imageName = `image-${new Date().getTime()}.png`;
  const imagePath = path.join(__dirname, '../images', imageName);

  try {
    const imagesDir = path.join(__dirname, '../images');

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }

    await downloadImage(originalImageUrl, imagePath);
    return imageName;
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}

async function downloadImage(originalImageUrl, localPath) {
  const fileStream = fs.createWriteStream(localPath);

  return new Promise((resolve, reject) => {
    https
      .get(originalImageUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
          return;
        }

        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });

        response.on('error', (error) => {
          reject(error);
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
