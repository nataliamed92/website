export const brand = {
  /** Chosen from the client's six-concept sheet: white line art on dark. */
  lockup: "/brand/logo-lockup.png",
  mark: "/brand/logo-mark.png",
  /** Thicker strokes, cropped to the head. For anything under ~48px. */
  markSmall: "/brand/logo-mark-sm.png",
  /** Light cut, for the rare placement over a dark photograph. */
  lockupOnDark: "/brand/logo-lockup-on-dark.png",
  markOnDark: "/brand/logo-mark-on-dark.png",
} as const;

/**
 * The hero film: the logo drawing itself on black. Rendered by
 * `tools/make-logo-video.py`, which is deterministic, so re-running it
 * reproduces these files exactly.
 */
export const video = {
  heroLandscape: "/video/hero-16x9.mp4",
  heroPortrait: "/video/hero-9x16.mp4",
  poster: "/video/hero-poster.jpg",
  /** Standalone films with the wordmark, for Instagram and TikTok. */
  filmLandscape: "/video/logo-16x9.mp4",
  filmPortrait: "/video/logo-9x16.mp4",
} as const;

/**
 * `portrait`, `surgery` and `operating` are REAL photographs supplied by the
 * practice. `surgery` was cropped so that no patient appears in frame.
 * `operating` arrived on 2026-10-12 and replaced the selfie that used to sit
 * in its place, at the doctor's request; it is full resolution, so unlike the
 * selfie it is no longer restricted to small cards.
 *
 * The generated face studies were deleted on 2026-09-22 at the client's
 * request: no invented face may stand in for her work. What remains generated
 * is `room` and `avenue`, which are places rather than people, and which she
 * explicitly kept. Replace them too as real ones arrive.
 */
export const images = {
  portrait: "/img/portrait.jpg",
  surgery: "/img/surgery.jpg",
  operating: "/img/operating.jpg",
  room: "/img/consultation-room.jpg",
  avenue: "/img/athens-avenue.jpg",
} as const;
