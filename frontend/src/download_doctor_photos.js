import fs from 'fs';
import path from 'path';
import https from 'https';

const targetDir = path.resolve('public/doctors');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const doctorImages = [
  { name: 'dr-raju-shrestha.png', url: 'https://www.uniquedentalcenter.com/doctor1.png' },
  { name: 'dr-aakash-karmacharya.png', url: 'https://www.uniquedentalcenter.com/doctor2.png' },
  { name: 'dr-sita-bhushal.png', url: 'https://www.uniquedentalcenter.com/doctor3.png' },
  { name: 'dr-nagendra-shrish.png', url: 'https://www.uniquedentalcenter.com/doctor4.png' },
  { name: 'dr-anjila-neupane.png', url: 'https://www.uniquedentalcenter.com/doctor5.png' },
  { name: 'rdh-bishnu-budhathoki.png', url: 'https://www.uniquedentalcenter.com/doctor6.png' },
];

function downloadFile(fileUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(fileUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${outputPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const doc of doctorImages) {
    const dest = path.join(targetDir, doc.name);
    try {
      await downloadFile(doc.url, dest);
    } catch (err) {
      console.error(`Failed downloading ${doc.url}:`, err.message);
    }
  }
}

run();
