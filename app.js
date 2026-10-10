// Playlist statiche: nessuna preferenza o correzione viene salvata nel browser.

// =============================================================================
// 1. DATASET COMPLETI
// =============================================================================

const LISTA_TRACKS = TRACK_DATA.lista;
const PROG_TRACKS = TRACK_DATA.prog;
const HONORABLE_MENTIONS = TRACK_DATA.honorable;

const elements = {
  collectionTabs: document.querySelectorAll(".collection-tab"),
  deckPanels: document.querySelectorAll(".deck-panel-view"),
  listaUniformList: document.getElementById("listaUniformList"),
  honorableMentionsList: document.getElementById("honorableMentionsList"),
  progTrackList: document.getElementById("progTrackList"),
  ytVideoPlayerIframe: document.getElementById("ytVideoPlayerIframe"),
  playerEmptyState: document.getElementById("playerEmptyState"),
  playerEmptyMessage: document.getElementById("playerEmptyMessage"),
  playerSearchLink: document.getElementById("playerSearchLink"),
  playerTrackTitle: document.getElementById("playerTrackTitle"),
  playerTrackArtist: document.getElementById("playerTrackArtist"),
  playerVariantButton: document.getElementById("playerVariantButton"),
  playerPrevious: document.getElementById("playerPrevious"),
  playerToggle: document.getElementById("playerToggle"),
  playerNext: document.getElementById("playerNext"),
  playerQueuePosition: document.getElementById("playerQueuePosition"),
  playerQueuePositionMobile: document.getElementById("playerQueuePositionMobile"),
  listeningRoom: document.querySelector(".listening-room"),
  btnDirectYt: document.getElementById("btnDirectYt"),
  btnOpenLyrics: document.getElementById("btnOpenLyrics"),
  playerLyricsDrawer: document.getElementById("playerLyricsDrawer"),
  lyricsDrawerBody: document.getElementById("lyricsDrawerBody"),
  mobileMiniPlayer: document.getElementById("mobileMiniPlayer"),
  miniPlayerExpand: document.getElementById("miniPlayerExpand"),
  miniPlayerPrevious: document.getElementById("miniPlayerPrevious"),
  miniPlayerToggle: document.getElementById("miniPlayerToggle"),
  miniPlayerNext: document.getElementById("miniPlayerNext"),
  miniPlayerThumbnail: document.getElementById("miniPlayerThumbnail"),
  miniPlayerTitle: document.getElementById("miniPlayerTitle"),
  miniPlayerTitleRepeat: document.getElementById("miniPlayerTitleRepeat"),
  miniPlayerArtist: document.getElementById("miniPlayerArtist"),
  miniPlayerCurrentTime: document.getElementById("miniPlayerCurrentTime"),
  miniPlayerDuration: document.getElementById("miniPlayerDuration"),
  miniPlayerProgress: document.getElementById("miniPlayerProgress"),
  btnCopyText: document.getElementById("btnCopyText"),
  btnDownloadText: document.getElementById("btnDownloadText"),
  toastBubble: document.getElementById("toastBubble")
};

let youtubePlayer = null;
let youtubePlayerReady = false;
let pendingYoutubeTrack = null;
let activeVideoTrack = null;
let listeningRoomVisible = true;
let youtubeApiLoading = false;
let playbackClock = null;
let playbackQueue = LISTA_TRACKS;
let playbackQueueLabel = "La Lista";
let playbackQueueIndex = 0;
let showMobileLetter = () => {};
let canShowProgLetter = () => false;

let currentNoteTrigger = null;
let openPopoverScrollY = 0;
let popoverClosingTimer = null;
let showLyricsTranslation = false;

document.addEventListener("DOMContentLoaded", () => {
  renderAllTrackLists();
  setPlaybackQueue(LISTA_TRACKS, "La Lista", 0);
  setupCollectionNavigation();
  setupExportTools();
  setupMobileMiniPlayer();
  setupVideoVariants();
  setupMobileWelcome();
  setupNotePopoverDismissal();
  setupLyricsDrawer();
});

function renderNoteButton(title, note) {
  if (!note) return "";
  return `<button class="btn-track-note" type="button" aria-label="Informazioni su ${escapeHtml(title)}" title="Informazioni" data-title="${escapeHtml(title)}" data-note="${escapeHtml(note)}"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5m0-8h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>`;
}

function showNotePopover(button, title, note) {
  const popover = document.getElementById("noteGlobalPopover");
  const popBody = document.getElementById("notePopoverBody");
  if (!popover || !popBody) return;

  if (currentNoteTrigger === button && !popover.hidden && !popover.classList.contains("is-closing")) {
    hideNotePopover();
    return;
  }

  if (popoverClosingTimer) {
    clearTimeout(popoverClosingTimer);
    popoverClosingTimer = null;
  }

  currentNoteTrigger = button;
  openPopoverScrollY = window.scrollY;
  popBody.innerHTML = note;
  popover.classList.remove("is-closing");
  popover.hidden = false;
  popover.classList.add("is-visible");

  const rect = button.getBoundingClientRect();
  const popoverWidth = Math.min(300, window.innerWidth - 28);
  popover.style.width = `${popoverWidth}px`;

  let left = rect.left;
  if (left + popoverWidth > window.innerWidth - 14) {
    left = window.innerWidth - popoverWidth - 14;
  }
  if (left < 14) left = 14;

  const popoverHeight = popover.offsetHeight || 80;
  let top = rect.bottom + 6;
  let isAbove = false;
  if (top + popoverHeight > window.innerHeight - 14 && rect.top - popoverHeight - 6 > 14) {
    top = rect.top - popoverHeight - 6;
    isAbove = true;
  }

  const originX = Math.max(12, Math.min(popoverWidth - 12, (rect.left + rect.width / 2) - left));
  const originY = isAbove ? popoverHeight : 0;
  popover.style.transformOrigin = `${originX}px ${originY}px`;

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function hideNotePopover() {
  const popover = document.getElementById("noteGlobalPopover");
  if (!popover || popover.hidden || popover.classList.contains("is-closing")) return;
  popover.classList.remove("is-visible");
  popover.classList.add("is-closing");
  popoverClosingTimer = setTimeout(() => {
    popover.hidden = true;
    popover.classList.remove("is-closing");
    currentNoteTrigger = null;
    popoverClosingTimer = null;
  }, 160);
}

function setupNotePopoverDismissal() {
  const closeBtn = document.getElementById("notePopoverClose");
  closeBtn?.addEventListener("click", hideNotePopover);
  document.addEventListener("click", event => {
    if (currentNoteTrigger && !event.target.closest("#noteGlobalPopover") && !event.target.closest(".btn-track-note")) {
      hideNotePopover();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") hideNotePopover();
  });
  window.addEventListener("scroll", () => {
    if (currentNoteTrigger && Math.abs(window.scrollY - openPopoverScrollY) > 90) {
      hideNotePopover();
    }
  }, { passive: true });
  window.addEventListener("resize", hideNotePopover, { passive: true });
}

function setLyricsContent(container, lyricsText) {
  if (!container) return;
  if (lyricsText.includes("<div") || lyricsText.includes("<span")) {
    container.innerHTML = lyricsText;
  } else {
    container.textContent = lyricsText;
  }
}

function renderActiveLyrics() {
  if (!activeVideoTrack || !elements.lyricsDrawerBody) return;
  const baseId = activeVideoTrack.id;
  const lyrics = (typeof LYRICS_DATA !== "undefined" && LYRICS_DATA[baseId]) || "";
  setLyricsContent(elements.lyricsDrawerBody, lyrics);
  elements.lyricsDrawerBody.scrollTop = 0;
}

function setupLyricsDrawer() {
  if (!elements.btnOpenLyrics || !elements.playerLyricsDrawer) return;

  const playerPaper = document.querySelector(".player-paper");

  const toggleLyrics = (force) => {
    if (!activeVideoTrack) return;
    const baseId = activeVideoTrack.id;
    const lyrics = (typeof LYRICS_DATA !== "undefined" && LYRICS_DATA[baseId]) || "";
    if (!lyrics) return;

    const isOpen = typeof force === "boolean" ? force : elements.playerLyricsDrawer.hidden;

    if (isOpen) {
      renderActiveLyrics();
      elements.playerLyricsDrawer.hidden = false;
      elements.lyricsDrawerBody.scrollTop = 0;
      elements.btnOpenLyrics.classList.add("is-active");
      elements.btnOpenLyrics.setAttribute("aria-expanded", "true");
      playerPaper?.classList.add("has-lyrics-open");

      const isMobile = window.matchMedia("(max-width: 720px)").matches;
      if (isMobile) {
        document.body.classList.add("lyrics-drawer-open");
        playerPaper?.classList.add("lyrics-drawer-open");
      }
    } else {
      elements.playerLyricsDrawer.hidden = true;
      elements.btnOpenLyrics.classList.remove("is-active");
      elements.btnOpenLyrics.setAttribute("aria-expanded", "false");
      playerPaper?.classList.remove("has-lyrics-open");
      document.body.classList.remove("lyrics-drawer-open");
      playerPaper?.classList.remove("lyrics-drawer-open");
    }
  };

  elements.btnOpenLyrics.addEventListener("click", () => toggleLyrics());

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !elements.playerLyricsDrawer.hidden) {
      toggleLyrics(false);
    }
  });
}

function createTrackCardHtml(track) {
  const alternatives = track.alternatives || [];
  const arcClass = `arc-${track.arc || "prog"}`;
  const altButton = alternatives.length ? `<button class="btn-action-alt" type="button" data-track-id="${escapeHtml(track.id)}" aria-expanded="false" aria-label="Apri ${alternatives.length} alternative per ${escapeHtml(track.title)}"><span>Alt. ${alternatives.length}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>` : "";

  return `
    <article class="track-master-card ${arcClass}" id="card-${escapeHtml(track.id)}" data-id="${escapeHtml(track.id)}">
      <div class="track-master-grid">
        <div class="track-index-column">
          <span class="track-seq-num">${escapeHtml(track.num)}</span>
        </div>
        <div class="track-typography-col">
          ${track.album ? `<div class="track-album-header"><span class="album-prefix">Album</span><span class="album-dot">·</span><span class="track-album-tag">${escapeHtml(track.album)}</span></div>` : ""}
          <div class="track-title-row"><h3 class="track-song-headline"><span class="track-title-text">${escapeHtml(track.title)}</span>${renderNoteButton(track.title, track.note)}</h3></div>
          <div class="track-byline"><span class="track-artist-subline">${escapeHtml(track.artist)}</span>${track.genre ? `<span class="track-genre-badge genre-${escapeHtml(track.genre)}">${escapeHtml(track.genre.toUpperCase())}</span>` : ""}${track.versionLabel ? `<span class="track-version-label">${escapeHtml(track.versionLabel)}</span>` : ""}${altButton}</div>
        </div>
        <div class="track-action-dock">
          <button class="btn-action-play" type="button" data-track-id="${escapeHtml(track.id)}" aria-label="${track.youtubeId ? "Ascolta" : "Cerca"} ${escapeHtml(track.title)}">
            ${track.youtubeId ? '<svg class="track-icon-play" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4v16l13-8z"/></svg>' : '<svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}
            ${track.youtubeId ? '<svg class="track-icon-pause" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h5v14H6zM15 5h5v14h-5z"/></svg>' : ""}
            <span>${track.youtubeId ? "Ascolta" : "Cerca"}</span>
          </button>
        </div>
      </div>
      ${alternatives.length ? `
        <div class="accordion-alt-drawer" id="drawer-${escapeHtml(track.id)}">
          <div class="drawer-inner-wrap"><div class="drawer-alt-list">
            ${alternatives.map((alt, index) => `
              <div class="drawer-alt-row">
                <div class="drawer-alt-meta">
                  ${alt.album ? `<div class="drawer-alt-album"><span class="album-prefix">Album</span><span class="album-dot">·</span><span class="track-album-tag">${escapeHtml(alt.album)}</span></div>` : ""}
                  <div class="drawer-alt-title-row"><strong>${escapeHtml(alt.title)}${renderNoteButton(alt.title, alt.note)}</strong></div>
                  <span class="drawer-alt-artist">${escapeHtml(alt.artist)}</span>${alt.genre ? `<span class="track-genre-badge genre-${escapeHtml(alt.genre)}">${escapeHtml(alt.genre.toUpperCase())}</span>` : ""}
                </div>
                <button class="btn-action-play btn-play-alt" type="button" data-parent-id="${escapeHtml(track.id)}" data-alt-index="${index}" aria-label="${alt.youtubeId ? "Play" : "Cerca"} ${escapeHtml(alt.title)}">
                  ${alt.youtubeId ? '<svg class="track-icon-play" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4v16l13-8z"/></svg>' : '<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}${alt.youtubeId ? '<svg class="track-icon-pause" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h5v14H6zM15 5h5v14h-5z"/></svg>' : ""}<span>${alt.youtubeId ? "Play" : "Cerca"}</span>
                </button>
              </div>`).join("")}
          </div></div>
        </div>` : ""}
    </article>`;
}

function renderArcGroups(tracks) {
  const groups = tracks.reduce((result, track) => {
    const group = result.at(-1);
    if (!group || group.arc !== track.arc) result.push({ arc: track.arc, tracks: [track] });
    else group.tracks.push(track);
    return result;
  }, []);
  return groups.map(group => `
    <section class="track-arc-group arc-block-${escapeHtml(group.arc)}" aria-label="Brani ${escapeHtml(group.tracks[0].num)}–${escapeHtml(group.tracks.at(-1).num)}">
      ${group.tracks.map(createTrackCardHtml).join("")}
    </section>`).join("");
}

function renderAllTrackLists() {
  const lists = [
    [elements.listaUniformList, LISTA_TRACKS, "La Lista", true],
    [elements.honorableMentionsList, HONORABLE_MENTIONS, "Menzioni d’onore", false],
    [elements.progTrackList, PROG_TRACKS, "Prog", false]
  ];

  lists.forEach(([container, tracks, source, groupByArc]) => {
    if (!container) return;
    container.innerHTML = groupByArc ? renderArcGroups(tracks) : tracks.map(createTrackCardHtml).join("");
    bindCardInteractions(container, tracks, source);
  });

  const honCountEl = document.querySelector(".honorable-count");
  if (honCountEl) {
    honCountEl.textContent = `${HONORABLE_MENTIONS.length} brani`;
  }
}

function bindCardInteractions(container, tracks, source) {
  container.querySelectorAll(".btn-action-play:not(.btn-play-alt)").forEach(button => {
    button.addEventListener("click", () => {
      const track = tracks.find(item => item.id === button.dataset.trackId);
      if (track) playQueueSelection(track, tracks, source);
    });
  });

  container.querySelectorAll(".btn-track-note").forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      showNotePopover(btn, btn.dataset.title, btn.dataset.note);
    });
  });

  container.querySelectorAll(".btn-action-alt").forEach(button => {
    button.addEventListener("click", () => {
      const drawer = container.querySelector(`#drawer-${CSS.escape(button.dataset.trackId)}`);
      const open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      button.classList.toggle("open", open);
      drawer?.classList.toggle("open", open);
    });
  });

  container.querySelectorAll(".btn-play-alt").forEach(button => {
    button.addEventListener("click", () => {
      const parent = tracks.find(item => item.id === button.dataset.parentId);
      const alternative = parent?.alternatives?.[Number(button.dataset.altIndex)];
      if (alternative) {
        playQueueSelection({ ...alternative, id: `${parent.id}-alt-${button.dataset.altIndex}`, album: alternative.album || "" }, tracks, source, tracks.indexOf(parent));
      }
    });
  });
}

function queueLabelForSource(source) {
  return source;
}

function playQueueSelection(track, tracks, source, index = tracks.indexOf(track)) {
  setPlaybackQueue(tracks, queueLabelForSource(source), index);
  if (activeVideoTrack?.id === track.id) {
    togglePlayback();
    return;
  }
  loadTrack(track, true);
}

function setupVideoVariants() {
  elements.playerVariantButton?.addEventListener("click", () => {
    const track = activeVideoTrack;
    const variants = track?.youtubeVariants || [];
    if (variants.length < 2) return;

    elements.playerVariantButton.classList.remove("is-animating");
    void elements.playerVariantButton.offsetWidth;
    elements.playerVariantButton.classList.add("is-animating");

    const currentIndex = track.selectedYoutubeVariant || 0;
    const nextIndex = (currentIndex + 1) % variants.length;
    const playing = youtubePlayer?.getPlayerState?.() === window.YT?.PlayerState?.PLAYING;
    loadTrack({ ...track, youtubeId: variants[nextIndex].youtubeId, selectedYoutubeVariant: nextIndex }, playing);
  });

  elements.playerVariantButton?.addEventListener("animationend", () => {
    elements.playerVariantButton.classList.remove("is-animating");
  });
}

function setPlaybackQueue(tracks, label, index = 0) {
  playbackQueue = tracks;
  playbackQueueLabel = label;
  playbackQueueIndex = Math.max(0, Math.min(index, tracks.length - 1));
  updatePlaybackQueueUi();
}

function updatePlaybackQueueUi() {
  if (!playbackQueue.length) return;
  const position = `${String(playbackQueueIndex + 1).padStart(2, "0")} / ${String(playbackQueue.length).padStart(2, "0")}`;
  elements.playerQueuePosition.querySelector(".queue-position-count").textContent = position;
  elements.playerQueuePosition.querySelector(".queue-position-label").textContent = ` · ${playbackQueueLabel}`;

  const shortNum = String(playbackQueueIndex + 1).padStart(2, "0");
  const shortQueueLabel = playbackQueueLabel.replace(/^La\s+/i, "");
  elements.playerQueuePositionMobile.querySelector(".queue-position-count").textContent = shortNum;
  elements.playerQueuePositionMobile.querySelector(".queue-position-label").textContent = ` · ${shortQueueLabel}`;

  setMiniPlayerTitle(activeVideoTrack?.title || playbackQueueLabel);
  [elements.playerPrevious, elements.miniPlayerPrevious].forEach(button => { button.disabled = playbackQueueIndex === 0; });
  [elements.playerNext, elements.miniPlayerNext].forEach(button => { button.disabled = playbackQueueIndex >= playbackQueue.length - 1; });
}

function playQueueTrack(index, autoplay = true) {
  if (index < 0 || index >= playbackQueue.length) return;
  playbackQueueIndex = index;
  updatePlaybackQueueUi();
  loadTrack(playbackQueue[index], autoplay);
}

function skipQueueTrack(direction) {
  playQueueTrack(playbackQueueIndex + direction);
}

function togglePlayback() {
  if (!activeVideoTrack) {
    playQueueTrack(playbackQueueIndex);
    return;
  }
  if (youtubePlayer) {
    if (youtubePlayer.getPlayerState() === window.YT.PlayerState.PLAYING) youtubePlayer.pauseVideo();
    else youtubePlayer.playVideo();
    return;
  }
  const playing = elements.playerToggle.classList.contains("is-playing");
  elements.ytVideoPlayerIframe.contentWindow?.postMessage(JSON.stringify({
    event: "command", func: playing ? "pauseVideo" : "playVideo", args: []
  }), "https://www.youtube.com");
  setMiniPlayerPlaying(!playing);
}

function loadTrack(track, autoplay) {
  if (!track) return;
  const variants = track.youtubeVariants || [];
  const variantIndex = variants.length ? Math.max(0, Math.min(track.selectedYoutubeVariant || 0, variants.length - 1)) : 0;
  const youtubeId = variants[variantIndex]?.youtubeId || track.youtubeId;
  track = { ...track, youtubeId, selectedYoutubeVariant: variantIndex };
  activeVideoTrack = track.youtubeId ? track : null;
  if (elements.playerVariantButton) {
    const nextVariant = variants.length > 1 ? variants[(variantIndex + 1) % variants.length] : null;
    elements.playerVariantButton.hidden = !nextVariant;
    if (nextVariant) {
      const getShortLabel = (label = "") => {
        if (/album/i.test(label)) return "Album";
        if (/live/i.test(label)) return "Live";
        if (/session/i.test(label)) return "Session";
        return label.length > 7 ? label.slice(0, 6) + "…" : label;
      };

      if (variants.length === 2) {
        const v0Short = getShortLabel(variants[0].label || 'V1');
        const v1Short = getShortLabel(variants[1].label || 'V2');
        elements.playerVariantButton.innerHTML = `
          <span class="variant-tab ${variantIndex === 0 ? 'is-active' : ''}">
            <span class="tab-label-full">${escapeHtml(variants[0].label || 'Versione 1')}</span>
            <span class="tab-label-short">${escapeHtml(v0Short)}</span>
          </span>
          <span class="variant-swap-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 5h10M10 2.5 13 5 10 7.5M13 11H3M6 8.5 3 11l3 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="variant-tab ${variantIndex === 1 ? 'is-active' : ''}">
            <span class="tab-label-full">${escapeHtml(variants[1].label || 'Versione 2')}</span>
            <span class="tab-label-short">${escapeHtml(v1Short)}</span>
          </span>`;
      } else {
        const currLabel = variants[variantIndex].label || `Video ${variantIndex + 1}`;
        const nextLabel = nextVariant.label || `Video ${(variantIndex + 1) % variants.length + 1}`;
        elements.playerVariantButton.innerHTML = `
          <span class="variant-tab is-active">
            <span class="tab-label-full">${escapeHtml(currLabel)}</span>
            <span class="tab-label-short">${escapeHtml(getShortLabel(currLabel))}</span>
          </span>
          <span class="variant-swap-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 5h10M10 2.5 13 5 10 7.5M13 11H3M6 8.5 3 11l3 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="variant-tab">
            <span class="tab-label-full">${escapeHtml(nextLabel)}</span>
            <span class="tab-label-short">${escapeHtml(getShortLabel(nextLabel))}</span>
          </span>`;
      }
      elements.playerVariantButton.setAttribute("aria-label", `Passa a ${nextVariant.label || 'altra versione'}`);
      elements.playerVariantButton.title = `Passa a ${nextVariant.label || 'altra versione'}`;
    }
  }
  if (elements.btnOpenLyrics) {
    const baseId = track.id;
    const lyrics = (typeof LYRICS_DATA !== "undefined" && LYRICS_DATA[baseId]) || "";
    const hasLyrics = Boolean(lyrics);
    elements.btnOpenLyrics.hidden = !hasLyrics;
    if (!hasLyrics && !elements.playerLyricsDrawer.hidden) {
      elements.playerLyricsDrawer.hidden = true;
      elements.btnOpenLyrics.classList.remove("is-active");
      elements.btnOpenLyrics.setAttribute("aria-expanded", "false");
      document.body.classList.remove("lyrics-drawer-open");
      document.querySelector(".player-paper")?.classList.remove("lyrics-drawer-open");
    } else if (hasLyrics && !elements.playerLyricsDrawer.hidden) {
      renderActiveLyrics();
    }
  }
  elements.playerTrackTitle.textContent = track.title;
  elements.playerTrackArtist.textContent = track.artist;
  setMiniPlayerTitle(track.title);
  elements.miniPlayerArtist.textContent = track.artist;
  if (track.youtubeId) {
    elements.miniPlayerThumbnail.style.backgroundImage = `url("https://i.ytimg.com/vi/${encodeURIComponent(track.youtubeId)}/mqdefault.jpg")`;
    elements.miniPlayerThumbnail.hidden = false;
  } else {
    elements.miniPlayerThumbnail.style.backgroundImage = "none";
    elements.miniPlayerThumbnail.hidden = true;
  }
  elements.miniPlayerCurrentTime.textContent = "0:00";
  elements.miniPlayerDuration.textContent = "0:00";
  elements.miniPlayerProgress.style.width = "0%";
  updatePlaybackQueueUi();
  updateMiniPlayerVisibility();
  setMiniPlayerPlaying(false);

  document.querySelectorAll(".track-master-card").forEach(card => {
    const isCurrent = track.id === card.dataset.id || track.id.startsWith(`${card.dataset.id}-alt-`);
    card.classList.toggle("active-stream", isCurrent);
    card.classList.toggle("is-playing", isCurrent && Boolean(autoplay));
  });

  if (!track.youtubeId) {
    youtubePlayer?.stopVideo();
    pendingYoutubeTrack = null;
    elements.ytVideoPlayerIframe.removeAttribute("src");
    elements.ytVideoPlayerIframe.hidden = true;
    elements.playerEmptyState.hidden = false;
    elements.playerEmptyMessage.textContent = "Qui manca un collegamento video verificato.";
    elements.playerSearchLink.href = youtubeSearchUrl(track);
    elements.playerSearchLink.hidden = false;
    elements.btnDirectYt.hidden = true;
    return;
  }

  if (window.location.protocol === "file:") {
    youtubePlayer?.stopVideo();
    activeVideoTrack = null;
    pendingYoutubeTrack = null;
    updateMiniPlayerVisibility();
    elements.ytVideoPlayerIframe.removeAttribute("src");
    elements.ytVideoPlayerIframe.hidden = true;
    elements.playerEmptyState.hidden = false;
    elements.playerEmptyMessage.textContent = "Per riprodurre il video, apri il sito da un indirizzo http o https (come GitHub Pages).";
    elements.playerSearchLink.hidden = true;
    elements.btnDirectYt.href = `https://www.youtube.com/watch?v=${encodeURIComponent(track.youtubeId)}`;
    elements.btnDirectYt.hidden = false;
    return;
  }

  elements.playerSearchLink.hidden = true;
  elements.playerEmptyState.hidden = true;
  elements.ytVideoPlayerIframe.hidden = false;
  elements.btnDirectYt.href = `https://www.youtube.com/watch?v=${encodeURIComponent(track.youtubeId)}`;
  elements.btnDirectYt.hidden = false;
  pendingYoutubeTrack = { track, autoplay };
  if (youtubePlayerReady) {
    loadPendingYoutubeTrack();
  } else {
    const embedUrl = new URL(`https://www.youtube.com/embed/${encodeURIComponent(track.youtubeId)}`);
    const embedParams = new URLSearchParams({ autoplay: autoplay ? "1" : "0", playsinline: "1", rel: "0", enablejsapi: "1" });
    if (window.location.origin !== "null") embedParams.set("origin", window.location.origin);
    embedUrl.search = embedParams.toString();
    elements.ytVideoPlayerIframe.src = embedUrl.toString();
    if (autoplay) setMiniPlayerPlaying(true);
    ensureYouTubeApi();
  }
}

function ensureYouTubeApi() {
  if (window.YT?.Player) {
    if (youtubePlayer) loadPendingYoutubeTrack();
    else initializeYouTubePlayer();
    return;
  }
  if (youtubeApiLoading) return;
  youtubeApiLoading = true;
  window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  script.async = true;
  document.head.append(script);
}

function initializeYouTubePlayer() {
  if (!pendingYoutubeTrack || !window.YT?.Player) return;
  const { autoplay } = pendingYoutubeTrack;
  const playerVars = { playsinline: 1, rel: 0, enablejsapi: 1 };
  if (window.location.origin !== "null") playerVars.origin = window.location.origin;
  youtubePlayer = new window.YT.Player(elements.ytVideoPlayerIframe, {
    playerVars,
    events: {
      onReady: event => {
        youtubePlayerReady = true;
        const queued = pendingYoutubeTrack;
        if (queued) {
          const currentUrl = event.target.getVideoUrl?.() || "";
          const currentId = new URL(currentUrl, window.location.origin).searchParams.get("v");
          if (currentId !== queued.track.youtubeId) event.target.loadVideoById(queued.track.youtubeId);
          if (!queued.autoplay) event.target.pauseVideo();
        }
      },
      onStateChange: event => {
        setMiniPlayerPlaying(event.data === window.YT.PlayerState.PLAYING);
        if (event.data === window.YT.PlayerState.PLAYING) startPlaybackClock();
        else stopPlaybackClock();
      },
      onError: event => {
        const message = event.data === 153
          ? "YouTube richiede un indirizzo web. Apri il sito con http o https, non come file locale."
          : event.data === 101 || event.data === 150
            ? "Questo video non può essere riprodotto nella pagina. Puoi aprirlo su YouTube."
            : "YouTube non riesce a riprodurre questo collegamento.";
        activeVideoTrack = null;
        updateMiniPlayerVisibility();
        elements.ytVideoPlayerIframe.hidden = true;
        elements.playerEmptyState.hidden = false;
        elements.playerEmptyMessage.textContent = message;
        setMiniPlayerPlaying(false);
      }
    }
  });
  if (!autoplay) setMiniPlayerPlaying(false);
}

function loadPendingYoutubeTrack() {
  if (!youtubePlayerReady || !youtubePlayer || !pendingYoutubeTrack) return;
  const { track, autoplay } = pendingYoutubeTrack;
  youtubePlayer.loadVideoById(track.youtubeId);
  if (!autoplay) youtubePlayer.pauseVideo();
}

function setupMobileMiniPlayer() {
  const playerPaper = document.querySelector(".player-paper");
  if (!playerPaper) return;
  const scrollTopBtn = document.getElementById("miniPlayerScrollTop");
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  elements.miniPlayerExpand.addEventListener("click", () => {
    elements.listeningRoom.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  [elements.playerPrevious, elements.miniPlayerPrevious].forEach(button => button.addEventListener("click", () => skipQueueTrack(-1)));
  [elements.playerNext, elements.miniPlayerNext].forEach(button => button.addEventListener("click", () => skipQueueTrack(1)));
  [elements.playerToggle, elements.miniPlayerToggle].forEach(button => button.addEventListener("click", togglePlayback));
  window.addEventListener("scroll", updateMiniPlayerVisibility, { passive: true });
  window.addEventListener("resize", () => {
    updateMiniPlayerVisibility();
    updateMiniPlayerTitleMarquee();
  });
  document.fonts?.ready?.then(updateMiniPlayerTitleMarquee);
  updateMiniPlayerVisibility();
}

function setupMobileWelcome() {
  const dialog = document.getElementById("mobileWelcomeDialog");
  const copy = document.getElementById("mobileWelcomeCopy");
  const letter = document.querySelector(".intro-letter");
  const hint = document.getElementById("desktopHint");
  const reopenList = document.getElementById("reopenWelcome");
  const reopenProg = document.getElementById("reopenProgNote");
  const continueButton = document.getElementById("continueWelcome");
  if (!dialog || !copy || !letter || !hint || !reopenList || !reopenProg || !continueButton) return;
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  const isMobile = () => mobileQuery.matches;
  let currentKind = "lista";
  let progLetterSeen = false;
  let listLetterSeen = false;
  let closingAnimation = null;
  const letters = {
    lista: {
      title: "Ciao Ari,",
      subtitle: "ho provato a tenerla corta, davvero",
      copy: "<p>Questi sono brani che mi fanno impazzire e spero che ti piaceranno tanto quanto a me. Magari ce n’è uno che già conosci o uno nuovo che ti resta addosso; oppure un album che ti incuriosisce abbastanza da volerlo aggiungere alla tua collezione di vinili o da raccontare in un video.</p><p>Volevo farcene entrare dieci, ma è stato impossibile: ne ho lasciate <strong>tredici</strong>, qualche alternativa e, in fondo, le <strong>menzioni d’onore</strong>. Se hai voglia, meritano tutte.</p>",
      hint: true,
      reopen: reopenList
    },
    prog: {
      title: "Un appunto sul prog",
      subtitle: "un piccolo assaggio del genere",
      copy: "<p>Mi avevi detto che ti incuriosiva il prog: qui trovi alcune chicche tra le più conosciute. È solo un assaggio: dietro ogni brano c’è un album da esplorare e un mondo di artisti, dagli Yes ai Gentle Giant. Spero che questo viaggio ti piaccia!</p>",
      hint: false,
      reopen: reopenProg
    }
  };
  const openLetter = kind => {
    if (!isMobile() || dialog.open) return;
    currentKind = kind;
    dialog.classList.remove("is-leaving");
    const selected = letters[kind];
    document.getElementById("welcomeTitle").textContent = selected.title;
    const subtitle = dialog.querySelector(".welcome-subtitle");
    if (subtitle) {
      subtitle.textContent = selected.subtitle || "";
    }
    copy.innerHTML = selected.copy;
    hint.hidden = !selected.hint;
    selected.reopen.hidden = true;
    dialog.showModal();
  };
  showMobileLetter = openLetter;
  canShowProgLetter = () => isMobile() && !progLetterSeen;

  const handleReopenClick = kind => {
    if (isMobile()) {
      openLetter(kind);
    } else {
      const targetCard = kind === "prog"
        ? document.getElementById("introLetterProg")
        : document.getElementById("introLetterLista");
      const reopenBtn = kind === "prog" ? reopenProg : reopenList;
      if (targetCard) {
        targetCard.classList.remove("is-collapsed");
        reopenBtn.classList.remove("is-visible-desktop");
        targetCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  document.querySelectorAll(".btn-letter-dismiss").forEach(btn => {
    btn.addEventListener("click", event => {
      const letterCard = event.currentTarget.closest(".intro-letter");
      if (!letterCard) return;
      letterCard.classList.add("is-collapsed");
      const isProg = letterCard.id === "introLetterProg";
      const reopenBtn = isProg ? reopenProg : reopenList;
      reopenBtn.classList.add("is-visible-desktop");
    });
  });

  reopenList.addEventListener("click", () => handleReopenClick("lista"));
  reopenProg.addEventListener("click", () => handleReopenClick("prog"));
  dialog.addEventListener("close", () => {
    closingAnimation?.cancel();
    closingAnimation = null;
    dialog.classList.remove("is-leaving");
    letters[currentKind].reopen.hidden = false;
    if (currentKind === "prog") progLetterSeen = true;
    else listLetterSeen = true;
  });
  continueButton.addEventListener("click", async () => {
    const trigger = letters[currentKind].reopen;
    trigger.hidden = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !dialog.animate) {
      trigger.classList.remove("letter-reopen-pop");
      void trigger.offsetWidth;
      trigger.classList.add("letter-reopen-pop");
      dialog.close();
      return;
    }

    dialog.classList.add("is-leaving");

    const dialogRect = dialog.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    let deltaX = 0;
    let deltaY = 24;

    if (triggerRect.width > 0 && triggerRect.height > 0) {
      const dialogCenterX = dialogRect.left + dialogRect.width / 2;
      const dialogCenterY = dialogRect.top + dialogRect.height / 2;
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;
      deltaX = triggerCenterX - dialogCenterX;
      deltaY = triggerCenterY - dialogCenterY;
    }

    closingAnimation = dialog.animate([
      { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
      { transform: `translate(${deltaX * 0.38}px, ${deltaY * 0.28}px) scale(0.65, 0.4) rotate(-2deg)`, opacity: 0.88, offset: 0.5 },
      { transform: `translate(${deltaX * 0.86}px, ${deltaY * 0.86}px) scale(0.18, 0.12) rotate(1deg)`, opacity: 0.55, offset: 0.82 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.04, 0.04) rotate(0deg)`, opacity: 0 }
    ], { duration: 440, easing: "cubic-bezier(0.2, 0.85, 0.35, 1)", fill: "forwards" });

    try { await closingAnimation.finished; } catch { /* dialog closed by Escape */ }
    if (dialog.open) dialog.close();
    dialog.classList.remove("is-leaving");

    trigger.classList.remove("letter-reopen-pop");
    void trigger.offsetWidth;
    trigger.classList.add("letter-reopen-pop");
  });
  const syncMobileLetter = () => {
    if (!isMobile() && dialog.open) dialog.close();
    else if (isMobile() && !listLetterSeen && !dialog.open) openLetter("lista");
  };
  mobileQuery.addEventListener("change", syncMobileLetter);
  window.addEventListener("resize", syncMobileLetter, { passive: true });
  if (isMobile()) openLetter("lista");
  return { shouldShowProgLetter: () => isMobile() && !progLetterSeen };
}

function updateMiniPlayerVisibility() {
  const playerPaper = document.querySelector(".player-paper");
  if (!playerPaper || !elements.mobileMiniPlayer) return;
  const rect = playerPaper.getBoundingClientRect();
  const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  listeningRoomVisible = rect.bottom > headerHeight && rect.top < window.innerHeight;
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  const shouldShow = Boolean(activeVideoTrack && isMobile && !listeningRoomVisible);
  const wasActive = elements.mobileMiniPlayer.classList.contains("is-active");
  elements.mobileMiniPlayer.classList.toggle("is-active", shouldShow);
  elements.mobileMiniPlayer.hidden = !isMobile;
  if (!wasActive && shouldShow) updateMiniPlayerTitleMarquee();
}

function setMiniPlayerPlaying(playing) {
  [elements.miniPlayerToggle, elements.playerToggle].forEach(button => {
    button?.classList.toggle("is-playing", playing);
    button?.setAttribute("aria-label", playing ? "Metti in pausa" : "Riproduci");
  });
  document.querySelectorAll(".btn-action-play").forEach(button => {
    const isCurrent = activeVideoTrack && (button.dataset.trackId === activeVideoTrack.id ||
      (activeVideoTrack.id.startsWith(`${button.dataset.parentId}-alt-`) && activeVideoTrack.id.endsWith(`-alt-${button.dataset.altIndex}`)));
    const isPlaying = Boolean(isCurrent && playing);
    button.classList.toggle("is-playing", isPlaying);
    if (isCurrent) button.setAttribute("aria-label", `${isPlaying ? "In riproduzione" : "Riproduci"} ${activeVideoTrack.title}`);
  });
  document.querySelectorAll(".track-master-card").forEach(card => {
    const isCurrent = Boolean(activeVideoTrack && (card.dataset.id === activeVideoTrack.id || activeVideoTrack.id.startsWith(`${card.dataset.id}-alt-`)));
    card.classList.toggle("is-playing", isCurrent && playing);
  });
}

function setMiniPlayerTitle(title) {
  elements.miniPlayerTitle.textContent = title;
  elements.miniPlayerTitleRepeat.textContent = title;
  updateMiniPlayerTitleMarquee();
}

function updateMiniPlayerTitleMarquee() {
  const titleWrap = elements.miniPlayerTitle.closest(".mini-player-title");
  requestAnimationFrame(() => {
    if (!titleWrap) return;
    if (!titleWrap.clientWidth) return;
    const title = elements.miniPlayerTitle;
    const style = getComputedStyle(title);
    const canvas = updateMiniPlayerTitleMarquee.canvas ||= document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = style.font;
    const textWidth = context.measureText(title.textContent).width;
    titleWrap.classList.toggle("is-marquee", textWidth > titleWrap.clientWidth + 4);
  });
}

function startPlaybackClock() {
  stopPlaybackClock();
  playbackClock = window.setInterval(() => {
    if (!youtubePlayer || !activeVideoTrack) return;
    const current = youtubePlayer.getCurrentTime?.() || 0;
    const duration = youtubePlayer.getDuration?.() || 0;
    elements.miniPlayerCurrentTime.textContent = formatPlaybackTime(current);
    elements.miniPlayerDuration.textContent = formatPlaybackTime(duration);
    elements.miniPlayerProgress.style.width = `${duration ? Math.min(100, current / duration * 100) : 0}%`;
  }, 500);
}

function stopPlaybackClock() {
  if (playbackClock) window.clearInterval(playbackClock);
  playbackClock = null;
}

function formatPlaybackTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

function youtubeSearchUrl(track) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${track.artist} ${track.title}`)}`;
}


function setupCollectionNavigation() {
  const tracksForTarget = target => ({
    panelLista: [LISTA_TRACKS, "La Lista"],
    panelProg: [PROG_TRACKS, "Prog"]
  })[target];

  elements.collectionTabs.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;
      if (target === "panelProg" && canShowProgLetter()) showMobileLetter("prog");
      if (!activeVideoTrack) {
        const queue = tracksForTarget(target);
        if (queue) setPlaybackQueue(queue[0], queue[1], 0);
      }
      elements.collectionTabs.forEach(tab => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      elements.deckPanels.forEach(panel => {
        const active = panel.id === target;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
        if (active) {
          const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
          const panelTop = panel.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, panelTop - headerHeight - 12),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
        }
      });
    });
  });
}

function setupExportTools() {
  const getFormattedListaText = () => {
    let out = "LA LISTA — 13 BRANI SELEZIONATI\n\n";
    LISTA_TRACKS.forEach(track => {
      out += `${track.num}. ${track.artist} — ${track.title} [${track.album}]\n`;
      out += `   YouTube: ${track.youtubeId ? `https://www.youtube.com/watch?v=${track.youtubeId}` : youtubeSearchUrl(track)}\n`;
      (track.alternatives || []).forEach(alt => {
        out += `   └─ Alternativa: ${alt.artist} — ${alt.title}\n`;
      });
    });
    return out;
  };

  elements.btnCopyText?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(getFormattedListaText());
      showToast("Scaletta copiata.");
    } catch {
      showToast("Non riesco ad accedere agli appunti da questa pagina.");
    }
  });

  elements.btnDownloadText?.addEventListener("click", () => {
    const file = new Blob([getFormattedListaText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "la-lista-13-brani.txt";
    link.click();
    URL.revokeObjectURL(url);
  });
}

let toastTimer;
function showToast(message) {
  elements.toastBubble.textContent = message;
  elements.toastBubble.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toastBubble.classList.remove("show"), 2400);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
