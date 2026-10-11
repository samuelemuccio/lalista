/**
 * sync_notes.js
 * Sincronizzatore editoriale per Ari Playlist.
 * Legge NOTE_E_LETTERE.md e sincronizza note e lettere in:
 * - playlist-data.js & github-deploy/playlist-data.js
 * - app.js & github-deploy/app.js
 * - index.html & github-deploy/index.html
 * - ARCHIVIO_TESTI_NOTE_E_LETTERE.md
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const noteFile = path.join(rootDir, 'NOTE_E_LETTERE.md');

if (!fs.existsSync(noteFile)) {
  console.error('❌ Errore: File NOTE_E_LETTERE.md non trovato in', noteFile);
  process.exit(1);
}

const mdContent = fs.readFileSync(noteFile, 'utf8');

// --- 1. PARSER DEL MARKDOWN ---
function parseEditorialMarkdown(content) {
  const letters = {};
  const notes = {};

  // Parse Lettere
  const listaLetterMatch = content.match(/###\s*\[lettera-lista\][^\n]*\n([\s\S]*?)(?=\n---\n|\n###\s*\[lettera-prog\])/i);
  if (listaLetterMatch) {
    letters.lista = parseLetterBlock(listaLetterMatch[1]);
  }

  const progLetterMatch = content.match(/###\s*\[lettera-prog\][^\n]*\n([\s\S]*?)(?=\n---\n|\n##\s*🎵)/i);
  if (progLetterMatch) {
    letters.prog = parseLetterBlock(progLetterMatch[1]);
  }

  // Parse Note dei Brani
  // Cerca pattern: ### [trackId] Titolo \n testo... oppure #### [altId] Titolo \n testo...
  const noteRegex = /(?:###|####)\s*\[([a-zA-Z0-9_-]+)\][^\n]*\n([\s\S]*?)(?=(?:\n###|\n####|\n---\s*\n|$))/g;
  let match;
  while ((match = noteRegex.exec(content)) !== null) {
    const trackId = match[1].trim();
    if (trackId.startsWith('lettera-')) continue;

    let rawNote = match[2].trim();
    // Se contiene (Nessuna nota...) o è vuoto, la nota è vuota
    if (rawNote.includes('(Nessuna nota') || rawNote === '') {
      notes[trackId] = '';
    } else {
      notes[trackId] = formatNoteToHtml(rawNote);
    }
  }

  return { letters, notes };
}

function parseLetterBlock(raw) {
  let title = '';
  let subtitle = '';

  const titleMatch = raw.match(/\*\*Titolo\*\*:\s*([^\n]+)/i);
  if (titleMatch) title = titleMatch[1].trim();

  const subMatch = raw.match(/\*\*Sottotitolo\*\*:\s*([^\n]+)/i);
  if (subMatch) subtitle = subMatch[1].trim();

  // Rimuovi le righe di Titolo e Sottotitolo per ottenere i paragrafi del corpo
  let body = raw
    .replace(/\*\*Titolo\*\*:[^\n]+/i, '')
    .replace(/\*\*Sottotitolo\*\*:[^\n]+/i, '')
    .trim();

  const paragraphs = body
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => {
      let html = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return `<p>${html}</p>`;
    });

  return {
    title,
    subtitle,
    paragraphsText: body,
    htmlCopy: paragraphs.join('')
  };
}

function formatNoteToHtml(raw) {
  // Converte paragrafi markdown in HTML mantenendo tag esistenti
  const paras = raw
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);

  if (paras.length === 0) return '';

  const converted = paras.map(p => {
    // Se inizia già con <p> o <div>, lascialo così
    if (p.startsWith('<p>') || p.startsWith('<div>')) return p;
    let text = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return text;
  });

  if (converted.length === 1) {
    return converted[0];
  } else {
    return converted.map(c => `<p>${c}</p>`).join('');
  }
}

const parsed = parseEditorialMarkdown(mdContent);
console.log(`📖 Analisi completata: trovate note per ${Object.keys(parsed.notes).length} brani/alternative e ${Object.keys(parsed.letters).length} lettere.`);

// --- 2. AGGIORNAMENTO DI PLAYLIST-DATA.JS ---
function updatePlaylistData(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Eval temporaneo per ottenere l'oggetto attuale
  const tempCode = code.replace('const TRACK_DATA', 'var TRACK_DATA');
  const vm = require('vm');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(tempCode, sandbox);
  const td = sandbox.TRACK_DATA;

  let updatedCount = 0;

  for (const coll of Object.keys(td)) {
    td[coll].forEach(track => {
      // Nota brano principale
      if (parsed.notes.hasOwnProperty(track.id)) {
        let newNote = parsed.notes[track.id];
        // Preserva gallery / video per prog-02
        if (track.id === 'prog-02' && track.note && track.note.includes('<div class="popover-gallery-section">')) {
          const galleryIdx = track.note.indexOf('<div class="popover-gallery-section">');
          const galleryHtml = track.note.substring(galleryIdx);
          if (newNote) {
            newNote = (newNote.startsWith('<p>') ? newNote : `<p>${newNote}</p>`) + galleryHtml;
          }
        }
        if (newNote) {
          track.note = newNote;
        } else {
          delete track.note;
        }
        updatedCount++;
      }

      // Note alternative
      if (track.alternatives) {
        track.alternatives.forEach((alt, idx) => {
          const altId = `${track.id}-alt-${idx}`;
          if (parsed.notes.hasOwnProperty(altId)) {
            const newAltNote = parsed.notes[altId];
            if (newAltNote) {
              alt.note = newAltNote;
            } else {
              delete alt.note;
            }
            updatedCount++;
          }
        });
      }
    });
  }

  // Riscrivi formattato preservando l'intestazione
  const newCode = `// Dati editoriali e video importati dalla curatela YouTube.\nconst TRACK_DATA = ${JSON.stringify(td, null, 2)};\n`;
  fs.writeFileSync(filePath, newCode, 'utf8');
  console.log(`✔ ${path.relative(rootDir, filePath)} aggiornato (${updatedCount} tracce/alt sincronizzate).`);
}

updatePlaylistData(path.join(rootDir, 'playlist-data.js'));
updatePlaylistData(path.join(rootDir, 'github-deploy', 'playlist-data.js'));

// --- 3. AGGIORNAMENTO DI APP.JS (LETTERE) ---
function updateAppJs(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Aggiorna lettere nel blocco `const letters = { ... };`
  if (parsed.letters.lista) {
    const lista = parsed.letters.lista;
    const listaRegex = /(lista:\s*\{\s*title:\s*)"[^"]*",\s*(subtitle:\s*)"[^"]*",\s*(copy:\s*)"[^"]*"/;
    if (listaRegex.test(code)) {
      const escapedCopy = lista.htmlCopy.replace(/"/g, '\\"');
      code = code.replace(listaRegex, `$1"${lista.title}",\n      $2"${lista.subtitle}",\n      $3"${escapedCopy}"`);
    }
  }

  if (parsed.letters.prog) {
    const prog = parsed.letters.prog;
    const progRegex = /(prog:\s*\{\s*title:\s*)"[^"]*",\s*(subtitle:\s*)"[^"]*",\s*(copy:\s*)"[^"]*"/;
    if (progRegex.test(code)) {
      const escapedCopy = prog.htmlCopy.replace(/"/g, '\\"');
      code = code.replace(progRegex, `$1"${prog.title}",\n      $2"${prog.subtitle}",\n      $3"${escapedCopy}"`);
    }
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`✔ ${path.relative(rootDir, filePath)} aggiornato (lettere modali sincronizzate).`);
}

updateAppJs(path.join(rootDir, 'app.js'));
updateAppJs(path.join(rootDir, 'github-deploy', 'app.js'));

// --- 4. AGGIORNAMENTO DI INDEX.HTML (LETTERE DESKTOP) ---
function updateIndexHtml(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Aggiorna introLetterLista
  if (parsed.letters.lista) {
    const l = parsed.letters.lista;
    const listaCardRegex = /(<article class="intro-letter" id="introLetterLista">[\s\S]*?<button class="btn-letter-dismiss"[\s\S]*?<\/button>)([\s\S]*?)(<\/article>)/;
    if (listaCardRegex.test(html)) {
      let inner = `\n<p class="letter-opening">${l.title}</p>\n<p><strong>${l.subtitle}.</strong></p>\n` +
        l.paragraphsText.split(/\n\s*\n/).map(p => {
          let c = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<p>${c}</p>`;
        }).join('\n');
      html = html.replace(listaCardRegex, `$1${inner}$3`);
    }

    // Aggiorna header welcome dialog
    html = html.replace(/(<h2 id="welcomeTitle">)[^<]*(<\/h2>)/, `$1${l.title}$2`);
    html = html.replace(/(<span class="welcome-subtitle">)[^<]*(<\/span>)/, `$1${l.subtitle}$2`);
  }

  // Aggiorna introLetterProg
  if (parsed.letters.prog) {
    const p = parsed.letters.prog;
    const progCardRegex = /(<article class="intro-letter prog-intro-letter" id="introLetterProg">[\s\S]*?<button class="btn-letter-dismiss"[\s\S]*?<\/button>)([\s\S]*?)(<\/article>)/;
    if (progCardRegex.test(html)) {
      let inner = `\n<p class="letter-opening">${p.title}</p>\n` +
        p.paragraphsText.split(/\n\s*\n/).map(par => {
          let c = par.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<p>${c}</p>`;
        }).join('\n');
      html = html.replace(progCardRegex, `$1${inner}$3`);
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✔ ${path.relative(rootDir, filePath)} aggiornato (lettere desktop sincronizzate).`);
}

updateIndexHtml(path.join(rootDir, 'index.html'));
updateIndexHtml(path.join(rootDir, 'github-deploy', 'index.html'));

// --- 5. AGGIORNAMENTO DI ARCHIVIO_TESTI_NOTE_E_LETTERE.MD ---
function updateMasterArchive(filePath) {
  if (!fs.existsSync(filePath)) return;
  let archive = fs.readFileSync(filePath, 'utf8');

  // Aggiorna lettere
  if (parsed.letters.lista) {
    const l = parsed.letters.lista;
    const block = `### Lettera di apertura — La Lista\n\n> **${l.title}**\n> *${l.subtitle}*\n>\n> ` +
      l.paragraphsText.replace(/\n\s*\n/g, '\n>\n> ');
    archive = archive.replace(/### Lettera di apertura — La Lista[\s\S]*?(?=### Lettera d’introduzione)/, block + '\n\n');
  }

  if (parsed.letters.prog) {
    const p = parsed.letters.prog;
    const block = `### Lettera d’introduzione — Un appunto sul Prog\n\n> **${p.title}**\n> *${p.subtitle}*\n>\n> ` +
      p.paragraphsText.replace(/\n\s*\n/g, '\n>\n> ');
    archive = archive.replace(/### Lettera d’introduzione — Un appunto sul Prog[\s\S]*?(?=---\n## 2\. LA LISTA)/, block + '\n\n');
  }

  // Aggiorna note traccia per traccia
  for (const [trackId, noteHtml] of Object.entries(parsed.notes)) {
    if (!noteHtml) continue;
    // Pulisci HTML per markdown semplice dell'archivio
    let mdNote = noteHtml
      .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em>(.*?)<\/em>/gi, '*$1*')
      .replace(/<p>/gi, '')
      .replace(/<\/p>/gi, '\n> \n> ')
      .trim();

    // Regex per trovare la nota associata all'ID
    const trackNoteRegex = new RegExp(`(- \\*\\*ID\\*\\*:\\s*${trackId}[\\s\\S]*?\\*\\*Nota editoriale(?: \\/ di ascolto)?\\*\\*:\\n)>[^\n]*(?:\\n>[^\n]*)*`, 'i');
    if (trackNoteRegex.test(archive)) {
      archive = archive.replace(trackNoteRegex, `$1> ${mdNote}`);
    }
  }

  fs.writeFileSync(filePath, archive, 'utf8');
  console.log(`✔ ARCHIVIO_TESTI_NOTE_E_LETTERE.md aggiornato in sincrono.`);
}

updateMasterArchive(path.join(rootDir, 'ARCHIVIO_TESTI_NOTE_E_LETTERE.md'));

console.log('\n🎉 SINCRONIZZAZIONE COMPLETATA CON SUCCESSO!');

