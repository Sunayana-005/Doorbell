const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_DIR = path.join(__dirname, '..', 'public', 'models');

// Ensure models directory exists
if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });
}

const models = [
  {
    name: 'ssd_mobilenetv1_model-weights_manifest.json',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-weights_manifest.json'
  },
  {
    name: 'ssd_mobilenetv1_model-shard1',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard1'
  },
  {
    name: 'face_landmark_68_model-weights_manifest.json',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json'
  },
  {
    name: 'face_landmark_68_model-shard1',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1'
  },
  {
    name: 'face_recognition_model-weights_manifest.json',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json'
  },
  {
    name: 'face_recognition_model-shard1',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard1'
  },
  {
    name: 'face_recognition_model-shard2',
    url: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard2'
  }
];

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

async function downloadModels() {
  console.log('Downloading face detection models...\n');
  
  for (const model of models) {
    const destination = path.join(MODEL_DIR, model.name);
    
    if (fs.existsSync(destination)) {
      console.log(`✓ ${model.name} already exists`);
      continue;
    }
    
    try {
      console.log(`Downloading ${model.name}...`);
      await downloadFile(model.url, destination);
      console.log(`✓ ${model.name} downloaded\n`);
    } catch (error) {
      console.error(`✗ Failed to download ${model.name}:`, error.message);
    }
  }
  
  console.log('\n✓ All models downloaded!');
}

downloadModels().catch(console.error);
