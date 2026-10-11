const stage = document.getElementById("stage");
const img = document.getElementById("img");
const out = document.getElementById("out");
let reperes = [];
let n = 1;

function refresh() {
  stage.querySelectorAll(".dot").forEach((d) => d.remove());
  reperes.forEach((r) => {
    const el = document.createElement("div");
    el.className = "dot " + r.utilitaire;
    el.style.left = r.x + "%";
    el.style.top = r.y + "%";
    el.textContent = r.numero;
    el.title = r.titre;
    stage.appendChild(el);
  });
  out.value = JSON.stringify(reperes, null, 2);
}
function setSrc(src) {
  img.src = src;
  img.hidden = false;
  stage.querySelector(".hint")?.remove();
}
document.getElementById("file").onchange = (e) => {
  const f = e.target.files[0];
  if (f) setSrc(URL.createObjectURL(f));
};
document.getElementById("loadUrl").onclick = () => {
  const v = document.getElementById("url").value.trim();
  if (v) setSrc(v);
};
stage.onclick = (e) => {
  if (img.hidden) return;
  const rect = stage.getBoundingClientRect();
  const x = +(((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
  const y = +(((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
  reperes.push({
    x, y, numero: n++,
    titre: document.getElementById("rTitre").value || ("Repère " + (n - 1)),
    utilitaire: document.getElementById("rUtil").value,
    description: document.getElementById("rDesc").value || ""
  });
  refresh();
};
document.getElementById("undo").onclick = () => { reperes.pop(); n = Math.max(1, n - 1); refresh(); };
document.getElementById("clear").onclick = () => { reperes = []; n = 1; refresh(); };
document.getElementById("copy").onclick = () => { out.select(); document.execCommand("copy"); navigator.clipboard?.writeText(out.value); };
