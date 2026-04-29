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

    // --- Validación de Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const successMsg = document.getElementById('success-msg');
            
            // Campos
            const nombre = document.getElementById('nombre');
            const telefono = document.getElementById('telefono');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');

            // Resetear mensajes de error
            document.querySelectorAll('.error-msg').forEach(msg => msg.style.display = 'none');
            successMsg.style.display = 'none';

            // Validar Nombre (Mínimo 5 caracteres)
            if (nombre.value.trim().length < 5) {
                showError('error-nombre', 'El nombre debe tener al menos 5 caracteres.');
                isValid = false;
            }

            // Validar Teléfono (Solo números, longitud 8-15)
            const telRegex = /^[0-9]+$/;
            if (!telRegex.test(telefono.value.trim()) || telefono.value.trim().length < 8 || telefono.value.trim().length > 15) {
                showError('error-telefono', 'Ingrese un teléfono válido (solo números, 8-15 dígitos).');
                isValid = false;
            }

            // Validar Email (Formato correcto)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError('error-email', 'Ingrese un correo electrónico válido.');
                isValid = false;
            }

            // Validar Mensaje (Mínimo 10 caracteres)
            if (mensaje.value.trim().length < 10) {
                showError('error-mensaje', 'El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
            }

            if (isValid) {
                // Simular envío exitoso
                successMsg.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito.';
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
