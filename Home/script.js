// Importar Three.js y OrbitControls desde un CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos básicos de Three.js: escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('gameContainer').appendChild(renderer.domElement);

    // Control de cámara
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Posicionamiento de la cámara
    camera.position.z = 5;

    // Crear cubos
    const cubeSize = 0.5;
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Material gris
    const cubes = [];
    for (let i = 0; i < 27; i++) {
        if (i === 13) continue; // Saltar el cubo central en el modo estándar

        const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = (i % 3) - 1; // Posiciones: -1, 0, 1 en el eje x
        cube.position.y = -Math.floor(i / 9) + 1; // Posiciones: 1, 0, -1 en el eje y
        cube.position.z = (Math.floor(i / 3) % 3) - 1; // Posiciones: -1, 0, 1 en el eje z

        cubes.push(cube);
        scene.add(cube);
    }

    // Lógica para añadir marcas y comprobar ganadores
    const marks = ['X', 'O', 'Z'];
    let currentPlayer = 0;

    const colors = {
        X: 0xff0000, // Rojo para 'X'
        O: 0x00ff00, // Verde para 'O'
        Z: 0x0000ff  // Azul para 'Z'
    };
    
    function addMark(cube, mark) {
        // Cambiar el color del cubo según la marca
        if (mark in colors) {
            cube.material.color.setHex(colors[mark]);
        } else {
            console.error("Marca no reconocida:", mark);
        }
    }

    function checkWinner() {
        const winningCombinations = [
            // Combinaciones horizontales en cada capa
            [0, 1, 2], [3, 4, 5], [6, 7, 8],    // Capa superior
            [9, 10, 11], [12, 13, 14], [15, 16, 17], // Capa media (sin contar el cubo central)
            [18, 19, 20], [21, 22, 23], [24, 25, 26], // Capa inferior
        
            // Combinaciones verticales en cada capa
            [0, 9, 18], [1, 10, 19], [2, 11, 20], // Columna frontal
            [3, 12, 21], [4, 13, 22], [5, 14, 23], // Columna media (sin contar el cubo central)
            [6, 15, 24], [7, 16, 25], [8, 17, 26], // Columna trasera
        
            // Combinaciones en profundidad en cada fila
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Fila superior
            [9, 12, 15], [10, 13, 16], [11, 14, 17], // Fila media (sin contar el cubo central)
            [18, 21, 24], [19, 22, 25], [20, 23, 26], // Fila inferior
        
            // Diagonales en cada capa
            [0, 4, 8], [2, 4, 6], // Capa superior
            [9, 13, 17], [11, 13, 15], // Capa media (sin contar el cubo central)
            [18, 22, 26], [20, 22, 24], // Capa inferior
        
            // Diagonales a través de capas
            [0, 12, 24], [6, 12, 18], // Diagonales largas
            [2, 12, 22], [8, 12, 20],
        
            // Diagonales que atraviesan las capas y las filas/columnas
            [0, 13, 26], [6, 13, 20], [8, 13, 18], [2, 13, 24]
        ];
    
        // Revisar cada combinación para ver si todos los cubos en esa línea son del mismo jugador
        for (let combination of winningCombinations) {
            if (combination.every(index => cubes[index].material.color.equals(colors[currentPlayer]))) {
                // Si todos los cubos en una combinación son del mismo color, hay un ganador
                return true;
            }
        }
    
        return false;
    }

    // Evento de clic para añadir marcas
    document.addEventListener('click', (event) => {
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
    
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(cubes);
        if (intersects.length > 0) {
            const cubeIndex = cubes.indexOf(intersects[0].object);
            // Llamar a addMark y luego a checkWinner
        }
    });

    // Función de animación
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
