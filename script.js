// script.js
let selectedImageURL = ''; // URL de la imagen seleccionada

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.getElementById('imageInput');
    const gallery = document.getElementById('gallery');
    const options = document.getElementById('imageOptions');

    gallery.innerHTML = ''; // Limpiar la galería

    if (input.files.length > 0) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Crear la imagen en la galería
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                selectedImageURL = e.target.result;

                // Al hacer clic en la imagen, mostrar opciones
                img.addEventListener('click', function() {
                    options.style.display = 'block';
                    // Configurar el enlace de descarga
                    document.getElementById('downloadImage').addEventListener('click', function() {
                        const link = document.createElement('a');
                        link.href = selectedImageURL;
                        link.download = file.name;
                        link.click();
                    });

                    // Copiar enlace para compartir
                    document.getElementById('shareImage').addEventListener('click', function() {
                        navigator.clipboard.writeText(window.location.href + '#' + file.name);
                        document.getElementById('shareMessage').style.display = 'block';
                    });

                    // Configurar para compartir en Twitter
                    document.getElementById('twitterShare').href = `https://twitter.com/intent/tweet?url=${window.location.href + '#' + file.name}&text=¡Mira esta imagen!`;

                    // Configurar para compartir en Facebook
                    document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href + '#' + file.name}`;

                    // Instagram no permite compartir desde web, pero puedes abrir la app.
                    document.getElementById('instagramShare').href = `https://www.instagram.com/`;
                });

                gallery.appendChild(img);
            }
            reader.readAsDataURL(file);
        });
    }
});
