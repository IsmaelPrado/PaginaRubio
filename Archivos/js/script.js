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

    // Función para cargar componentes HTML
    function loadComponent(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;

                // Llamar a la función para configurar el modal del PDF después de cargar el contenido
                setupPdfModal();

                // Inicializar el carrusel después de cargar el contenido
                initializeCarousel();
            })
            .catch(error => console.error('Error cargando el componente:', error));
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
});

// Función para manejar el botón "scroll to top"
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Función para mostrar/ocultar el botón basado en el desplazamiento
    function handleScroll() {
        if (window.scrollY > 200) { // Mostrar botón cuando el desplazamiento sea mayor a 200px
            scrollToTopBtn.classList.add('show');
            scrollToTopBtn.classList.remove('hidden'); // Asegúrate de quitar la clase 'hidden'
        } else {
            scrollToTopBtn.classList.remove('show');
            scrollToTopBtn.classList.add('hidden'); // Añade la clase 'hidden' cuando no esté visible
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

    // Llama a handleScroll al cargar la página para manejar el estado inicial
    handleScroll();
});

// Configurar el modal del PDF
function setupPdfModal() {
    // Obtener todos los botones que abren el PDF
    const pdfButtons = document.querySelectorAll('[data-pdf]');
    
    // Obtener los elementos del modal y el visor de PDF
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');

    // Verificar si los elementos existen
    if (!pdfModal || !pdfViewer || pdfButtons.length === 0) {
        console.error("No se encontraron los elementos del modal PDF o los botones.");
        return;
    }

    // Agregar el evento de clic a cada botón que abre el PDF
    pdfButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const pdfSrc = button.getAttribute('data-pdf');
            const normativaName = button.getAttribute('data-normativa');
            pdfViewer.src = `Archivos/pdf/${pdfSrc}`; // Asumiendo que los PDFs están en una carpeta 'pdf'
           // modalTitle.textContent = normativaName;
            pdfModal.classList.remove('hidden'); // Mostrar el modal
            pdfModal.classList.add('flex'); // Asegurarse de que se muestre el modal con la clase correcta
            console.log("Abriendo pdf");

            // Agregar el evento de cerrar modal al botón closeModal
            const closeModalBtn = document.getElementById('closeModal');
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', function() {
                    pdfModal.classList.add('hidden');
                    pdfModal.classList.remove('flex');
                    pdfViewer.src = ''; // Limpiar el src del iframe
                    console.log("Cerrando PDF");
                });
            } else {
                console.error("No se encontró el botón closeModal.");
            }
        });
    });
}

//Carousel
function initializeCarousel() {
    const carousel = document.getElementById('carousel-inner');
    const items = Array.from(carousel ? carousel.children : []);
    let currentIndex = 0;

    if (!carousel || items.length === 0) {
        console.error('Carrusel o ítems no encontrados');
        return;
    }

    // Calcula el ancho total del contenedor
    carousel.style.width = `${items.length * 100}%`;

    // Actualiza el ancho de cada ítem
    items.forEach(item => {
        item.style.width = `${100 / items.length}%`;
    });

    const updateCarousel = () => {
        const itemWidth = items[0].offsetWidth; // Ancho de un ítem
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    document.getElementById('prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1; // Volver al último ítem si estás en el primero
        }
        updateCarousel();
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volver al primer ítem si estás en el último
        }
        updateCarousel();
    });

    // Inicializar el carrusel
    updateCarousel();
}
