(function(){
    //Establecemos las variables donde guardaremos las valores ingresados en el input
    let loginForm = document.getElementById('login-form'),
        email = loginForm.email,
        password = loginForm.password;
        
        // creamos un listener para el formulario
        loginForm.addEventListener('submit', function (event) {
            // Detenemos el envio del formulario para poder manejar el evento de forma manual
            event.preventDefault();
            
            //Validamos que ambos campos esten llenados, si no lo estan mostraremos un div con las clases de  bootstrap para mostrar un mensaje de alerta
            if (!email.value || !password.value) {
            let container = document.getElementById('login-form');
            let warning = document.createElement('div');
            warning.className = 'alert alert-warning';
            warning.setAttribute('role', 'alert');
            warning.textContent = 'Por favor, llena correctamente tu correo y contraseña.';
            container.appendChild(warning);
            return;
            };

            //Creamos un usarios de prueba para poder validar un inicio de sesion
            const userTest = {
            email: "user@gmail.com",
            password: "contraseña123",
            };
            
            // comparamos las credenciales del input con el usurio de prueba, dependiendo de la situación mandaremos un div de error o de exito y redirigiremos a la pagina del dashboard
            if(email.value === userTest.email && password.value === userTest.password){
            let container = document.getElementById('login-form');
            let succes = document.createElement('div');
            succes.className = 'alert alert-success';
            succes.setAttribute('role', 'alert');
            succes.textContent = '¡Usuario y contraseña correctos!';
            container.appendChild(succes);
            
            localStorage.setItem('user', JSON.stringify(userTest));
            setTimeout(function () {
                window.location.href = "dashBoard.html"; 
            }, 300);
        } else {
            let container = document.getElementById('login-form');
            let error = document.createElement('div');
            error.className = 'alert alert-danger';
            error.setAttribute('role', 'alert');
            error.textContent = '¡Usuario o contraseña incorrectos!';
            container.appendChild(error);
        };

        
    })
}())