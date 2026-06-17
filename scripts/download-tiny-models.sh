#!/bin/bash

cd public/models

# TinyFaceDetector
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/tiny_face_detector_model-weights_manifest.json
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/tiny_face_detector_model-shard1

# Face Landmark 68
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/face_landmark_68_model-weights_manifest.json
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/face_landmark_68_model-shard1

# Face Recognition
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/face_recognition_model-weights_manifest.json
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/face_recognition_model-shard1
wget -q https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/face_recognition_model-shard2

echo "✓ Models downloaded!"
ls -lh
