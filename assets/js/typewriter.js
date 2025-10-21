const typewriterText = document.getElementById("typewriter-text");
const phrases = [
    "I'm an AI Engineer.",
    "I design interpretable models.",
    "I build computer vision systems.",
    "I love human-centered AI."
];

let i = 0, j = 0, deleting = false;

function typeEffect() {
    const current = phrases[i];
    if (!deleting) {
    typewriterText.textContent = current.slice(0, ++j);
    if (j === current.length + 10) deleting = true;
    } else {
    typewriterText.textContent = current.slice(0, --j);
    if (j === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
    }
    }
    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();
