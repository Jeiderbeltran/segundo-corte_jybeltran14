// Obtener referencias a los elementos
const emailField = document.getElementById('email');
const form = document.getElementById('email-form');
const modal = document.getElementById('modal');
const modalErrors = document.getElementById('modal-errors');
const closeModal = document.getElementById('close-modal');

// Función flecha para validar correos
const validateEmails = (emails) => {
    const validEmails = [];
    const invalidEmails = [];

    // Expresión regular para correos en formato estándar y nombre <correo@dominio.com>
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const complexEmailRegex = /^(.*) <([^<>]+)>$/; // Regex para detectar "Nombre <correo@dominio.com>"

    emails.forEach(email => {
        const cleanedEmail = email.trim();

        // Si el correo está en formato "Nombre <correo@dominio.com>"
        const match = cleanedEmail.match(complexEmailRegex);
        if (match) {
            const extractedEmail = match[2]; // Extraer el correo dentro de <>

            if (emailRegex.test(extractedEmail)) {
                validEmails.push(extractedEmail); // Guardar solo el correo extraído
            } else {
                invalidEmails.push(cleanedEmail); // Guardar el formato completo como inválido
            }
        } 
        // Si es un correo simple
        else if (emailRegex.test(cleanedEmail)) {
            validEmails.push(cleanedEmail);
        } else {
            invalidEmails.push(cleanedEmail);
        }
    });

    return { validEmails, invalidEmails };
};

// Función flecha para procesar la entrada de correos
const parseEmails = (input) => input.split(/[,;]+/).map(email => email.trim());

// Función flecha para mostrar la modal con errores
const showModal = (errors) => {
    modalErrors.innerHTML = errors.join('<br>'); // Mostrar los correos inválidos en la modal
    modal.style.display = 'block';
};

// Cerrar la modal
closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Cerrar la modal si se hace clic fuera de ella
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Manejador de envío del formulario (Arrow Function)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const emailInput = emailField.value;

    // Procesar los correos
    const emails = parseEmails(emailInput);
    const { validEmails, invalidEmails } = validateEmails(emails);

    // Actualizar el campo de entrada solo con los correos válidos
    emailField.value = validEmails.join('; ');

    // Mostrar correos inválidos en la modal
    if (invalidEmails.length > 0) {
        showModal(invalidEmails); // Mostrar los correos inválidos en la modal
    } else {
        alert('Formulario enviado con éxito.'); // Solo se muestra si todos los correos son válidos
        console.log('Correos válidos enviados: ', parseEmails(emailField.value));
    }
});
