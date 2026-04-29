document.addEventListener('DOMContentLoaded', () => {
    // --- Menú Mobile ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Cambiar icono
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // --- Carrusel Automático ---
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const slideCount = slides.length;
    const intervalTime = 5000; // 5 segundos

    if (carousel && slideCount > 0) {
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        };

        const updateCarousel = () => {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        // Iniciar intervalo
        let slideInterval = setInterval(nextSlide, intervalTime);

        // Pausar al pasar el mouse
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, intervalTime));
    }

    // --- Validación y Sanitización de Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const inputTelefono = document.getElementById('telefono');

    // Restringir entrada de teléfono a solo números en tiempo real
    if (inputTelefono) {
        inputTelefono.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    // Función para sanitizar entradas (evitar XSS)
    const sanitizeHTML = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const successMsg = document.getElementById('success-msg');
            
            // Obtener y sanitizar valores
            const nombreRaw = document.getElementById('nombre').value.trim();
            const telefonoRaw = document.getElementById('telefono').value.trim();
            const emailRaw = document.getElementById('email').value.trim();
            const mensajeRaw = document.getElementById('mensaje').value.trim();

            const nombre = sanitizeHTML(nombreRaw);
            const telefono = sanitizeHTML(telefonoRaw);
            const email = sanitizeHTML(emailRaw);
            const mensaje = sanitizeHTML(mensajeRaw);

            // Resetear mensajes de error
            document.querySelectorAll('.error-msg').forEach(msg => {
                msg.style.display = 'none';
                msg.textContent = '';
            });
            successMsg.style.display = 'none';

            // Validar que todos los campos estén llenos (Obligatorios)
            if (!nombre) {
                showError('error-nombre', 'Este campo es obligatorio.');
                isValid = false;
            }
            if (!telefono) {
                showError('error-telefono', 'Este campo es obligatorio.');
                isValid = false;
            }
            if (!email) {
                showError('error-email', 'Este campo es obligatorio.');
                isValid = false;
            }
            if (!mensaje) {
                showError('error-mensaje', 'Este campo es obligatorio.');
                isValid = false;
            }

            // Validar Nombre (Mínimo 5 caracteres, solo letras y espacios)
            const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (nombre && nombre.length < 5) {
                showError('error-nombre', 'El nombre debe tener al menos 5 caracteres.');
                isValid = false;
            } else if (nombre && !nombreRegex.test(nombre)) {
                showError('error-nombre', 'El nombre solo debe contener letras.');
                isValid = false;
            }

            // Validar Teléfono (Solo números, longitud 8-15)
            const telRegex = /^[0-9]+$/;
            if (telefono && (!telRegex.test(telefono) || telefono.length < 8 || telefono.length > 15)) {
                showError('error-telefono', 'Ingrese un teléfono válido (8-15 dígitos).');
                isValid = false;
            }

            // Validar Email (Formato estándar)
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email && !emailRegex.test(email)) {
                showError('error-email', 'Ingrese un correo electrónico válido.');
                isValid = false;
            }

            // Validar Mensaje (Mínimo 10 caracteres)
            if (mensaje && mensaje.length < 10) {
                showError('error-mensaje', 'El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
            }

            if (isValid) {
                // En un entorno real, aquí se enviarían los datos sanitizados al servidor
                console.log('Datos enviados (sanitizados):', { nombre, telefono, email, mensaje });

                // Simular envío exitoso
                successMsg.textContent = '¡Gracias, ' + nombre + '! Tu mensaje ha sido enviado con éxito.';
                successMsg.style.display = 'block';
                contactForm.reset();
                
                // Hacer scroll al mensaje de éxito
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});
