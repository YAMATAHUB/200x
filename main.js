const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const downloadButton = document.getElementById('downloadButton');
const ctx = canvas.getContext('2d');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Rasmni o'lchamini 200x200 px ga o'zgartirish
        canvas.width = 200;
        canvas.height = 200;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 200, 200);

        // Preview diviga rasmni ko'rsatish
        const dataURL = canvas.toDataURL('image/png');
        preview.style.backgroundImage = `url(${dataURL})`;
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundPosition = 'center';

        // Yuklab olish tugmasini faollashtirish
        downloadButton.href = dataURL;
        downloadButton.classList.remove('hidden');
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});
