// ===== Botón volver arriba =====
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
});

toTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Expandir / colapsar proyectos
document.querySelectorAll('.project .toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.closest('.project').querySelector('.project-body');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    body.style.display = expanded ? 'none' : 'block';
  });
});

// Mostrar/ocultar detalle de referencia
const refBtn = document.querySelector('.toggle-ref');
if (refBtn) {
  refBtn.addEventListener('click', () => {
    const detail = document.querySelector('.ref-detail');
    const expanded = refBtn.getAttribute('aria-expanded') === 'true';
    refBtn.setAttribute('aria-expanded', String(!expanded));
    detail.style.display = expanded ? 'none' : 'block';
  });
}

// Validación básica del formulario
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const nombre = form.nombre.value.trim();
    const emailValido = /.+@.+\..+/.test(email);
    if (!nombre || !emailValido) {
      feedback.textContent = 'Completá nombre y un email válido.';
      feedback.style.color = '#b91c1c';
      return;
    }
    // LocalStorage (bonus)
    localStorage.setItem('contacto', JSON.stringify({ nombre, email, mensaje: form.mensaje.value.trim() }));
    feedback.textContent = '¡Mensaje listo para enviar! (demo)';
    feedback.style.color = '#166534';
    form.reset();
  });
}

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Tema claro/oscuro
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });
}

// ===== Fondo interactivo que sigue al cursor =====
const root = document.documentElement;
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  root.style.setProperty('--mx', `${x}%`);
  root.style.setProperty('--my', `${y}%`);
});

// Soporte táctil: centra el foco al tocar
document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  const x = (t.clientX / window.innerWidth) * 100;
  const y = (t.clientY / window.innerHeight) * 100;
  root.style.setProperty('--mx', `${x}%`);
  root.style.setProperty('--my', `${y}%`);
}, { passive: true });
