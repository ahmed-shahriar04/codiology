document.addEventListener('DOMContentLoaded', () => {
    // Get video element and mute button
    const videoElement = document.getElementById('hero-video');
    const muteToggleButton = document.getElementById('mute-toggle');
    let isMutedByScroll = false;

    // Function to toggle mute state
    const toggleMute = () => {
        if (videoElement.muted) {
            videoElement.muted = false;
            muteToggleButton.textContent = 'Press to Mute';
        } else {
            videoElement.muted = true;
            muteToggleButton.textContent = 'Press to Unmute';
        }
        isMutedByScroll = false; // Reset scroll mute state on manual toggle
    };

    // Mute/Unmute button click handler
    if (muteToggleButton) {
        muteToggleButton.addEventListener('click', toggleMute);
    }

    // Scroll event listener for mute/unmute
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const videoRect = videoElement.getBoundingClientRect();
        const isVideoInView = (
            videoRect.top >= 0 &&
            videoRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );

        if (st > lastScrollTop) {
            // Scrolling down
            if (!videoElement.muted && !isMutedByScroll) {
                videoElement.muted = true;
                muteToggleButton.textContent = 'Press to Unmute';
                isMutedByScroll = true;
            }
        } else {
            // Scrolling up
            if (videoElement.muted && isMutedByScroll && isVideoInView) {
                // Only unmute if it was muted by scroll and video is in view
                videoElement.muted = false;
                muteToggleButton.textContent = 'Press to Mute';
                isMutedByScroll = false;
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    });


    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle active class on the clicked question
            question.classList.toggle('active');
            // Toggle active class on the answer to show/hide it
            answer.classList.toggle('active');

            // Close other open FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
        });
    });

    // Mobile menu toggle functionality (if applicable, based on header HTML)
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header-nav');

    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            headerNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Optional: for hamburger animation
        });
    }
});
