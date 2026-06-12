// Variables globales
let selectedMood = '';
let currentUser = {
    name: '',
    email: '',
    favoriteGenre: ''
};

// Artistas destacados
const featuredArtists = [
    { 
        name: 'Bad Bunny', 
        genre: 'Reggaeton / Trap', 
        image: 'images/badbunny.jpg' 
    },
    { 
        name: 'Ralphie Choo', 
        genre: 'R&B / Alternativo', 
        image: 'images/ralphie.jpg' 
    },
    { 
        name: 'Charli XCX', 
        genre: 'Pop / Electrónica', 
        image: 'images/charli.jpg' 
    },
    { 
        name: 'Frank Ocean', 
        genre: 'R&B / Alternative', 
        image: 'images/frank.jpg' 
    },
    { 
        name: 'Billie Eilish', 
        genre: 'Pop / Alternative', 
        image: 'images/billie.jpg' 
    },
    { 
        name: 'Kendrick Lamar', 
        genre: 'Hip-Hop / Rap', 
        image: 'images/kendrick.jpg' 
    }
];

// Base de datos de canciones por estado de ánimo
const songDatabase = {
    energetic: [
        { title: "Seven (feat. Latto)", artist: "Jung Kook", duration: "3:04" },
        { title: "Cupid - Twin Ver", artist: "FIFTY FIFTY", duration: "2:55" },
        { title: "MONTERO (Call Me By Your Name)", artist: "Lil Nas X", duration: "2:17" },
        { title: "Boys a liar Pt. 2", artist: "PinkPantheress, Ice Spice", duration: "2:11" },
        { title: "Unholy", artist: "Sam Smith, Kim Petras", duration: "2:36" }
    ],
    relaxed: [
        { title: "What Was I Made For?", artist: "Billie Eilish", duration: "3:42" },
        { title: "Calm Down", artist: "Rema, Selena Gomez", duration: "3:59" },
        { title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", duration: "3:25" },
        { title: "Texas Hold 'Em", artist: "Beyoncé", duration: "3:55" },
        { title: "Snowman", artist: "Sia", duration: "2:46" }
    ],
    happy: [
        { title: "Flowers", artist: "Miley Cyrus", duration: "3:20" },
        { title: "Dance The Night", artist: "Dua Lipa", duration: "2:56" },
        { title: "Cruel Summer", artist: "Taylor Swift", duration: "2:58" },
        { title: "Pink Venom", artist: "BLACKPINK", duration: "3:07" },
        { title: "As It Was", artist: "Harry Styles", duration: "2:47" }
    ],
    sad: [
        { title: "Glimpse of Us", artist: "Joji", duration: "3:53" },
        { title: "Snooze", artist: "SZA", duration: "3:21" },
        { title: "Kill Bill", artist: "SZA", duration: "2:33" },
        { title: "Anti-Hero", artist: "Taylor Swift", duration: "3:20" },
        { title: "Starboy", artist: "The Weeknd, Daft Punk", duration: "3:50" }
    ],
    focus: [
        { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
        { title: "I'm Good (Blue)", artist: "David Guetta, Bebe Rexha", duration: "2:55" },
        { title: "Tití Me Preguntó", artist: "Bad Bunny", duration: "4:03" },
        { title: "Lift Me Up", artist: "Rihanna", duration: "3:16" },
        { title: "Unstoppable", artist: "Sia", duration: "3:37" }
    ]
};

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar artistas dinámicamente
    loadFeaturedArtists();
    
    // Configurar eventos para botones de estado de ánimo
    setupMoodButtons();
    
    // Configurar evento para botón de generación de playlist
    setupGenerateButton();
    
    // Configurar validación del formulario de contacto
    setupContactForm();
});

// Función para cargar los artistas destacados
function loadFeaturedArtists() {
    const artistSlider = document.getElementById('artistSlider');
    
    // Usar bucle for para iterar a través de los artistas (estructura de control iterativa)
    for (let i = 0; i < featuredArtists.length; i++) {
        const artist = featuredArtists[i];
        
        // Crear elemento de artista
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        
        // Manipulación de strings
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}" class="artist-img">
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-genre">${artist.genre}</p>
        `;
        
        // Añadir tarjeta al slider
        artistSlider.appendChild(artistCard);
    }
}

// Función para configurar los botones de estado de ánimo
function setupMoodButtons() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    // Usando forEach para iterar a través de los botones 
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Usando forEach para eliminar la clase active de todos los botones
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Guardar el estado de ánimo seleccionado
            selectedMood = this.getAttribute('data-mood');
        });
    });
}

// Función para configurar el botón de generación de playlist
function setupGenerateButton() {
    const generateBtn = document.getElementById('generateBtn');
    
    generateBtn.addEventListener('click', function() {
        // Validar que se haya seleccionado un estado de ánimo con estructura condicional
        if (!selectedMood) {
            alert('Por favor, selecciona un estado de ánimo primero.');
            return;
        }
        
        // Generar playlist basada en el estado de ánimo
        generatePlaylist(selectedMood);
    });
}

// Función para generar la playlist
function generatePlaylist(mood) {
    const playlistResult = document.getElementById('playlistResult');
    const songList = document.getElementById('songList');
    
    // Limpiar la lista actual
    songList.innerHTML = '';
    
    // Obtener canciones basadas en el estado de ánimo
    const songs = songDatabase[mood];
    
    // Verificar si hay canciones disponibles (estructura condicional)
    if (!songs || songs.length === 0) {
        playlistResult.innerHTML = `<p>Lo sentimos, no hay canciones disponibles para el estado de ánimo "${mood}".</p>`;
        playlistResult.classList.add('show');
        return;
    }
    
    // Utilizar un bucle for para crear elementos de lista para cada canción 
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const li = document.createElement('li');
        li.className = 'song-item';
        
        // Manipulación de strings
        li.innerHTML = `
            <div class="song-info">
                <div class="song-number">${i + 1}</div>
                <div>
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        songList.appendChild(li);
    }
    
    // Mostrar el resultado
    playlistResult.classList.add('show');
}

// Función para configurar la validación del formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const genreInput = document.getElementById('genre');
    const successMessage = document.getElementById('successMessage');
    
    // Agregar evento de envío al formulario
    contactForm.addEventListener('submit', function(event) {
        // Prevenir envío del formulario por defecto
        event.preventDefault();
        
        // Resetear mensajes de error
        hideAllErrors();
        
        // Flag para validación
        let isValid = true;
        
        // Validar nombre (estructura condicional)
        if (!validateName(nameInput.value)) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        // Validar email (estructura condicional)
        if (!validateEmail(emailInput.value)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Validar género musical (estructura condicional)
        if (!genreInput.value) {
            document.getElementById('genreError').style.display = 'block';
            isValid = false;
        }
        
        // Si todo es válido, procesar el formulario (estructura condicional)
        if (isValid) {
            processForm(nameInput.value, emailInput.value, genreInput.value);
        }
    });
}

// Función para ocultar todos los mensajes de error
function hideAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    
    // Usar bucle para ocultar cada mensaje de error 
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].style.display = 'none';
    }
}

// Función para validar el nombre
function validateName(name) {
    // Verificar que el nombre no esté vacío 
    return name.trim() !== '';
}

// Función para validar el correo electrónico
function validateEmail(email) {
    // Expresión regular para validar formato de email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para procesar el formulario
function processForm(name, email, genre) {
    // Almacenar datos de usuario (uso de variables para almacenar datos)
    currentUser.name = name;
    currentUser.email = email;
    currentUser.favoriteGenre = genre;
    
    // Mostrar mensaje de éxito
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Resetear formulario después de 3 segundos 
    setTimeout(function() {
        document.getElementById('contactForm').reset();
        successMessage.style.display = 'none';
        
        // Mostrar mensaje personalizado basado en el género musical
        const genreMessage = getGenreMessage(genre);
        alert(`¡Gracias ${name}! ${genreMessage}`);
        
        console.log('Datos de usuario:', currentUser);
    }, 3000);
}
