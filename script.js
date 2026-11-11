/* ===== 1. YOUR PROJECT DETAILS (edit the text here) ===== */
const PROJECTS = {
  calc: { title: "Scientific Calculator Using C", points: [
    "Menu-driven program: the user picks an operation from a menu",
    "Arithmetic operations: add, subtract, multiply, divide",
    "Square root and power calculation",
    "Factorial and other mathematical functions",
    "GitHub link: [add link]" ] },
  esp: { title: "ESP32 Project", points: [
    "Microcontroller-based project built with the ESP32",
    "Components: [add component list]",
    "Circuit diagram: [add image]",
    "Working demonstration: [add video link]" ] },
  dt: { title: "Design Thinking Project", points: [
    "Problem identification: [add problem]",
    "Empathy and observation: [add what you observed]",
    "Ideation: [add ideas considered]",
    "Prototype development: [add prototype details]",
    "Proposed solution: [add solution]" ] }
};

const $ = (id) => document.getElementById(id);

/* ===== 2. MOBILE MENU ===== */
const menu = $("menu"), menuBtn = $("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false);
}));

/* ===== 3. SCROLL: back-to-top button + active menu link ===== */
const toTop = $("toTop");
const links = [...menu.querySelectorAll("a")];
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
  let current = "";
  document.querySelectorAll("main section[id]").forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ===== 4. SCROLL REVEAL + SKILL BARS ===== */
const seen = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll(".skill").forEach(c => c.querySelector("i").style.width = c.dataset.level + "%");
    seen.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => seen.observe(el));

/* ===== 5. PROJECT DETAILS POPUP ===== */
document.querySelectorAll("[data-project]").forEach(btn => btn.addEventListener("click", () => {
  const p = PROJECTS[btn.dataset.project];
  $("dTitle").textContent = p.title;
  $("dList").innerHTML = p.points.map(t => `<li>${t}</li>`).join("");
  $("dlg").showModal();
}));
$("dClose").addEventListener("click", () => $("dlg").close());
$("dlg").addEventListener("click", (e) => { if (e.target === $("dlg")) $("dlg").close(); });

/* ===== 6. RESUME BUTTON =====
   To enable: put your PDF in this folder, then set RESUME_FILE = "resume.pdf" */
const RESUME_FILE = "";
$("resumeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (!RESUME_FILE) { alert("Resume not added yet. Set RESUME_FILE in script.js."); return; }
  const a = document.createElement("a"); a.href = RESUME_FILE; a.download = ""; a.click();
});

/* ===== 7. CONTACT FORM =====
   Validates, then opens your email app with the message filled in.
   Replace the address below with your real email. */
const MY_EMAIL = "your.email@example.com";
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("fName").value.trim(), email = $("fEmail").value.trim(), msg = $("fMsg").value.trim();
  const note = $("formNote");
  if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) {
    note.style.color = "#FF8A8A"; note.textContent = "Enter your name, a valid email and a message."; return;
  }
  note.style.color = "#5CF2B0"; note.textContent = "Opening your email app to send the message...";
  location.href = `mailto:${MY_EMAIL}?subject=${encodeURIComponent("Portfolio message from " + name)}&body=${encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")")}`;
});

/* ===== 8. FOOTER YEAR ===== */
$("year").textContent = new Date().getFullYear();

/* ===== 9. HERO CIRCUIT BACKGROUND (drawn once, no animation loop) ===== */
(function () {
  const c = $("circuit"), ctx = c.getContext("2d");
  function draw() {
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    ctx.strokeStyle = "rgba(53,215,238,.25)"; ctx.fillStyle = "#35D7EE"; ctx.lineWidth = 1;
    const step = 60, rnd = (n) => Math.floor(Math.random() * n);
    for (let i = 0; i < 26; i++) {
      let x = rnd(c.width / step) * step, y = rnd(c.height / step) * step;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 4; j++) {          // short right-angle traces
        if (j % 2) y += (rnd(2) ? 1 : -1) * step * (1 + rnd(2));
        else x += (rnd(2) ? 1 : -1) * step * (1 + rnd(2));
        ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill();   // node at the end
    }
  }
  draw();
  let t; window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(draw, 250); });
})();
