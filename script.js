// script.js
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.getElementById('imageInput');
    const gallery = document.getElementById('gallery');

    if (input.files.length > 0) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Crear la imagen en la galería
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;

                // Al hacer clic en la imagen, redirigir a la página de vista de imagen
                img.addEventListener('click', function() {
                    localStorage.setItem('selectedImage', e.target.result);
                    window.location.href = 'view.html';
                });

                gallery.appendChild(img);
            }
            reader.readAsDataURL(file);
        });
    }
});
