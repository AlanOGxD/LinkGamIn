const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const postButton = document.getElementById('post-button');
const postText = document.getElementById('post-text');
const imageInput = document.getElementById('image-input');
const imageButton = document.getElementById('image-button');
const imagePreview = document.getElementById('imagePreview');
const containerButtonsModal = document.querySelector('.containerButtonsModal');

// Selecciona todos los elementos con la clase "open-modal"
const openModalButtons = document.querySelectorAll('.open-modal');
const overlay = document.querySelector('.overlay');


window.addEventListener('load', function() {
    // Limpia el contenido del modal
    postText.value = '';
    imageInput.value = '';
    imagePreview.src = '';

    // Luego, cierra el modal
    modal.style.display = 'none';
    overlay.style.display = 'none'; // Oculta el overlay

    // Restablecer el desplazamiento de la página
    document.body.style.overflow = 'auto';

    mostrarPublicaciones();
});


// Itera a través de cada botón con la clase "open-modal"
openModalButtons.forEach((button) => {
    // Agrega un evento de clic a cada botón
    button.addEventListener('click', () => {
        // Muestra la superposición y el modal
        overlay.style.display = 'block'; // Muestra la superposición
        modal.style.display = 'block'; // Muestra el modal

        // Deshabilita el desplazamiento de la página
        document.body.style.overflow = 'hidden';
    });
});

// Agregamos un evento de escucha para el clic en la imagen.
imageButton.addEventListener('click', function () {
    // Cuando se hace clic en la imagen, activamos el input de archivo haciendo clic en él.
    imageInput.click();
});

// Agregamos un evento de escucha para el cambio en el input de archivo.
imageInput.addEventListener('change', function () {
    // Cuando se cambia la imagen en el input de archivo
    const selectedImage = imageInput.files[0];

    if (selectedImage) {
        // Utiliza FileReader para leer la imagen como datos Base64
        const reader = new FileReader();
        reader.onload = function (event) {
            // Cuando se complete la lectura de la imagen
            const imageBase64 = event.target.result;

            // Actualiza la fuente de la imagen de previsualización
            imagePreview.src = imageBase64;
            containerButtonsModal.classList.add('with-image');
        };

        // Lee la imagen como datos Base64
        reader.readAsDataURL(selectedImage);
    } else {
        // Si no se selecciona una imagen, muestra una imagen predeterminada o borra la previsualización
        imagePreview.src = '';
        containerButtonsModal.classList.remove('with-image');
    }
});


// Manejar la publicación de contenido
postButton.addEventListener('click', () => {
    // Obtén la imagen seleccionada por el usuario
    const selectedImage = imageInput.files[0];
    
    // Comprueba si se seleccionó una imagen
    if (selectedImage) {
        // Utiliza FileReader para leer la imagen como datos Base64
        const reader = new FileReader();
        reader.onload = function (event) {
            // Cuando se complete la lectura de la imagen
            const imageBase64 = event.target.result;

            // Crear un objeto de publicación que incluya el texto, la fecha y la imagen
            const publicacion = {
                contenido: postText.value,
                fecha: new Date().toLocaleDateString(
                    'es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }
                ),
                imagen: imageBase64 // Aquí guardamos la imagen como datos Base64
            };
            
            // Generar una clave única para la publicación (puedes usar un contador, por ejemplo)
            const claveUnica = 'publicacion' + Date.now(); // Usando una marca de tiempo como clave única

            // Convertir la publicación a una cadena JSON
            const publicacionJSON = JSON.stringify(publicacion);

            // Guardar la publicación en el localStorage con la clave única
            localStorage.setItem(claveUnica, publicacionJSON);

            // Limpia el contenido del modal
            postText.value = '';
            imageInput.value = '';
            imagePreview.src = '';

            // Luego, cierra el modal
            modal.style.display = 'none';
            overlay.style.display = 'none'; // Oculta el overlay

            // Restablecer el desplazamiento de la página
            document.body.style.overflow = 'auto';
        };
        // Lee la imagen como datos Base64
        reader.readAsDataURL(selectedImage);
    } else {
        // Si no se seleccionó una imagen, crea un objeto de publicación sin imagen
        const publicacion = {
            contenido: postText.value,
            fecha: new Date().toLocaleDateString(
                'es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }
            )
        };

        // Generar una clave única para la publicación (puedes usar un contador, por ejemplo)
        const claveUnica = 'publicacion' + Date.now(); // Usando una marca de tiempo como clave única

        // Convertir la publicación a una cadena JSON
        const publicacionJSON = JSON.stringify(publicacion);

        // Guardar la publicación en el localStorage con la clave única
        localStorage.setItem(claveUnica, publicacionJSON);

        // Limpia el contenido del modal
        postText.value = '';
        imageInput.value = '';
        imagePreview.src = '';

        // Luego, cierra el modal
        modal.style.display = 'none';   // Oculta el modal
        overlay.style.display = 'none'; // Oculta el overlay

        // Restablecer el desplazamiento de la página
        document.body.style.overflow = 'auto';
    }

    // Recarga la página
    location.reload();
});

// Ocultar la superposición y el modal al hacer clic en el botón de cerrar
closeModal.addEventListener('click', () => {
    // Limpia el contenido del modal
    postText.value = '';
    imageInput.value = '';
    imagePreview.src = '';

    // Luego, cierra el modal
    modal.style.display = 'none';   // Oculta el modal
    overlay.style.display = 'none'; // Oculta el overlay
    // modal.removeAttribute('style'); // Elimina todos los atributos de estilo del modal (opcional)

    // Restablecer el desplazamiento de la página
    document.body.style.overflow = 'auto';
});


// Mostrar publicaciones
function mostrarPublicaciones() {
    // Obtén todas las claves del localStorage
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Comprobar si la clave comienza con 'publicacion'
        if (key.startsWith('publicacion')) {
            keys.push(key);
        }
    }

    // Ordena las claves alfabéticamente (esto es por la clave)
    keys.sort();
    // Invierte el orden del array de claves
    keys.reverse();

    // Recorre las claves ordenadas y muestra las publicaciones
    for (const key of keys) {
        const publicacion = JSON.parse(localStorage.getItem(key));

        // Crea elementos HTML dinámicamente y muestra las publicaciones
        const containerPubli = document.createElement('div');
        containerPubli.className = 'containerPubli';
            const contPersonalInfoPubli = document.createElement('div');
            contPersonalInfoPubli.className = 'contPersonalInfoPubli';
                const imgPerfilPubli = document.createElement('img');
                imgPerfilPubli.className = 'imgPerfilPubli';
                imgPerfilPubli.src = '../assets/images/perfil.jpg';
                const nicknamePrestige = document.createElement('div');
                nicknamePrestige.className = 'nicknamePrestige';
                    const nicknamePubli = document.createElement('span');
                    nicknamePubli.className = 'nicknamePubli';
                    nicknamePubli.textContent = 'Kalahazy';
                    const prestigePubli = document.createElement('p');
                    prestigePubli.className = 'prestigePubli';
                    prestigePubli.textContent = 'Warzone ProPlayer';
                const deletePubli = document.createElement('img');
                deletePubli.className = 'deletePubli';
                deletePubli.src = '../assets/images/delete.png';
                deletePubli.addEventListener('click', function () {
                    localStorage.removeItem(key);
                    location.reload();
                });
            const contTextPubli = document.createElement('div');
            contTextPubli.className = 'contTextPubli';
                const textPubli = document.createElement('h3');
                textPubli.className = 'textPubli';
                textPubli.textContent = publicacion.contenido;
            const contImgPubli = document.createElement('div');
            contImgPubli.className = 'contImgPubli';
                const imgPubli = document.createElement('img');
                imgPubli.className = 'imgPubli';
                imgPubli.src = publicacion.imagen;
            const datePubli = document.createElement('p');
            datePubli.className = 'datePubli';
            datePubli.textContent = publicacion.fecha.split(', ')[0] + ' a las ' + publicacion.fecha.split(', ')[1];
            const contReactions = document.createElement('div');
            contReactions.className = 'contReactions';
                const like = document.createElement('img');
                like.className = 'like';
                like.src = '../assets/images/like.png';
                const comment = document.createElement('img');
                comment.className = 'comment';
                comment.src = '../assets/images/comment.png';
                const share = document.createElement('img');
                share.className = 'share';
                share.src = '../assets/images/share.svg';
        
                // Agrega los elementos de nicknamePrestige
                nicknamePrestige.appendChild(nicknamePubli);
                nicknamePrestige.appendChild(prestigePubli);
            // Agrega los elementos de contPersonalInfoPubli
            contPersonalInfoPubli.appendChild(imgPerfilPubli);
            contPersonalInfoPubli.appendChild(nicknamePrestige);
            contPersonalInfoPubli.appendChild(deletePubli);
            // Agrega los elementos de contTextPubli
            contTextPubli.appendChild(textPubli);
            // Agrega los elementos de contImgPubli
            contImgPubli.appendChild(imgPubli);
                // Agrega los elementos de contReactions
                contReactions.appendChild(like);
                contReactions.appendChild(comment);
                contReactions.appendChild(share);
        // Agrega los elementos de containerPubli
        containerPubli.appendChild(contPersonalInfoPubli);
        containerPubli.appendChild(contTextPubli);
        if (publicacion.imagen) {
            containerPubli.appendChild(contImgPubli);
        }
        containerPubli.appendChild(datePubli);
        containerPubli.appendChild(contReactions);        

        // Agrega el contenedor de la publicación a tu página
        const publicationsContainer = document.querySelector('.publications');
        publicationsContainer.appendChild(containerPubli);
    }
}