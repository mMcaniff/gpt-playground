export const resizeImage = (
  file: File,
  height: number,
  width: number
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    image.onload = function () {
      canvas.height = height;
      canvas.width = width;
      if (ctx) {
        ctx.drawImage(image, 0, 0, width, height);
      } else {
        console.error("Could not get 2D context for canvas.");
      }
      canvas.toBlob(function (blob) {
        if (blob instanceof Blob) {
          const resizedImageUrl = URL.createObjectURL(blob);
          resolve(resizedImageUrl);
        }
        console.error("Received null when expected type: Blob");
      }, "image/jpeg");
    };

    image.src = URL.createObjectURL(file);
  });
};
