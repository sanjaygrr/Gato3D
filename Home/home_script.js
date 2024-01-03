document.addEventListener('DOMContentLoaded', () => {
    // Controladores para los botones
    document.getElementById('normalMode').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirecciona al modo normal del juego
    });

    document.getElementById('fiestaMode').addEventListener('click', () => {
        // Redirecciona al modo fiesta
        window.location.href = 'fiestaMode.html';
    });

    document.getElementById('settings').addEventListener('click', () => {
        // Redirecciona a las configuraciones
        window.location.href = 'settings.html';
    });

    document.getElementById('exit').addEventListener('click', () => {
        window.close(); // Intenta cerrar la ventana del navegador
    });

    // Función para agregar gatos voladores
    const addFlyingCat = (x, y) => {
        const catImage = document.createElement('img');
        catImage.src = 'descarga.jpeg'; // Ruta a la imagen del gato
        catImage.style.position = 'absolute';
        catImage.style.left = `${x}px`;
        catImage.style.top = `${y}px`;
        catImage.style.width = '50px'; // Tamaño del gato
        document.body.appendChild(catImage);

        // Animación del gato volador
        setTimeout(() => {
            catImage.remove();
        }, 3000); // El gato desaparece después de 3 segundos
    };

    // Evento de movimiento del mouse para crear gatos voladores
    document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        if (Math.random() > 0.9) { // Ajusta la probabilidad de que aparezca un gato
            addFlyingCat(x, y);
        }
    });
});
