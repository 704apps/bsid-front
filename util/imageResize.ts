export const resizeImage = (
    file: File,
    width: number,
    height: number,
    cropToCircle: boolean
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target) {
          return reject(new Error("FileReader event target is null"));
        }
  
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return reject(new Error("Canvas rendering context is null"));
          }
  
          // Desenhar imagem no canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          if (cropToCircle) {
            // Criar máscara circular
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
          }
  
          canvas.toBlob((blob) => {
            if (!blob) {
              return reject(new Error("Blob is null"));
            }
            resolve(new File([blob], file.name, { type: file.type }));
          }, file.type);
        };
        img.src = event.target.result as string;
      };
      reader.readAsDataURL(file);
    });
  };
  