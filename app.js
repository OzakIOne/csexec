const state = { q: "", map: "Toutes", site: "Tous", data: [] };
const $ = (s) => document.querySelector(s);

async function init() {
  const res = await fetch("data/execs.json");
  state.data = await res.json();
  buildPills();
  $("#q").addEventListener("input", (e) => { state.q = e.target.value.toLowerCase(); render(); });
  render();
}
function uniq(key) { return [...new Set(state.data.map((d) => d[key]))]; }
function buildPills() {
  const maps = ["Toutes", ...uniq("map")];
  $("#maps").innerHTML = maps.map((m) => `<button data-m="${m}" class="${m === state.map ? "on" : ""}">${m}</button>`).join("");
  const sites = ["Tous", ...uniq("site")];
  $("#sites").innerHTML = sites.map((s) => `<button data-s="${s}" class="${s === state.site ? "on" : ""}">Site ${s}</button>`).join("");
  $("#maps").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; state.map = b.dataset.m; buildPills(); render(); };
  $("#sites").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; state.site = b.dataset.s; buildPills(); render(); };
}
function totalU(u) { return (u.smoke||0)+(u.flash||0)+(u.molotov||0)+(u.he||0); }
function render() {
  const list = state.data.filter((d) => {
    if (state.map !== "Toutes" && d.map !== state.map) return false;
    if (state.site !== "Tous" && d.site !== state.site) return false;
    if (!state.q) return true;
    return [d.nom, d.map, d.site, d.description, ...(d.etapes||[])].join(" ").toLowerCase().includes(state.q);
  });
  $("#count").textContent = `${list.length} exec(s)`;
  $("#list").innerHTML = list.map((d) => `
    <a class="card" href="exec.html?id=${d.id}">
      <img src="${d.images[0]?.src || ""}" alt="" loading="lazy">
      <div class="body">
        <div class="tags"><span class="tag map">${d.map}</span><span class="tag">Site ${d.site}</span><span class="tag">${d.difficulte}</span></div>
        <h2>${d.nom}</h2>
        <div class="utils"><b>${totalU(d.utilitaires)}</b> utilitaires — 💨${d.utilitaires.smoke||0} ⚡${d.utilitaires.flash||0} 🔥${d.utilitaires.molotov||0} 💣${d.utilitaires.he||0} · ${d.temps}</div>
      </div>
    </a>`).join("") || "<p>Aucun résultat. Ajoute une fiche dans data/execs.json.</p>";
}
init();
