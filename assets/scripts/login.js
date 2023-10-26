(() => {//creamos una función autoinvocada
    'use strict'

    //Mandamos a traer nuestro formulario para poder manipular los campos agregandoles estilos de validación predefinidos con bootstrap
    const forms = document.querySelectorAll('.needs-validation')
    //creamos un usuario de prueba para comparar sus valores con los agregados por el usuario y así poder otorgar un inicio de sesión
    const userTest = {
        email: "user@gmail.com",
        password: "contraseña123",
    };

    //Bootstrap nos proporciona esta funcion para validar el formulario y detener la acción por default de envio y la propagación en caso de que la validez no se cumpla
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                event.stopPropagation();
                
            } else {//si se cumple la validez rescatamos los datos dados por el usuario en sus respectivas variables
                let email = document.getElementById('input-email').value;
                let password = document.getElementById('input-password').value;
                //procedemos a hacer una compracion con el usuario de prueba y si hacen match almacnamos los datos en localStorage ademas de un redireccionamiento con un timer de 300 milisegundos para dar feedback rápido de que el inicio de sesión fue exitoso
                if (email === userTest.email && password === userTest.password) {
                    localStorage.setItem('user', JSON.stringify(userTest));
                    setTimeout(function () {
                        window.location.href = "/pages/dashBoard.html";
                    }, 300);
                }
            }

            form.classList.add('was-validated');
        }, false)
    })
})()