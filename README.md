# CS Execs

Site statique (GitHub Pages) : fiches d'exécution de sites CS2.

- `index.html` : recherche + filtres map/site, liste execs, total utilitaires.
- `exec.html?id=...` : détail exec, étapes, images + repères cliquables.
- `editeur.html` : pose tes repères sur tes images → copie le JSON → colle dans `data/execs.json`.
- `data/execs.json` : toutes les données.
- `assets/` : mets tes screenshots ici (800x450 conseillé), remplace les `.svg` d'exemple.

## Ajouter une exec

1. Ajoute image dans `assets/ma-map.jpg`.
2. Ouvre `editeur.html`, charge l'image, clique pour poser repères, copie JSON.
3. Ajoute un bloc dans `data/execs.json` (copie un existant).
4. Commit + push, le site se redéploie seul.

## Lancer en local

```bash
python3 -m http.server 8000
# http://localhost:8000
```
