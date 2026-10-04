/**
 * Replaces the native video controls (kept in the HTML for visitors without JS) with one
 * play/pause/replay button. Recordings never loop: each plays once and holds its last frame.
 */
export interface MediaController {
  video: HTMLVideoElement;
  play(fromStart?: boolean): void;
  pause(): void;
}

const ICONS = {
  play: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z"/></svg>',
  pause: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z"/></svg>',
  replay: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1a4 4 0 1 1-3.5 2.1l1 .6A2.9 2.9 0 1 0 5 2.1V3.6L2.6 1.8 5 0z"/></svg>',
};

export function enhanceVideo(video: HTMLVideoElement): MediaController {
  video.controls = false;
  video.removeAttribute('controls');
  video.loop = false;
  const name = video.getAttribute('aria-label') ?? 'recording';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'media-toggle';
  video.parentElement?.appendChild(button);

  const render = () => {
    const state = video.ended ? 'replay' : video.paused ? 'play' : 'pause';
    const label = state === 'replay' ? 'Replay' : state === 'play' ? 'Play' : 'Pause';
    button.innerHTML = `${ICONS[state]}<span>${label}</span>`;
    button.setAttribute('aria-label', `${label}: ${name}`);
  };
  ['play', 'pause', 'ended', 'emptied'].forEach((ev) => video.addEventListener(ev, render));
  render();

  const play = (fromStart = false) => {
    if (fromStart || video.ended) {
      try {
        video.currentTime = 0;
      } catch {
        /* not seekable before metadata; it starts at 0 anyway */
      }
    }
    video.play().catch(() => render());
  };

  button.addEventListener('click', () => {
    if (video.paused || video.ended) play(video.ended);
    else video.pause();
  });

  return { video, play, pause: () => video.pause() };
}

/** Plays a recording once when it is mostly in view, pauses it when it leaves. Returns a stop function. */
export function playWhenVisible(ctrl: MediaController, autoplay: boolean): () => void {
  let started = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 0.6) {
        if (autoplay && !started) {
          started = true;
          ctrl.play(true);
        }
      } else if (entry.intersectionRatio < 0.15 && !ctrl.video.paused) {
        ctrl.pause();
        started = false; // replays from the start next time it comes into view
      }
    },
    { threshold: [0, 0.15, 0.6] },
  );
  io.observe(ctrl.video);
  return () => io.disconnect();
}
