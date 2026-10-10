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
  cinemaPrevBadge: document.getElementById("cinemaPrevBadge"),
  cinemaPrevTag: document.getElementById("cinemaPrevTag"),
  cinemaPrevTitle: document.getElementById("cinemaPrevTitle"),
  cinemaNextBadge: document.getElementById("cinemaNextBadge"),
  cinemaNextTag: document.getElementById("cinemaNextTag"),
  cinemaNextTitle: document.getElementById("cinemaNextTitle"),
  playerNextTooltip: document.getElementById("playerNextTooltip"),
  playerQueuePosition: document.getElementById("playerQueuePosition"),
  playerQueuePositionMobile: document.getElementById("playerQueuePositionMobile"),
  listeningRoom: document.querySelector(".listening-room"),
  btnDirectYt: document.getElementById("btnDirectYt"),
  btnOpenLyrics: document.getElementById("btnOpenLyrics"),
  playerLyricsDrawer: document.getElementById("playerLyricsDrawer"),
  lyricsDrawerBody: document.getElementById("lyricsDrawerBody"),
  cinemaLyricsResizer: document.getElementById("cinemaLyricsResizer"),
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
  toastBubble: document.getElementById("toastBubble"),
  btnCinemaMode: document.getElementById("btnCinemaMode"),
  cinemaHeaderBar: document.getElementById("cinemaHeaderBar"),
  cinemaBadgeText: document.getElementById("cinemaBadgeText"),
  btnCinemaToggleLyrics: document.getElementById("btnCinemaToggleLyrics"),
  cinemaToggleLyricsLabel: document.getElementById("cinemaToggleLyricsLabel"),
  btnCinemaClose: document.getElementById("btnCinemaClose"),
  cinemaTrackTitle: document.getElementById("cinemaTrackTitle"),
  cinemaTrackArtist: document.getElementById("cinemaTrackArtist"),
  mobileLyricsCloseBtn: document.getElementById("mobileLyricsCloseBtn"),
  mobileLyricsTrackTitle: document.getElementById("mobileLyricsTrackTitle")
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
  const restored = restorePlaybackSession();
  if (!restored) {
    setPlaybackQueue(LISTA_TRACKS, "La Lista", 0);
  }
  setupCollectionNavigation();
  setupExportTools();
  setupMobileMiniPlayer();
  setupVideoVariants();
  setupMobileWelcome();
  setupNotePopoverDismissal();
  setupLyricsDrawer();
  setupCinemaMode();
  setupBackgroundMediaSession();
  setupImageLightbox();
  setupHonorableElasticAccordion();
  setupKeyboardShortcuts();

  window.addEventListener("beforeunload", () => savePlaybackSession());
  window.addEventListener("pagehide", () => savePlaybackSession());
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
  popBody.scrollTop = 0;
  popover.classList.remove("is-closing");
  popover.hidden = false;
  popover.classList.add("is-visible");

  const rect = button.getBoundingClientRect();
  const isLargeNote = note.includes("popover-gallery") || note.includes("popover-scorn-feature");
  popover.classList.toggle("is-large-note", isLargeNote);

  const backdrop = document.getElementById("noteGlobalBackdrop");
  if (backdrop) {
    if (isLargeNote && window.innerWidth <= 640) {
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add("is-visible"));
    } else {
      backdrop.hidden = true;
      backdrop.classList.remove("is-visible");
    }
  }

  const maxW = isLargeNote ? 480 : 310;
  const popoverWidth = Math.min(maxW, window.innerWidth - 24);
  popover.style.width = `${popoverWidth}px`;

  let left = rect.left;
  if (left + popoverWidth > window.innerWidth - 12) {
    left = window.innerWidth - popoverWidth - 12;
  }
  if (left < 12) left = 12;

  const popoverHeight = popover.offsetHeight || 90;
  let top = rect.bottom + 6;
  let isAbove = false;
  if (top + popoverHeight > window.innerHeight - 12 && rect.top - popoverHeight - 6 > 12) {
    top = rect.top - popoverHeight - 6;
    isAbove = true;
  }
  top = Math.max(12, Math.min(top, window.innerHeight - popoverHeight - 12));

  const originX = Math.max(10, Math.min(popoverWidth - 10, (rect.left + rect.width / 2) - left));
  const originY = isAbove ? popoverHeight : 0;
  popover.style.transform = "";
  popover.style.transformOrigin = `${originX}px ${originY}px`;
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function hideNotePopover() {
  const popover = document.getElementById("noteGlobalPopover");
  if (!popover || popover.hidden || popover.classList.contains("is-closing")) return;
  popover.classList.remove("is-visible");
  popover.classList.add("is-closing");

  const backdrop = document.getElementById("noteGlobalBackdrop");
  if (backdrop && !backdrop.hidden) {
    backdrop.classList.remove("is-visible");
    setTimeout(() => { backdrop.hidden = true; }, 160);
  }

  popoverClosingTimer = setTimeout(() => {
    popover.hidden = true;
    popover.classList.remove("is-closing");
    popover.classList.remove("is-large-note");
    currentNoteTrigger = null;
    popoverClosingTimer = null;
  }, 160);
}

function setupNotePopoverDismissal() {
  const closeBtn = document.getElementById("notePopoverClose");
  const popBody = document.getElementById("notePopoverBody");
  const backdrop = document.getElementById("noteGlobalBackdrop");
  closeBtn?.addEventListener("click", hideNotePopover);
  backdrop?.addEventListener("click", hideNotePopover);
  popBody?.addEventListener("click", event => {
    const inlineBtn = event.target.closest(".btn-inline-popover");
    if (inlineBtn) {
      event.stopPropagation();
      showNotePopover(inlineBtn, inlineBtn.dataset.title, inlineBtn.dataset.note);
      return;
    }
    const expandBtn = event.target.closest(".btn-image-expand");
    const galleryItem = event.target.closest(".popover-gallery-item");
    const gearImg = event.target.closest(".popover-gear-img");
    if (expandBtn || galleryItem || gearImg) {
      event.stopPropagation();
      const target = galleryItem || gearImg?.closest(".popover-gallery-item") || gearImg;
      const src = target?.dataset?.zoomSrc || target?.querySelector?.("img")?.src || gearImg?.src;
      const caption = target?.dataset?.zoomCaption || target?.querySelector?.(".popover-gear-caption")?.textContent || gearImg?.alt || "";
      if (src) {
        openImageLightbox(src, caption);
      }
      return;
    }
  });
  document.addEventListener("click", event => {
    const modal = document.getElementById("imageLightboxModal");
    if (modal && !modal.hidden) return;
    if (currentNoteTrigger && !event.target.closest("#noteGlobalPopover") && !event.target.closest(".btn-track-note") && !event.target.closest(".btn-inline-popover") && !event.target.closest("#imageLightboxModal")) {
      hideNotePopover();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const modal = document.getElementById("imageLightboxModal");
      if (modal && !modal.hidden) {
        closeImageLightbox();
        return;
      }
      hideNotePopover();
    }
  });
  window.addEventListener("scroll", () => {
    if (currentNoteTrigger && Math.abs(window.scrollY - openPopoverScrollY) > 90) {
      hideNotePopover();
    }
  }, { passive: true });
  window.addEventListener("resize", hideNotePopover, { passive: true });
}

function openImageLightbox(src, caption) {
  const modal = document.getElementById("imageLightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (!modal || !img) return;

  img.src = src;
  img.alt = caption || "Immagine ingrandita";
  if (cap) {
    cap.textContent = caption || "";
    cap.hidden = !caption;
  }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeImageLightbox() {
  const modal = document.getElementById("imageLightboxModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function setupImageLightbox() {
  const modal = document.getElementById("imageLightboxModal");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("lightboxCloseBtn");

  backdrop?.addEventListener("click", closeImageLightbox);
  closeBtn?.addEventListener("click", closeImageLightbox);

  document.addEventListener("click", event => {
    const expandBtn = event.target.closest(".btn-image-expand");
    const galleryItem = event.target.closest(".popover-gallery-item");
    if (expandBtn || galleryItem) {
      if (event.target.closest("#noteGlobalPopover")) return; // already handled by popBody
      event.stopPropagation();
      const target = galleryItem || expandBtn.closest(".popover-gallery-item");
      const src = target?.dataset?.zoomSrc || target?.querySelector?.("img")?.src;
      const caption = target?.dataset?.zoomCaption || target?.querySelector?.(".popover-gear-caption")?.textContent || "";
      if (src) {
        openImageLightbox(src, caption);
      }
    }
  });
}

function setLyricsContent(container, lyricsText) {
  if (!container) return;
  const bottomSpacerHtml = '<div class="lyrics-bottom-spacer" style="height: 90px; min-height: 90px; width: 100%; pointer-events: none;" aria-hidden="true"></div>';
  if (lyricsText.includes("<div") || lyricsText.includes("<span") || lyricsText.includes("<p")) {
    container.innerHTML = lyricsText + bottomSpacerHtml;
  } else {
    container.innerHTML = `<div class="lyrics-text-flow">${escapeHtml(lyricsText)}</div>` + bottomSpacerHtml;
  }
}

function renderActiveLyrics() {
  if (!activeVideoTrack || !elements.lyricsDrawerBody) return;
  const trackId = activeVideoTrack.id;
  const lyrics = (typeof LYRICS_DATA !== "undefined" && (LYRICS_DATA[trackId] || LYRICS_DATA[trackId.split('-alt-')[0]])) || "";
  setLyricsContent(elements.lyricsDrawerBody, lyrics);
  elements.lyricsDrawerBody.scrollTop = 0;
}

function setupLyricsDrawer() {
  if (!elements.btnOpenLyrics || !elements.playerLyricsDrawer) return;

  const playerPaper = document.querySelector(".player-paper");

  const toggleLyrics = (force) => {
    if (!activeVideoTrack) return;
    const trackId = activeVideoTrack.id;
    const lyrics = (typeof LYRICS_DATA !== "undefined" && (LYRICS_DATA[trackId] || LYRICS_DATA[trackId.split('-alt-')[0]])) || "";
    if (!lyrics) return;

    const isOpen = typeof force === "boolean" ? force : elements.playerLyricsDrawer.hidden;

    if (isOpen) {
      renderActiveLyrics();
      elements.playerLyricsDrawer.hidden = false;
      elements.lyricsDrawerBody.scrollTop = 0;
      elements.btnOpenLyrics.classList.add("is-active");
      elements.btnOpenLyrics.setAttribute("aria-expanded", "true");
      playerPaper?.classList.remove("is-closing-lyrics");
      playerPaper?.classList.add("has-lyrics-open");
      if (elements.mobileLyricsCloseBtn) {
        elements.mobileLyricsCloseBtn.hidden = false;
      }
      if (window.innerWidth <= 720) {
        document.body.classList.add("mobile-lyrics-open");
      }
      updateCaptionMarquee();
    } else {
      if (playerPaper?.classList.contains("has-lyrics-open") && window.innerWidth <= 720) {
        playerPaper.classList.add("is-closing-lyrics");
        setTimeout(() => {
          playerPaper.classList.remove("is-closing-lyrics", "has-lyrics-open");
          elements.playerLyricsDrawer.hidden = true;
          elements.btnOpenLyrics.classList.remove("is-active");
          elements.btnOpenLyrics.setAttribute("aria-expanded", "false");
          if (elements.mobileLyricsCloseBtn) {
            elements.mobileLyricsCloseBtn.hidden = true;
          }
          document.body.classList.remove("mobile-lyrics-open");
          updateCaptionMarquee();
        }, 160);
        return;
      }
      elements.playerLyricsDrawer.hidden = true;
      elements.btnOpenLyrics.classList.remove("is-active");
      elements.btnOpenLyrics.setAttribute("aria-expanded", "false");
      playerPaper?.classList.remove("has-lyrics-open");
      if (elements.mobileLyricsCloseBtn) {
        elements.mobileLyricsCloseBtn.hidden = true;
      }
      document.body.classList.remove("mobile-lyrics-open");
      updateCaptionMarquee();
    }
  };

  elements.btnOpenLyrics.addEventListener("click", () => toggleLyrics());
  elements.mobileLyricsCloseBtn?.addEventListener("click", () => toggleLyrics(false));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      document.body.classList.remove("mobile-lyrics-open");
    } else if (!elements.playerLyricsDrawer.hidden && !document.body.classList.contains("cinema-mode-active")) {
      document.body.classList.add("mobile-lyrics-open");
    }
    updateCaptionMarquee();
  }, { passive: true });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !elements.playerLyricsDrawer.hidden && !document.body.classList.contains("cinema-mode-active")) {
      toggleLyrics(false);
    }
  });
}

function setupHonorableElasticAccordion() {
  const disclosure = document.querySelector(".honorable-disclosure");
  if (!disclosure) return;
  const summary = disclosure.querySelector("summary");
  const content = disclosure.querySelector(".honorable-list");
  if (!summary || !content) return;

  let isAnimating = false;

  summary.addEventListener("click", event => {
    event.preventDefault();
    if (isAnimating) return;

    if (!disclosure.open) {
      isAnimating = true;
      disclosure.open = true;
      const startHeight = summary.offsetHeight;
      const contentHeight = content.scrollHeight || content.offsetHeight;
      const targetHeight = startHeight + contentHeight;

      disclosure.style.overflow = "hidden";
      disclosure.style.height = `${startHeight}px`;

      const anim = disclosure.animate([
        { height: `${startHeight}px`, transform: "scale(0.995)" },
        { height: `${targetHeight + 12}px`, transform: "scale(1.003)", offset: 0.72 },
        { height: `${targetHeight}px`, transform: "scale(1)" }
      ], {
        duration: 480,
        easing: "cubic-bezier(0.34, 1.35, 0.64, 1)",
        fill: "forwards"
      });

      content.animate([
        { opacity: 0, transform: "translateY(-14px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], {
        duration: 360,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)"
      });

      anim.onfinish = () => {
        disclosure.style.height = "";
        disclosure.style.overflow = "";
        isAnimating = false;
      };
    } else {
      isAnimating = true;
      const startHeight = disclosure.offsetHeight;
      const targetHeight = summary.offsetHeight;

      disclosure.style.overflow = "hidden";
      disclosure.style.height = `${startHeight}px`;

      const anim = disclosure.animate([
        { height: `${startHeight}px`, transform: "scale(1)" },
        { height: `${targetHeight}px`, transform: "scale(0.996)" }
      ], {
        duration: 320,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards"
      });

      content.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 200,
        easing: "ease-out"
      });

      anim.onfinish = () => {
        disclosure.open = false;
        disclosure.style.height = "";
        disclosure.style.overflow = "";
        isAnimating = false;
      };
    }
  });
}

function setupCinemaMode() {
  if (!elements.btnCinemaMode || !elements.cinemaHeaderBar) return;
  const playerPaper = document.querySelector(".player-paper");

  const enterCinemaMode = () => {
    if (!activeVideoTrack) return;
    document.body.classList.add("cinema-mode-active");
    playerPaper?.classList.add("cinema-mode-active");
    playerPaper?.classList.remove("cinema-lyrics-hidden");
    elements.cinemaHeaderBar.hidden = false;

    if (elements.cinemaTrackTitle) elements.cinemaTrackTitle.textContent = activeVideoTrack.title;
    if (elements.cinemaTrackArtist) elements.cinemaTrackArtist.textContent = activeVideoTrack.artist;

    // Assicura che i testi siano renderizzati e visibili
    renderActiveLyrics();
    elements.playerLyricsDrawer.hidden = false;
    elements.btnOpenLyrics?.classList.add("is-active");
    elements.btnOpenLyrics?.setAttribute("aria-expanded", "true");
    playerPaper?.classList.add("has-lyrics-open");

    if (elements.cinemaToggleLyricsLabel) elements.cinemaToggleLyricsLabel.textContent = "Nascondi testo";
    elements.btnCinemaToggleLyrics?.classList.remove("is-lyrics-off");
    updatePlaybackQueueUi();
  };

  const exitCinemaMode = () => {
    document.body.classList.remove("cinema-mode-active");
    playerPaper?.classList.remove("cinema-mode-active", "cinema-lyrics-hidden");
    elements.cinemaHeaderBar.hidden = true;
    updateCaptionMarquee();
    updatePlaybackQueueUi();
  };

  const toggleCinemaLyrics = () => {
    if (!playerPaper) return;
    const isHidden = playerPaper.classList.toggle("cinema-lyrics-hidden");
    if (isHidden) {
      if (elements.cinemaToggleLyricsLabel) elements.cinemaToggleLyricsLabel.textContent = "Mostra testo";
      elements.btnCinemaToggleLyrics?.classList.add("is-lyrics-off");
    } else {
      if (elements.cinemaToggleLyricsLabel) elements.cinemaToggleLyricsLabel.textContent = "Nascondi testo";
      elements.btnCinemaToggleLyrics?.classList.remove("is-lyrics-off");
    }
  };

  elements.btnCinemaMode.addEventListener("click", enterCinemaMode);
  elements.btnCinemaClose?.addEventListener("click", exitCinemaMode);
  elements.btnCinemaToggleLyrics?.addEventListener("click", toggleCinemaLyrics);
  elements.cinemaPrevBadge?.addEventListener("click", () => skipQueueTrack(-1));
  elements.cinemaNextBadge?.addEventListener("click", () => skipQueueTrack(1));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.body.classList.contains("cinema-mode-active")) {
      exitCinemaMode();
    }
  });

  setupCinemaResizer();

  window.enterCinemaMode = enterCinemaMode;
  window.exitCinemaMode = exitCinemaMode;
}

function setupCinemaResizer() {
  const resizer = elements.cinemaLyricsResizer;
  const playerPaper = document.querySelector(".player-paper");
  if (!resizer || !playerPaper) return;

  const savedWidth = localStorage.getItem("ari_cinema_lyrics_width");
  if (savedWidth) {
    playerPaper.style.setProperty("--cinema-lyrics-width", `${savedWidth}px`);
  }

  let startX = 0;
  let startWidth = 0;
  let isDragging = false;

  const onPointerDown = (e) => {
    if (!playerPaper.classList.contains("cinema-mode-active")) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDragging = true;
    startX = e.clientX;
    const lyricsDrawer = elements.playerLyricsDrawer;
    startWidth = lyricsDrawer ? lyricsDrawer.getBoundingClientRect().width : 420;
    document.body.classList.add("is-resizing-cinema");
    try {
      resizer.setPointerCapture(e.pointerId);
    } catch (_) {}
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = startX - e.clientX;
    const minW = 320;
    const maxW = Math.min(680, Math.floor(window.innerWidth * 0.52));
    const newWidth = Math.max(minW, Math.min(maxW, Math.round(startWidth + deltaX)));
    playerPaper.style.setProperty("--cinema-lyrics-width", `${newWidth}px`);
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    document.body.classList.remove("is-resizing-cinema");
    try {
      if (e?.pointerId && resizer.hasPointerCapture?.(e.pointerId)) {
        resizer.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    const lyricsDrawer = elements.playerLyricsDrawer;
    if (lyricsDrawer) {
      const finalWidth = Math.round(lyricsDrawer.getBoundingClientRect().width);
      localStorage.setItem("ari_cinema_lyrics_width", String(finalWidth));
    }
  };

  resizer.addEventListener("pointerdown", onPointerDown);

  resizer.addEventListener("dblclick", () => {
    playerPaper.style.removeProperty("--cinema-lyrics-width");
    localStorage.removeItem("ari_cinema_lyrics_width");
  });

  resizer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const lyricsDrawer = elements.playerLyricsDrawer;
      const currentWidth = lyricsDrawer ? lyricsDrawer.getBoundingClientRect().width : 420;
      const step = e.shiftKey ? 40 : 16;
      const delta = e.key === "ArrowLeft" ? step : -step;
      const minW = 320;
      const maxW = Math.min(680, Math.floor(window.innerWidth * 0.52));
      const newWidth = Math.max(minW, Math.min(maxW, Math.round(currentWidth + delta)));
      playerPaper.style.setProperty("--cinema-lyrics-width", `${newWidth}px`);
      localStorage.setItem("ari_cinema_lyrics_width", String(newWidth));
      e.preventDefault();
    }
  });
}

// =============================================================================
// SESSION PERSISTENCE & CACHING (LOCALSTORAGE)
// =============================================================================

let savedResumeSeconds = 0;

function findTrackInCollections(trackId) {
  if (!trackId) return null;
  const collections = [
    { tracks: LISTA_TRACKS, label: "La Lista" },
    { tracks: PROG_TRACKS, label: "Prog" },
    { tracks: HONORABLE_MENTIONS, label: "Menzioni d'onore" }
  ];
  for (const col of collections) {
    if (!Array.isArray(col.tracks)) continue;
    for (let i = 0; i < col.tracks.length; i++) {
      const t = col.tracks[i];
      if (t.id === trackId) {
        return { track: t, queue: col.tracks, label: col.label, index: i };
      }
      if (t.alternatives) {
        for (let j = 0; j < t.alternatives.length; j++) {
          const alt = t.alternatives[j];
          const altId = alt.id || `${t.id}-alt-${alt.youtubeId || j}`;
          if (altId === trackId || alt.youtubeId === trackId) {
            return { track: alt, queue: col.tracks, label: col.label, index: i };
          }
        }
      }
    }
  }
  return null;
}

function savePlaybackSession(currentTime) {
  if (!activeVideoTrack) return;
  try {
    const time = typeof currentTime === "number" ? currentTime : (youtubePlayer?.getCurrentTime?.() || 0);
    const session = {
      trackId: activeVideoTrack.id,
      variantIndex: activeVideoTrack.selectedYoutubeVariant || 0,
      queueLabel: playbackQueueLabel || "La Lista",
      queueIndex: playbackQueueIndex || 0,
      currentTime: Math.floor(time),
      timestamp: Date.now()
    };
    localStorage.setItem("ari_playback_session", JSON.stringify(session));
  } catch (_) {}
}

function restorePlaybackSession() {
  try {
    const raw = localStorage.getItem("ari_playback_session");
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (!session || !session.trackId) return false;

    const match = findTrackInCollections(session.trackId);
    if (!match) return false;

    let queue = match.queue;
    let label = match.label;
    let idx = match.index;
    if (session.queueLabel && session.queueLabel !== label) {
      if (session.queueLabel === "Prog") { queue = PROG_TRACKS; label = "Prog"; }
      else if (session.queueLabel === "Menzioni d'onore") { queue = HONORABLE_MENTIONS; label = "Menzioni d'onore"; }
      else { queue = LISTA_TRACKS; label = "La Lista"; }
      if (typeof session.queueIndex === "number" && session.queueIndex >= 0 && session.queueIndex < queue.length) {
        idx = session.queueIndex;
      }
    }
    setPlaybackQueue(queue, label, idx);

    const trackToLoad = {
      ...match.track,
      selectedYoutubeVariant: session.variantIndex || 0
    };

    if (session.currentTime && session.currentTime > 2) {
      savedResumeSeconds = session.currentTime;
    }

    loadTrack(trackToLoad, false);
    if (savedResumeSeconds > 0) {
      elements.miniPlayerCurrentTime.textContent = formatPlaybackTime(savedResumeSeconds);
    }
    return true;
  } catch (e) {
    console.warn("Restore session error", e);
    return false;
  }
}

// =============================================================================
// NATIVE MEDIA SESSION (SPOTIFY-STYLE LOCKSCREEN & NOTIFICATIONS)
// =============================================================================

function setupBackgroundMediaSession() {
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setActionHandler("play", () => {
        togglePlayback();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        togglePlayback();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        skipQueueTrack(-1);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        skipQueueTrack(1);
      });
      navigator.mediaSession.setActionHandler("stop", () => {
        if (youtubePlayer?.pauseVideo) youtubePlayer.pauseVideo();
        setMiniPlayerPlaying(false);
      });
      // Scrubbing del minutaggio da blocco schermo e tendina notifiche
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime !== undefined && youtubePlayer?.seekTo) {
          youtubePlayer.seekTo(details.seekTime, true);
          updateMediaSessionPosition(details.seekTime, youtubePlayer.getDuration?.() || 0);
          savePlaybackSession(details.seekTime);
        }
      });
      navigator.mediaSession.setActionHandler("seekbackward", (details) => {
        const skip = details.seekOffset || 10;
        const current = youtubePlayer?.getCurrentTime?.() || 0;
        const target = Math.max(0, current - skip);
        youtubePlayer?.seekTo?.(target, true);
        updateMediaSessionPosition(target, youtubePlayer?.getDuration?.() || 0);
      });
      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        const skip = details.seekOffset || 10;
        const current = youtubePlayer?.getCurrentTime?.() || 0;
        const dur = youtubePlayer?.getDuration?.() || current + 10;
        const target = Math.min(dur, current + skip);
        youtubePlayer?.seekTo?.(target, true);
        updateMediaSessionPosition(target, dur);
      });
    } catch (e) {
      console.warn("MediaSession action handler error", e);
    }
  }
}

function updateMediaSessionPosition(current, duration) {
  if (!("mediaSession" in navigator) || !("setPositionState" in navigator.mediaSession)) return;
  const safeDur = Math.max(0, Number(duration) || 0);
  const safePos = Math.max(0, Math.min(Number(current) || 0, safeDur));
  if (safeDur > 0 && safePos <= safeDur) {
    try {
      navigator.mediaSession.setPositionState({
        duration: safeDur,
        playbackRate: 1.0,
        position: safePos
      });
    } catch (_) {}
  }
}

function updateMediaSession(track, isPlaying = true) {
  if (!track || !("mediaSession" in navigator)) return;
  try {
    const artwork = [];
    if (track.youtubeId) {
      artwork.push(
        { src: `https://i.ytimg.com/vi/${track.youtubeId}/mqdefault.jpg`, sizes: "320x180", type: "image/jpeg" },
        { src: `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`, sizes: "480x360", type: "image/jpeg" },
        { src: `https://i.ytimg.com/vi/${track.youtubeId}/maxresdefault.jpg`, sizes: "1280x720", type: "image/jpeg" }
      );
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album || playbackQueueLabel || "Ari Playlist",
      artwork
    });
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    if (youtubePlayer?.getDuration) {
      const cur = youtubePlayer.getCurrentTime?.() || 0;
      const dur = youtubePlayer.getDuration?.() || 0;
      updateMediaSessionPosition(cur, dur);
    }
  } catch (e) {
    console.warn("MediaSession metadata update error", e);
  }
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

function positionVariantSliderThumb(animate = true) {
  const btn = elements.playerVariantButton;
  if (!btn || btn.hidden) return;
  const thumb = btn.querySelector(".variant-slider-thumb");
  const activeTab = btn.querySelector(".variant-tab.is-active");
  if (!thumb || !activeTab) return;

  if (!animate) {
    thumb.style.transition = "none";
  } else {
    thumb.style.transition = "left 360ms cubic-bezier(0.34, 1.45, 0.64, 1), width 360ms cubic-bezier(0.34, 1.45, 0.64, 1)";
  }
  thumb.style.left = `${activeTab.offsetLeft}px`;
  thumb.style.width = `${activeTab.offsetWidth}px`;
  thumb.style.top = `${activeTab.offsetTop}px`;
  thumb.style.height = `${activeTab.offsetHeight}px`;

  if (!animate) {
    requestAnimationFrame(() => {
      thumb.style.transition = "";
    });
  }
}

function setupVideoVariants() {
  elements.playerVariantButton?.addEventListener("click", (e) => {
    const track = activeVideoTrack;
    const variants = track?.youtubeVariants || [];
    if (variants.length < 2) return;

    const targetTab = e.target?.closest?.(".variant-tab");
    const currentIndex = track.selectedYoutubeVariant || 0;
    let nextIndex;
    if (targetTab && targetTab.dataset.index !== undefined) {
      const clickedIndex = parseInt(targetTab.dataset.index, 10);
      if (clickedIndex === currentIndex) return;
      nextIndex = clickedIndex;
    } else {
      nextIndex = (currentIndex + 1) % variants.length;
    }

    const playing = youtubePlayer?.getPlayerState?.() === window.YT?.PlayerState?.PLAYING;
    loadTrack({ ...track, youtubeId: variants[nextIndex].youtubeId, selectedYoutubeVariant: nextIndex }, playing);
  });

  window.addEventListener("resize", () => {
    positionVariantSliderThumb(false);
  }, { passive: true });
}

function setPlaybackQueue(tracks, label, index = 0) {
  playbackQueue = tracks;
  playbackQueueLabel = label;
  playbackQueueIndex = Math.max(0, Math.min(index, tracks.length - 1));
  updatePlaybackQueueUi();
}

function updateCaptionMarquee() {
  const wrap = document.querySelector(".caption-marquee-wrap");
  const content = document.querySelector(".caption-marquee-content");
  if (!wrap || !content) return;
  requestAnimationFrame(() => {
    wrap.classList.toggle("is-marquee", content.scrollWidth > wrap.clientWidth + 4);
  });
}

function updatePlaybackQueueUi() {
  if (!playbackQueue.length) return;
  const num = String(playbackQueueIndex + 1).padStart(2, "0");
  const total = String(playbackQueue.length).padStart(2, "0");
  const shortQueueLabel = playbackQueueLabel.replace(/^La\s+/i, "");

  if (elements.playerQueuePosition) {
    elements.playerQueuePosition.innerHTML = `
      <span class="queue-position-count">
        <span class="queue-num">${num}</span><span class="queue-total"> / ${total}</span>
      </span>
      <span class="queue-position-label">
        · <span class="queue-label-full">${escapeHtml(playbackQueueLabel)}</span><span class="queue-label-short">${escapeHtml(shortQueueLabel)}</span>
      </span>`;
  }

  if (elements.playerQueuePositionMobile) {
    const countEl = elements.playerQueuePositionMobile.querySelector(".queue-position-count");
    if (countEl) countEl.textContent = num;
    const labelEl = elements.playerQueuePositionMobile.querySelector(".queue-position-label");
    if (labelEl) labelEl.textContent = ` · ${shortQueueLabel}`;
  }

  if (elements.cinemaBadgeText) {
    elements.cinemaBadgeText.textContent = `${num} / ${total} · ${shortQueueLabel}`;
  }

  setMiniPlayerTitle(activeVideoTrack?.title || playbackQueueLabel);
  updateCaptionMarquee();
  [elements.playerPrevious, elements.miniPlayerPrevious].forEach(button => { if (button) button.disabled = playbackQueueIndex === 0; });
  [elements.playerNext, elements.miniPlayerNext].forEach(button => { if (button) button.disabled = playbackQueueIndex >= playbackQueue.length - 1; });

  const prevTrack = playbackQueueIndex > 0 ? playbackQueue[playbackQueueIndex - 1] : null;
  const nextTrack = playbackQueueIndex < playbackQueue.length - 1 ? playbackQueue[playbackQueueIndex + 1] : null;

  if (elements.cinemaPrevBadge && elements.cinemaPrevTitle) {
    elements.cinemaPrevBadge.hidden = false;
    if (prevTrack) {
      const prevNum = String(playbackQueueIndex).padStart(2, "0");
      if (elements.cinemaPrevTag) {
        elements.cinemaPrevTag.textContent = `${prevNum} / ${total}`;
      }
      elements.cinemaPrevTitle.textContent = `${prevTrack.title} — ${prevTrack.artist}`;
      elements.cinemaPrevBadge.style.visibility = "visible";
      elements.cinemaPrevBadge.setAttribute("aria-hidden", "false");
      elements.cinemaPrevBadge.classList.remove("is-disabled");
      elements.cinemaPrevBadge.title = `Passa al brano ${prevNum}, ${prevTrack.title} (${prevTrack.artist})`;
      elements.cinemaPrevBadge.setAttribute("aria-label", `Brano ${prevNum} di ${total}, ${prevTrack.title}`);
      const wrap = elements.cinemaPrevBadge.querySelector(".cinema-pill-marquee-wrap");
      const content = elements.cinemaPrevBadge.querySelector(".cinema-pill-marquee-content");
      if (wrap && content) {
        requestAnimationFrame(() => {
          wrap.classList.toggle("is-marquee", content.scrollWidth > wrap.clientWidth + 2);
        });
      }
    } else {
      elements.cinemaPrevBadge.style.visibility = "hidden";
      elements.cinemaPrevBadge.setAttribute("aria-hidden", "true");
      elements.cinemaPrevBadge.classList.add("is-disabled");
      elements.cinemaPrevBadge.removeAttribute("title");
    }
  }

  if (elements.cinemaNextBadge && elements.cinemaNextTitle) {
    elements.cinemaNextBadge.hidden = false;
    if (nextTrack) {
      const nextNum = String(playbackQueueIndex + 2).padStart(2, "0");
      if (elements.cinemaNextTag) {
        elements.cinemaNextTag.textContent = `${nextNum} / ${total}`;
      }
      elements.cinemaNextTitle.textContent = `${nextTrack.title} — ${nextTrack.artist}`;
      elements.cinemaNextBadge.style.visibility = "visible";
      elements.cinemaNextBadge.setAttribute("aria-hidden", "false");
      elements.cinemaNextBadge.classList.remove("is-disabled");
      elements.cinemaNextBadge.title = `Passa al brano ${nextNum}, ${nextTrack.title} (${nextTrack.artist})`;
      elements.cinemaNextBadge.setAttribute("aria-label", `Brano ${nextNum} di ${total}, ${nextTrack.title}`);
      const wrap = elements.cinemaNextBadge.querySelector(".cinema-pill-marquee-wrap");
      const content = elements.cinemaNextBadge.querySelector(".cinema-pill-marquee-content");
      if (wrap && content) {
        requestAnimationFrame(() => {
          wrap.classList.toggle("is-marquee", content.scrollWidth > wrap.clientWidth + 2);
        });
      }
    } else {
      elements.cinemaNextBadge.style.visibility = "hidden";
      elements.cinemaNextBadge.setAttribute("aria-hidden", "true");
      elements.cinemaNextBadge.classList.add("is-disabled");
      elements.cinemaNextBadge.removeAttribute("title");
    }
  }

  if (elements.playerNext) {
    elements.playerNext.title = nextTrack ? "Brano successivo" : "Fine della scaletta";
    elements.playerNext.setAttribute("aria-label", nextTrack ? "Brano successivo" : "Nessun brano successivo");
    if (elements.playerNextTooltip) {
      elements.playerNextTooltip.textContent = "";
    }
  }
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
        if (/live|session/i.test(label)) return "Live";
        if (/album|studio|orig|audio/i.test(label)) return "Album";
        if (/video/i.test(label)) return "Video";
        return label.length > 6 ? label.slice(0, 5) + "…" : label;
      };

      const isTwoVariants = variants.length === 2;
      const prevTrackId = elements.playerVariantButton.dataset.trackId;
      const isSameTrack = prevTrackId === track.id && elements.playerVariantButton.querySelector(".variant-slider-thumb");

      if (isSameTrack && isTwoVariants) {
        const tabs = elements.playerVariantButton.querySelectorAll(".variant-tab");
        tabs.forEach((t, i) => t.classList.toggle("is-active", i === variantIndex));
        elements.playerVariantButton.dataset.variant = String(variantIndex);
        elements.playerVariantButton.setAttribute("aria-label", `Passa a ${nextVariant.label || 'altra versione'}`);
        elements.playerVariantButton.title = `Passa a ${nextVariant.label || 'altra versione'}`;
        positionVariantSliderThumb(true);
      } else {
        elements.playerVariantButton.dataset.trackId = track.id;
        if (isTwoVariants) {
          const v0Short = getShortLabel(variants[0].label || 'V1');
          const v1Short = getShortLabel(variants[1].label || 'V2');
          elements.playerVariantButton.innerHTML = `
            <span class="variant-slider-thumb" aria-hidden="true"></span>
            <span class="variant-tab ${variantIndex === 0 ? 'is-active' : ''}" data-index="0">
              <span class="tab-label-full">${escapeHtml(variants[0].label || 'Versione 1')}</span>
              <span class="tab-label-short">${escapeHtml(v0Short)}</span>
            </span>
            <span class="variant-swap-icon" aria-hidden="true">
              <svg class="variant-swap-svg" viewBox="0 0 16 16">
                <path class="swap-arrow-top" d="M2.5 5.5h11M10 2.5 13.5 5.5 10 8.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="swap-arrow-bottom" d="M13.5 10.5H2.5M6 7.5 2.5 10.5 6 13.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="variant-tab ${variantIndex === 1 ? 'is-active' : ''}" data-index="1">
              <span class="tab-label-full">${escapeHtml(variants[1].label || 'Versione 2')}</span>
              <span class="tab-label-short">${escapeHtml(v1Short)}</span>
            </span>`;
        } else {
          const currLabel = variants[variantIndex].label || `Video ${variantIndex + 1}`;
          const nextLabel = nextVariant.label || `Video ${(variantIndex + 1) % variants.length + 1}`;
          elements.playerVariantButton.innerHTML = `
            <span class="variant-slider-thumb" aria-hidden="true"></span>
            <span class="variant-tab is-active">
              <span class="tab-label-full">${escapeHtml(currLabel)}</span>
              <span class="tab-label-short">${escapeHtml(getShortLabel(currLabel))}</span>
            </span>
            <span class="variant-swap-icon" aria-hidden="true">
              <svg class="variant-swap-svg" viewBox="0 0 16 16">
                <path class="swap-arrow-top" d="M2.5 5.5h11M10 2.5 13.5 5.5 10 8.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="swap-arrow-bottom" d="M13.5 10.5H2.5M6 7.5 2.5 10.5 6 13.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="variant-tab">
              <span class="tab-label-full">${escapeHtml(nextLabel)}</span>
              <span class="tab-label-short">${escapeHtml(getShortLabel(nextLabel))}</span>
            </span>`;
        }
        elements.playerVariantButton.dataset.variant = String(variantIndex);
        elements.playerVariantButton.setAttribute("aria-label", `Passa a ${nextVariant.label || 'altra versione'}`);
        elements.playerVariantButton.title = `Passa a ${nextVariant.label || 'altra versione'}`;
        requestAnimationFrame(() => positionVariantSliderThumb(false));
      }
    }
  }
  if (elements.btnOpenLyrics) {
    const trackId = track.id;
    const lyrics = (typeof LYRICS_DATA !== "undefined" && (LYRICS_DATA[trackId] || LYRICS_DATA[trackId.split('-alt-')[0]])) || "";
    const hasLyrics = Boolean(lyrics);
    elements.btnOpenLyrics.hidden = !hasLyrics;
    if (!hasLyrics && !elements.playerLyricsDrawer.hidden) {
      elements.playerLyricsDrawer.hidden = true;
      elements.btnOpenLyrics.classList.remove("is-active");
      const paper = document.querySelector(".player-paper");
      paper?.classList.remove("has-lyrics-open", "is-closing-lyrics");
      if (elements.mobileLyricsCloseBtn) elements.mobileLyricsCloseBtn.hidden = true;
      document.body.classList.remove("mobile-lyrics-open");
    } else if (hasLyrics && !elements.playerLyricsDrawer.hidden) {
      renderActiveLyrics();
    }
  }
  if (elements.btnCinemaMode) {
    elements.btnCinemaMode.hidden = !track.youtubeId;
  }
  if (document.body.classList.contains("cinema-mode-active")) {
    if (elements.cinemaTrackTitle) elements.cinemaTrackTitle.textContent = track.title;
    if (elements.cinemaTrackArtist) elements.cinemaTrackArtist.textContent = track.artist;
    renderActiveLyrics();
  }
  elements.playerTrackTitle.textContent = track.title;
  elements.playerTrackArtist.textContent = track.artist;
  if (elements.mobileLyricsTrackTitle) {
    elements.mobileLyricsTrackTitle.textContent = `${track.title} — ${track.artist}`;
  }
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

  if (autoplay) savedResumeSeconds = 0;
  elements.playerSearchLink.hidden = true;
  elements.playerEmptyState.hidden = true;
  elements.ytVideoPlayerIframe.hidden = false;
  elements.btnDirectYt.href = `https://www.youtube.com/watch?v=${encodeURIComponent(track.youtubeId)}`;
  elements.btnDirectYt.hidden = false;
  updateMediaSession(track, Boolean(autoplay));
  pendingYoutubeTrack = { track, autoplay, startSeconds: savedResumeSeconds };
  if (youtubePlayerReady) {
    loadPendingYoutubeTrack();
  } else {
    const embedUrl = new URL(`https://www.youtube.com/embed/${encodeURIComponent(track.youtubeId)}`);
    const embedParams = new URLSearchParams({ autoplay: autoplay ? "1" : "0", playsinline: "1", rel: "0", enablejsapi: "1", modestbranding: "1", iv_load_policy: "3" });
    if (savedResumeSeconds > 0) embedParams.set("start", String(savedResumeSeconds));
    if (window.location.origin !== "null") embedParams.set("origin", window.location.origin);
    embedUrl.search = embedParams.toString();
    elements.ytVideoPlayerIframe.src = embedUrl.toString();
    if (autoplay) setMiniPlayerPlaying(true);
    ensureYouTubeApi();
  }
  savePlaybackSession();
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
  const playerVars = { playsinline: 1, rel: 0, enablejsapi: 1, modestbranding: 1, iv_load_policy: 3 };
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
          const startSeconds = queued.startSeconds || savedResumeSeconds || 0;
          if (queued.autoplay) {
            if (startSeconds > 0) {
              event.target.loadVideoById({ videoId: queued.track.youtubeId, startSeconds });
            } else {
              event.target.loadVideoById(queued.track.youtubeId);
            }
          } else {
            if (startSeconds > 0) {
              event.target.cueVideoById({ videoId: queued.track.youtubeId, startSeconds });
            } else {
              if (currentId !== queued.track.youtubeId) event.target.cueVideoById(queued.track.youtubeId);
            }
          }
        }
      },
      onStateChange: event => {
        const isPlaying = event.data === window.YT.PlayerState.PLAYING;
        setMiniPlayerPlaying(isPlaying);
        if (isPlaying) {
          savedResumeSeconds = 0;
          startPlaybackClock();
        } else {
          stopPlaybackClock();
          savePlaybackSession();
        }
        if (event.data === window.YT.PlayerState.ENDED) {
          skipQueueTrack(1);
        }
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
  const { track, autoplay, startSeconds } = pendingYoutubeTrack;
  const start = startSeconds || savedResumeSeconds || 0;
  if (autoplay) {
    if (start > 0) {
      youtubePlayer.loadVideoById({ videoId: track.youtubeId, startSeconds: start });
    } else {
      youtubePlayer.loadVideoById(track.youtubeId);
    }
  } else {
    if (start > 0) {
      youtubePlayer.cueVideoById({ videoId: track.youtubeId, startSeconds: start });
    } else {
      youtubePlayer.cueVideoById(track.youtubeId);
    }
  }
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
      copy: "<p>Questi sono brani che mi fanno impazzire e spero che ti piaceranno tanto quanto a me. Magari ce n’è uno che già conosci o uno nuovo che ti resta addosso, oppure un album che ti incuriosisce abbastanza da volerlo aggiungere alla tua collezione di vinili o da raccontare in un video.</p><p>Volevo farcene entrare dieci, ma è stato impossibile, ne ho lasciate <strong>tredici</strong>, qualche alternativa e, in fondo, le <strong>menzioni d’onore</strong>. Se hai voglia, meritano tutte.</p>",
      hint: true,
      reopen: reopenList
    },
    prog: {
      title: "Un appunto sul prog",
      subtitle: "un piccolo assaggio del genere",
      copy: "<p>Mi avevi detto che ti incuriosiva il prog, qui trovi alcune chicche tra le più fighe per approcciare il genere. È solo un assaggio, dietro ogni brano c’è un album da esplorare e un mondo di artisti, dagli Yes ai Gentle Giant. Spero che questo viaggio ti piaccia!</p>",
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

  const handleDismissDesktopLetter = (letterCard, reopenBtn) => {
    const dismissBtn = letterCard.querySelector(".btn-letter-dismiss");
    dismissBtn?.classList.add("is-animating");
    letterCard.classList.add("is-folding");

    setTimeout(() => {
      letterCard.classList.add("is-collapsed");
      letterCard.classList.remove("is-folding");
      dismissBtn?.classList.remove("is-animating");
      reopenBtn.classList.add("is-visible-desktop");
      reopenBtn.classList.remove("letter-reopen-pop");
      void reopenBtn.offsetWidth;
      reopenBtn.classList.add("letter-reopen-pop");
    }, 320);
  };

  const handleReopenDesktopLetter = (targetCard, reopenBtn) => {
    reopenBtn.classList.remove("is-visible-desktop");
    targetCard.classList.remove("is-collapsed", "is-folding");
    targetCard.classList.add("is-unfolding");
    targetCard.addEventListener("animationend", () => {
      targetCard.classList.remove("is-unfolding");
    }, { once: true });
    targetCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleReopenClick = kind => {
    if (isMobile()) {
      openLetter(kind);
    } else {
      const targetCard = kind === "prog"
        ? document.getElementById("introLetterProg")
        : document.getElementById("introLetterLista");
      const reopenBtn = kind === "prog" ? reopenProg : reopenList;
      if (targetCard) {
        handleReopenDesktopLetter(targetCard, reopenBtn);
      }
    }
  };

  document.querySelectorAll(".btn-letter-dismiss").forEach(btn => {
    btn.addEventListener("click", event => {
      const letterCard = event.currentTarget.closest(".intro-letter");
      if (!letterCard) return;
      const isProg = letterCard.id === "introLetterProg";
      const reopenBtn = isProg ? reopenProg : reopenList;
      handleDismissDesktopLetter(letterCard, reopenBtn);
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

let activeWaveCard = null;
let activeWaveCanvas = null;
let activeWaveCtx = null;
let waveAnimFrameId = null;
let waveStartTimestamp = 0;
let waveStartPulse = 0;

function startCardWaveVisualizer(cardElement) {
  if (!cardElement) return;
  if (activeWaveCard === cardElement && waveAnimFrameId) return;
  stopCardWaveVisualizer();

  activeWaveCard = cardElement;
  let canvas = cardElement.querySelector(".track-card-wave-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "track-card-wave-canvas";
    cardElement.prepend(canvas);
  }
  activeWaveCanvas = canvas;
  activeWaveCtx = canvas.getContext("2d");
  waveStartTimestamp = performance.now();
  waveStartPulse = 1.0;

  function resize() {
    if (!activeWaveCanvas || !activeWaveCard) return;
    const rect = activeWaveCard.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (activeWaveCanvas.width !== w || activeWaveCanvas.height !== h) {
      activeWaveCanvas.width = w;
      activeWaveCanvas.height = h;
    }
  }
  resize();

  const bpm = 112;
  const beatSec = 60 / bpm;

  function render(now) {
    if (!activeWaveCanvas || !activeWaveCtx || !activeWaveCard) return;
    resize();
    const ctx = activeWaveCtx;
    const width = activeWaveCanvas.width;
    const height = activeWaveCanvas.height;

    if (width === 0 || height === 0) {
      waveAnimFrameId = requestAnimationFrame(render);
      return;
    }

    const t = (now - waveStartTimestamp) / 1000;

    ctx.clearRect(0, 0, width, height);

    // Soft radiant background glow
    const baseGrad = ctx.createLinearGradient(0, 0, width, 0);
    baseGrad.addColorStop(0, "rgba(255, 255, 255, 0.16)");
    baseGrad.addColorStop(0.5, "rgba(255, 252, 245, 0.26)");
    baseGrad.addColorStop(1, "rgba(255, 255, 255, 0.12)");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Layer 1: Silky Fluid Body (Gentle undulating liquid fill)
    ctx.save();
    ctx.beginPath();
    const midY1 = height * 0.52;
    const amp1 = height * 0.22;

    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 4) {
      const normX = x / width;
      const y = midY1 +
        Math.sin(normX * Math.PI * 2.2 - t * 1.3) * amp1 +
        Math.sin(normX * Math.PI * 3.8 + t * 0.8) * (amp1 * 0.28);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();

    const fillGrad1 = ctx.createLinearGradient(0, 0, 0, height);
    fillGrad1.addColorStop(0, "rgba(255, 255, 255, 0.42)");
    fillGrad1.addColorStop(0.5, "rgba(255, 252, 242, 0.22)");
    fillGrad1.addColorStop(1, "rgba(255, 255, 255, 0.04)");
    ctx.fillStyle = fillGrad1;
    ctx.fill();
    ctx.restore();

    // Layer 2: Delicate Glowing Sine Crest (Clean luminous line)
    ctx.save();
    ctx.beginPath();
    const midY2 = height * 0.48;
    const amp2 = height * 0.18;

    for (let x = 0; x <= width; x += 3) {
      const normX = x / width;
      const y = midY2 +
        Math.sin(normX * Math.PI * 2.8 - t * 1.5) * amp2 +
        Math.cos(normX * Math.PI * 1.6 + t * 0.9) * (amp2 * 0.25);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.78)";
    ctx.lineWidth = 1.6 * Math.min(window.devicePixelRatio || 1, 2);
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.restore();

    // Layer 3: Secondary Subtle Counter Ripple
    ctx.save();
    ctx.beginPath();
    const midY3 = height * 0.56;
    const amp3 = height * 0.14;

    for (let x = 0; x <= width; x += 4) {
      const normX = x / width;
      const y = midY3 +
        Math.sin(normX * Math.PI * 2.4 + t * 1.1) * amp3 +
        Math.sin(normX * Math.PI * 4.6 - t * 1.6) * (amp3 * 0.2);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(255, 248, 230, 0.45)";
    ctx.lineWidth = 1.0 * Math.min(window.devicePixelRatio || 1, 2);
    ctx.stroke();
    ctx.restore();

    waveAnimFrameId = requestAnimationFrame(render);
  }

  waveAnimFrameId = requestAnimationFrame(render);
}

function stopCardWaveVisualizer() {
  if (waveAnimFrameId) {
    cancelAnimationFrame(waveAnimFrameId);
    waveAnimFrameId = null;
  }
  if (activeWaveCanvas) {
    activeWaveCanvas.remove();
    activeWaveCanvas = null;
    activeWaveCtx = null;
  }
  activeWaveCard = null;
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
  let playingCard = null;
  document.querySelectorAll(".track-master-card").forEach(card => {
    const isCurrent = Boolean(activeVideoTrack && (card.dataset.id === activeVideoTrack.id || activeVideoTrack.id.startsWith(`${card.dataset.id}-alt-`)));
    const cardIsPlaying = Boolean(isCurrent && playing);
    card.classList.toggle("is-playing", cardIsPlaying);
    if (cardIsPlaying) playingCard = card;
  });
  if (playingCard) {
    startCardWaveVisualizer(playingCard);
  } else {
    stopCardWaveVisualizer();
  }

  if (activeVideoTrack) {
    updateMediaSession(activeVideoTrack, playing);
  }
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

    // Aggiorna lo stato della posizione per la Media Session (timeline scrubbing su Android/iOS)
    updateMediaSessionPosition(current, duration);

    // Salva periodicamente nel localStorage ogni 2 secondi
    if (Math.floor(current) % 2 === 0) {
      savePlaybackSession(current);
    }
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
      out += `   YouTube — ${track.youtubeId ? `https://www.youtube.com/watch?v=${track.youtubeId}` : youtubeSearchUrl(track)}\n`;
      (track.alternatives || []).forEach(alt => {
        out += `   └─ Alternativa — ${alt.artist} — ${alt.title}\n`;
      });
    });
    return out;
  };

  elements.btnCopyText?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(getFormattedListaText());
      showToast("Scaletta copiata negli appunti!");
      elements.btnCopyText.classList.add("is-copied");
      setTimeout(() => {
        elements.btnCopyText.classList.remove("is-copied");
      }, 1800);
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
    elements.btnDownloadText.classList.add("is-copied");
    setTimeout(() => {
      elements.btnDownloadText.classList.remove("is-copied");
    }, 1800);
  });
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", event => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.code === "Space") {
      event.preventDefault();
      togglePlayback();
    } else if (event.key === "ArrowRight" || event.key === "l" || event.key === "L") {
      event.preventDefault();
      skipQueueTrack(1);
    } else if (event.key === "ArrowLeft" || event.key === "j" || event.key === "J") {
      event.preventDefault();
      skipQueueTrack(-1);
    } else if (event.key === "t" || event.key === "T" || event.key === "x" || event.key === "X") {
      if (elements.btnOpenLyrics && !elements.btnOpenLyrics.hidden) {
        event.preventDefault();
        elements.btnOpenLyrics.click();
      }
    }
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
