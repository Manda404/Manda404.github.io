const canvas = document.getElementById('webgl-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

let t = 0;

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  gradient.addColorStop(0, `hsl(${200 + t}, 60%, 15%)`);
  gradient.addColorStop(1, `hsl(${220 + t}, 60%, 10%)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  t += 0.05;
  requestAnimationFrame(animate);
}

animate();