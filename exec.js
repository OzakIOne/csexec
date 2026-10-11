const $ = (s) => document.querySelector(s);
const id = new URLSearchParams(location.search).get("id");

async function init() {
  const res = await fetch("data/execs.json");
  const data = await res.json();
  const d = data.find((x) => x.id === id) || data[0];
  if (!d) { $("#detail").innerHTML = "<p>Aucune exec.</p>"; return; }
  document.title = d.nom + " — CS Execs";
  const u = d.utilitaires;
  const total = (u.smoke||0)+(u.flash||0)+(u.molotov||0)+(u.he||0);
  $("#detail").innerHTML = `
    <div class="detail-head">
      <div class="tags"><span class="tag map">${d.map}</span><span class="tag">Site ${d.site}</span><span class="tag">${d.difficulte}</span><span class="tag">${d.temps}</span><span class="tag">${d.joueurs} joueurs</span></div>
      <h2>${d.nom}</h2>
      <p>${d.description}</p>
      <div class="uti-grid">
        <div class="uti"><b>${total}</b><span>total</span></div>
        <div class="uti"><b>💨 ${u.smoke||0}</b><span>smokes</span></div>
        <div class="uti"><b>⚡ ${u.flash||0}</b><span>flashs</span></div>
        <div class="uti"><b>🔥 ${u.molotov||0}</b><span>molotovs</span></div>
        <div class="uti"><b>💣 ${u.he||0}</b><span>HE</span></div>
      </div>
    </div>
    <ol class="etapes">${(d.etapes||[]).map((e) => `<li>${e}</li>`).join("")}</ol>
    ${d.images.map((img, i) => `
      <div class="shot">
        <h3>${i+1}. ${img.titre}</h3>
        <p class="desc">${img.description||""}</p>
        <div class="stage" data-shot="${i}">
          <img src="${img.src}" alt="${img.titre}">
          ${(img.reperes||[]).map((r) => `<div class="dot ${r.utilitaire||"info"}" style="left:${r.x}%;top:${r.y}%" data-t="${r.titre}" data-d="${r.description||""}" title="${r.titre}">${r.numero}</div>`).join("")}
        </div>
        <div class="repere-info" hidden></div>
      </div>`).join("")}
  `;
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll(".dot").forEach((x) => x.classList.remove("sel"));
      dot.classList.add("sel");
      const box = dot.closest(".shot").querySelector(".repere-info");
      box.hidden = false;
      box.innerHTML = `<b>#${dot.textContent} ${dot.dataset.t}</b><br>${dot.dataset.d}`;
    };
  });
}
init();
