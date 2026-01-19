// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const calculateBtn = document.getElementById('calculateBtn');
    const galleryContainer = document.getElementById('galleryContainer');
    
    // Gallery Data
    const galleryItems = [
        { category: 'sports', img: 'https://i.ibb.co/N6vN5Wgk/Whats-App-Image-2024-01-03-at-3-51-31-PM.jpg', title: 'Centro Deportivo', desc: 'Construcción completa' },
        { category: 'sports', img: 'https://i.ibb.co/5Wpd52SW/Whats-App-Image-2024-01-03-at-3-51-31-PM-1.jpg', title: 'Estructuras Deportivas', desc: 'Detalles de construcción' },
        { category: 'paving', img: 'https://i.ibb.co/vCrt7DHk/Whats-App-Image-2024-01-03-at-3-51-33-PM-1.jpg', title: 'Pavimentación Vial', desc: 'Trabajos de pavimentación' },
        { category: 'paving', img: 'https://i.ibb.co/pvKhXYzm/Whats-App-Image-2024-01-03-at-3-51-32-PM.jpg', title: 'Pavimentación Urbana', desc: 'Soluciones urbanas' },
        { category: 'pools', img: 'https://i.ibb.co/v6N5jcsY/Whats-App-Image-2024-01-03-at-3-51-28-PM-2.jpg', title: 'Piscina Arquitectónica', desc: 'Construcción especializada' },
        { category: 'pools', img: 'https://i.ibb.co/JRbwZjWy/Whats-App-Image-2024-01-03-at-3-51-27-PM.jpg', title: 'Sistema Impermeable', desc: 'Tecnología avanzada' },
        { category: 'clubs', img: 'https://i.ibb.co/d0DzcC1k/Whats-App-Image-2026-01-09-at-9-53-51-AM-1.jpg', title: 'Country Club', desc: 'Proyecto integral' },
        { category: 'clubs', img: 'https://i.ibb.co/XZq9PCTM/Whats-App-Image-2026-01-09-at-9-53-51-AM.jpg', title: 'Instalaciones Premium', desc: 'Primera categoría' }
    ];
    
    // Initialize Gallery
    function initGallery() {
        if (galleryContainer) {
            galleryContainer.innerHTML = '';
            galleryItems.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item fade-in';
                galleryItem.setAttribute('data-category', item.category);
                galleryItem.innerHTML = `
                    <img src="${item.img}" alt="${item.title} - ${item.desc}" loading="lazy">
                    <div class="gallery-overlay">
                        <h4 class="gallery-title">${item.title}</h4>
                        <p class="gallery-description">${item.desc}</p>
                    </div>
                `;
                galleryContainer.appendChild(galleryItem);
            });
            
            // Initialize animations
            initAnimations();
        }
    }
    
    // Filter Gallery
    function filterGallery(category) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            } else {
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Calculate Cost
    function calculateCost() {
        const area = parseFloat(document.getElementById('area').value);
        const type = document.getElementById('type').value;
        const quality = document.getElementById('quality').value;
        
        if (!area || area <= 0) {
            alert('Por favor ingrese un área válida en metros cuadrados.');
            return;
        }
        
        // Base prices per m³
        let pricePerM3, qualityText;
        switch(quality) {
            case 'standard': pricePerM3 = 320; qualityText = "Estándar"; break;
            case 'high': pricePerM3 = 360; qualityText = "Alta"; break;
            case 'premium': pricePerM3 = 420; qualityText = "Premium"; break;
            case 'superior': pricePerM3 = 480; qualityText = "Superior"; break;
            default: pricePerM3 = 320; qualityText = "Estándar";
        }
        
        // Thickness factor
        let thickness, typeText;
        switch(type) {
            case 'house': thickness = 0.10; typeText = "Losa para vivienda"; break;
            case 'building': thickness = 0.15; typeText = "Losa para edificio"; break;
            case 'industrial': thickness = 0.20; typeText = "Estructura industrial"; break;
            case 'light': thickness = 0.08; typeText = "Techos ligeros"; break;
            case 'foundation': thickness = 0.30; typeText = "Cimientos y bases"; break;
            default: thickness = 0.10; typeText = "Losa para vivienda";
        }
        
        // Calculations
        const volume = area * thickness;
        const concreteCost = volume * pricePerM3;
        const additionalCosts = concreteCost * 0.15;
        const finalCost = concreteCost + additionalCosts;
        const roundedCost = Math.round(finalCost / 10) * 10;
        
        // Display result
        document.getElementById('resultDetails').innerHTML = `
            <strong>${area.toLocaleString()} m²</strong> de ${typeText}<br>
            Calidad: <strong>${qualityText}</strong><br>
            Volumen: <strong>${volume.toFixed(1)} m³</strong>
        `;
        
        document.getElementById('finalCost').textContent = roundedCost.toLocaleString('es-PE');
        document.getElementById('resultContainer').style.display = 'block';
        
        // Scroll to result
        document.getElementById('resultContainer').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // Initialize Animations
    function initAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Event Listeners
    // Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Filter Buttons
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                filterGallery(filter);
            });
        });
    }
    
    // Calculate Button
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCost);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav && menuToggle && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Initialize
    if (galleryContainer) initGallery();
    initAnimations();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 768 && mainNav) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 250);
    });
});