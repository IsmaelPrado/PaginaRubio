document.addEventListener('DOMContentLoaded', function() {
    // Cargar el encabezado y el pie de página
    loadComponent('Archivos/components/header.html', 'header-container');
    loadComponent('Archivos/components/footer.html', 'footer-container');
    
    // Obtener la ruta actual y determinar qué contenido cargar
    const path = window.location.pathname;
    const currentPage = path.split('/').pop().replace('.html', '') || 'index'; // Manejo de la página inicial
    
    // Determinar qué contenido cargar
    let contentPage = 'inicio'; // Página por defecto
    if (currentPage === 'normativas') {
        contentPage = 'normativas';
    } else if (currentPage === 'estandares') {
        contentPage = 'estandares';
    } else if (currentPage === 'aviso-privacidad') {
        contentPage = 'aviso-privacidad';
    }
    
    loadComponent(`Archivos/components/${contentPage}.html`, 'main-content-container');
    
    // Resaltar el enlace activo
    setActiveLink(contentPage);
    
    // Manejar clics en los enlaces de navegación
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('nav-link')) {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            loadComponent(`Archivos/components/${page}.html`, 'main-content-container');
            setActiveLink(page);
        }
    });
});

// Función para cargar componentes HTML
function loadComponent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        });
}

// Función para resaltar el enlace activo
function setActiveLink(page) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Función para mostrar/ocultar el botón basado en el desplazamiento
    function handleScroll() {
        if (window.scrollY > 200) { // Mostrar botón cuando el desplazamiento sea mayor a 200px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    // Llama a handleScroll cuando el usuario se desplaza
    window.addEventListener('scroll', handleScroll);

    // Función para volver al principio de la página al hacer clic en el botón
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
