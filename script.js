document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Image Scroll Logic ---
    const scrollContainer = document.getElementById('image-scroll-container');
    const images = document.querySelectorAll('.sticky-img');

    window.addEventListener('scroll', () => {
        // Calculate scroll progress through the container
        const scrollPosition = window.scrollY;
        const containerStart = scrollContainer.offsetTop;
        const scrollableDistance = scrollContainer.offsetHeight - window.innerHeight;
        
        // Progress is a number between 0 and 1
        let scrollProgress = (scrollPosition - containerStart) / scrollableDistance;
        
        // Cap the progress so it doesn't break if we scroll too high or low
        if (scrollProgress < 0) scrollProgress = 0;
        if (scrollProgress > 1) scrollProgress = 1;
        
        // Math to determine which image should be showing.
        // If progress is 0-24% = image 1, 25-49% = image 2, etc.
        const totalImages = images.length;
        const targetImageIndex = Math.min(
            Math.floor(scrollProgress * totalImages), 
            totalImages - 1
        );

        // Loop through the images and apply the 'active' class to the correct one
        images.forEach((img, index) => {
            if (index === targetImageIndex) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    });

    // --- Bottom Content Fade-In Animation Logic ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});