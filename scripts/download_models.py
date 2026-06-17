#!/usr/bin/env python3
import urllib.request
import os

# Create models directory
os.makedirs('public/models', exist_ok=True)
os.chdir('public/models')

base_url = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/'

models = [
    'tiny_face_detector_model-weights_manifest.json',
    'tiny_face_detector_model-shard1',
    'face_landmark_68_model-weights_manifest.json',
    'face_landmark_68_model-shard1',
    'face_recognition_model-weights_manifest.json',
    'face_recognition_model-shard1',
    'face_recognition_model-shard2'
]

print("Downloading face detection models...\n")

for model in models:
    url = base_url + model
    print(f"Downloading {model}...")
    try:
        urllib.request.urlretrieve(url, model)
        size = os.path.getsize(model)
        print(f"✓ Downloaded {model} ({size/1024:.1f} KB)\n")
    except Exception as e:
        print(f"✗ Failed to download {model}: {e}\n")

print("✓ All downloads complete!")
os.system('ls -lh')
