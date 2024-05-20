const path = require('path');
const fs = require('fs');

exports.ImageUploader = (pathOfFile, file) => {
  // create a file name in you want save
  let name = Date.now() + `${file.name}`;
  // create path where you want to store it
  let directory = path.join(__dirname, '../../public') + pathOfFile + name;

  // Place the image on your local server
  let dbdirectory = file.mv(directory, (error) => {
    if (error) {
      return false;
    }
  });

  let storedUrl = pathOfFile + name;
  return storedUrl;
};

exports.ImageDeleter = (pathOfFile) => {
  const mainPath = path.join(__dirname, '../../public') + pathOfFile;
  fs.unlink(mainPath, (err) => {
    if (err) {
      console.log(err);
      return false;
    }
  });
  return true;
};
