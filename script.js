// Birthday wishes data with corresponding images for Dhanalakshmi (Dhanam/GG)
const birthdayWishes = [
    {
        text: "🎉 Happy Birthday Dhanalakshmi! Dear Dhanam, may this special day bring you endless joy, laughter, and wonderful memories that will last a lifetime! 🎂✨",
        image: "images/img1.jpg"
    },
    {
        text: "🌟 Wishing our amazing GG a year filled with success, happiness, and all the amazing adventures your heart desires! Happy Birthday Dhanalakshmi! 🎈🎁",
        image: "images/img2.jpg"
    },
    {
        text: "🎊 Another year older, another year wiser! May your birthday be as bright and beautiful as your smile, dear Dhanam! Have an incredible day! 🌈💫",
        image: "images/img3.jpg"
    },
    {
        text: "🎂 Happy Birthday Dhanalakshmi! May all your dreams come true and may you be blessed with good health, prosperity, and lots of love! 🥳🎉",
        image: "images/pic1.jpg"
    },
    {
        text: "✨ On your special day, dear GG, I wish you mountains of happiness, oceans of love, and skies full of dreams! Happy Birthday! 🌟🎈",
        image: "images/pic2.jpg"
    },
    {
        text: "🎁 Happy Birthday Dhanalakshmi! May this new chapter of your life be filled with exciting opportunities and beautiful moments! 🎊💖",
        image: "images/pic3.jpg"
    }
];

let currentWishIndex = 0;
let isAnimating = false;

// DOM elements
const wishCard = document.getElementById('wishCard');
const wishText = document.getElementById('wishText');
const wishImage = document.getElementById('wishImage');
const currentWishSpan = document.getElementById('currentWish');
const totalWishesSpan = document.getElementById('totalWishes');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImage = document.getElementById('fullscreenImage');
const imageCaption = document.getElementById('imageCaption');
const closeBtn = document.getElementById('closeBtn');
const instructionsModal = document.getElementById('instructionsModal');
const closeInstructionsBtn = document.getElementById('closeInstructionsBtn');
const startBtn = document.getElementById('startBtn');
const helpBtn = document.getElementById('helpBtn');

// Initialize the website
function init() {
    totalWishesSpan.textContent = birthdayWishes.length;
    showWish(currentWishIndex);
    createFloatingParticles();
    
    // Show instructions modal on first visit
    const hasSeenInstructions = localStorage.getItem('hasSeenInstructions');
    if (!hasSeenInstructions) {
        showInstructions();
    }
}

// Instructions data
const instructionData = [
    {
        icon: '🎂',
        title: 'Welcome to Dhanam\'s Birthday!',
        description: 'This special website is created just for Dhanalakshmi (Dhanam) on her birthday!'
    },
    {
        icon: '🖱️',
        title: 'Click the Card',
        description: 'Click anywhere on the wish card to see the next birthday wish for Dhanam'
    },
    {
        icon: '🖼️',
        title: 'View Dhanam\'s Photos',
        description: 'Click on any image to view Dhanam\'s beautiful photos in fullscreen mode'
    },
    {
        icon: '⌨️',
        title: 'Keyboard Navigation',
        description: 'Use arrow keys or spacebar to navigate between birthday wishes'
    },
    {
        icon: '📱',
        title: 'Mobile Swipe',
        description: 'Swipe left or right on mobile devices to navigate through wishes'
    },
    {
        icon: '🔢',
        title: 'Wish Counter',
        description: 'See which birthday wish you\'re viewing with the counter at the bottom'
    }
];


// Instructions modal functions
function showInstructions() {
    instructionsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Show all instructions at once with staggered animation
    const instructionsBody = document.getElementById('instructionsBody');
    instructionsBody.innerHTML = '';
    
    // Create falling stars
    createFallingStars();
    
    instructionData.forEach((instruction, index) => {
        setTimeout(() => {
            const instructionElement = document.createElement('div');
            instructionElement.className = 'instruction-item';
            instructionElement.innerHTML = `
                <div class="instruction-icon">${instruction.icon}</div>
                <div class="instruction-text">
                    <h3>${instruction.title}</h3>
                    <p>${instruction.description}</p>
                </div>
            `;
            instructionsBody.appendChild(instructionElement);
        }, index * 300); // Stagger each instruction by 300ms
    });
}

// Create falling stars for the instructions modal
function createFallingStars() {
    const modal = document.getElementById('instructionsModal');
    
    setInterval(() => {
        if (modal.style.display === 'flex') {
            const star = document.createElement('div');
            star.className = 'falling-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            modal.appendChild(star);
            
            // Remove star after animation
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 4000);
        }
    }, 800);
}

function hideInstructions() {
    instructionsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    localStorage.setItem('hasSeenInstructions', 'true');
}


// Show wish with animation
function showWish(index) {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Fade out current wish and image
    wishText.style.opacity = '0';
    wishText.style.transform = 'translateY(20px)';
    wishImage.style.opacity = '0';
    wishImage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        // Update content and image
        wishText.textContent = birthdayWishes[index].text;
        wishImage.src = birthdayWishes[index].image;
        currentWishSpan.textContent = index + 1;
        
        // Fade in new wish and image
        wishText.style.opacity = '1';
        wishText.style.transform = 'translateY(0)';
        wishImage.style.opacity = '1';
        wishImage.style.transform = 'scale(1)';
        
        // Add card flip animation
        wishCard.style.transform = 'translateY(-10px) rotateX(5deg)';
        setTimeout(() => {
            wishCard.style.transform = 'translateY(0) rotateX(0deg)';
        }, 200);
        
        isAnimating = false;
    }, 300);
}

// Next wish
function nextWish() {
    currentWishIndex = (currentWishIndex + 1) % birthdayWishes.length;
    showWish(currentWishIndex);
}

// Previous wish
function prevWish() {
    currentWishIndex = (currentWishIndex - 1 + birthdayWishes.length) % birthdayWishes.length;
    showWish(currentWishIndex);
}

// Fullscreen image functionality
function openFullscreen() {
    fullscreenImage.src = wishImage.src;
    imageCaption.textContent = `Dhanam's Birthday Photo ${currentWishIndex + 1} of ${birthdayWishes.length} - Happy Birthday Dhanalakshmi! 🎂`;
    fullscreenModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeFullscreen() {
    fullscreenModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Create floating space particles
function createFloatingParticles() {
    const container = document.querySelector('.container');
    
    setInterval(() => {
        if (Math.random() > 0.6) { // 40% chance to create a particle
            const particle = document.createElement('div');
            const particleTypes = ['star', 'comet', 'planet'];
            const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
            
            particle.className = `particle ${randomType}`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            // Add some random movement variation
            particle.style.animationTimingFunction = Math.random() > 0.5 ? 'ease-in-out' : 'linear';
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }
    }, 300);
}

// Event listeners
wishCard.addEventListener('click', nextWish);
nextBtn.addEventListener('click', nextWish);
prevBtn.addEventListener('click', prevWish);

// Fullscreen image event listeners
wishImage.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card click when clicking image
    openFullscreen();
});

closeBtn.addEventListener('click', closeFullscreen);
fullscreenModal.addEventListener('click', (e) => {
    if (e.target === fullscreenModal) {
        closeFullscreen();
    }
});

// Instructions modal event listeners
closeInstructionsBtn.addEventListener('click', hideInstructions);
startBtn.addEventListener('click', hideInstructions);
helpBtn.addEventListener('click', () => {
    showInstructions();
});
instructionsModal.addEventListener('click', (e) => {
    if (e.target === instructionsModal) {
        hideInstructions();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (instructionsModal.style.display === 'flex') {
        // When instructions are open, only handle escape key
        if (e.key === 'Escape') {
            hideInstructions();
        }
    } else if (fullscreenModal.classList.contains('show')) {
        // When fullscreen is open, only handle escape key
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    } else {
        // Normal navigation when modals are closed
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextWish();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevWish();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

wishCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

wishCard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next wish
            nextWish();
        } else {
            // Swipe right - previous wish
            prevWish();
        }
    }
}

// Auto-advance (optional - uncomment to enable)
// setInterval(() => {
//     nextWish();
// }, 5000);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
