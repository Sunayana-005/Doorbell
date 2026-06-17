// Client-side image cropping to focus on face area
export async function cropToFace(imageDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(imageDataUrl);
        return;
      }

      // Set canvas to square
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      // Calculate crop position to focus on upper-center (where faces usually are)
      const sourceX = (img.width - size) / 2;
      const sourceY = Math.max(0, (img.height - size) / 3); // Offset upward for face
      
      // Draw cropped and centered image
      ctx.drawImage(
        img,
        sourceX, sourceY, size, size,  // Source
        0, 0, size, size                // Destination
      );

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    
    img.onerror = () => {
      resolve(imageDataUrl);
    };
    
    img.src = imageDataUrl;
  });
}
