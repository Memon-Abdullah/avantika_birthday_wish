// Firework Canvas Animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
    constructor(x, y, colors) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.particles = [];
        // Increase the number of particles
        for (let i = 0; i < 100; i++) { // Increased from 50 to 100
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.random() * 6 - 3, // Increased speed
                vy: Math.random() * 6 - 3,
                alpha: 1
            });
        }
    }
    draw() {
        this.particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); // Increased size of particles
            ctx.fillStyle = `rgba(${this.colors}, ${p.alpha})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
        });
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const colors = `${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`;
    fireworks.push(new Firework(x, y, colors));
}

// Increase the frequency of fireworks
setInterval(() => {
    createFirework();
    createFirework(); // Adds multiple fireworks per interval
}, 500); // Reduced from 1000ms to 500ms for faster creation

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((f, i) => {
        f.draw();
        if (f.particles[0].alpha <= 0) fireworks.splice(i, 1);
    });
    requestAnimationFrame(animate);
}
animate();

// Popup Modal
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});
