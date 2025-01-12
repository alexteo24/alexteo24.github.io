document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbarCollapse.classList.remove('show');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function handleScroll() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    const derivativeItems = document.querySelectorAll('.derivative-item');
    derivativeItems.forEach(item => {
        const header = item.querySelector('.derivative-header');
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('active');
        });

        header.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                // e.preventDefault();
                e.stopPropagation();
                item.classList.toggle('active');
            }
        });
    });

    function initializeCarousel(carouselElement) {
        const container = carouselElement.querySelector('.perspective-container');
        const items = container.querySelectorAll('.perspective-item');
        const prevBtn = carouselElement.querySelector('.prev-perspective');
        const nextBtn = carouselElement.querySelector('.next-perspective');
        let currentIndex = 0;
        let intervalId;

        function updateSlide() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlide();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateSlide();
        }

        function startAutoRotation() {
            intervalId = setInterval(nextSlide, 10000);
        }

        function stopAutoRotation() {
            clearInterval(intervalId);
        }

        nextBtn.addEventListener('click', () => {
            stopAutoRotation();
            nextSlide();
            startAutoRotation();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoRotation();
            prevSlide();
            startAutoRotation();
        });

        container.addEventListener('mouseenter', stopAutoRotation);
        container.addEventListener('mouseleave', startAutoRotation);

        startAutoRotation();
    }

    const othersCarousel = document.querySelector('.others-perspective.carousel');
    initializeCarousel(othersCarousel);
});

