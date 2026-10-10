# Ari Playlist - File per GitHub Pages

Questa cartella contiene **esclusivamente i 5 file necessari** per pubblicare il sito su GitHub Pages:

1. `index.html` — Struttura della pagina e player
2. `styles.css` — Grafica, layout responsive (PC, iPad, Mobile) e animazioni
3. `app.js` — Motore del player, animazioni di morphing e visualizer audio
4. `playlist-data.js` — Scalette (La Lista, Prog, Menzioni d'onore), note e video YouTube
5. `lyrics-data.js` — Testi completi e guide fonetiche

---

### Come pubblicarli su GitHub:

1. Nel tuo repository GitHub (es. `ariplaylist`), carica direttamente questi 5 file nella root (ramo principale `main`).
2. Vai su **Settings** del repository su GitHub $\rightarrow$ **Pages** (nel menu a sinistra).
3. Sotto **Build and deployment**:
   - **Source:** seleziona `Deploy from a branch`
   - **Branch:** seleziona `main` e cartella `/ (root)`
   - Clicca **Save**.
4. Dopo circa 1-2 minuti, il sito sarà online all'indirizzo pubblico fornito da GitHub (es. `https://tuo-username.github.io/ariplaylist/`).

