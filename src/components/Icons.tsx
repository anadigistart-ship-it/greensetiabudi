import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconLeaf = (p: P) => (
  <svg {...base} {...p}><path d="M5 19c0-8 5-13 15-14 0 9-5 14-13 14" /><path d="M5 19c2-5 5-8 9-10" /></svg>
);
export const IconDiamond = (p: P) => (
  <svg {...base} {...p}><path d="M6 4h12l4 6-10 11L2 10z" /><path d="M2 10h20M9 4l-2 6 5 11 5-11-2-6" /></svg>
);
export const IconHome = (p: P) => (
  <svg {...base} {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>
);
export const IconTree = (p: P) => (
  <svg {...base} {...p}><path d="M12 21v-6" /><path d="M12 15c-4 0-7-2.5-7-6a7 7 0 0114 0c0 3.5-3 6-7 6z" /></svg>
);
export const IconShield = (p: P) => (
  <svg {...base} {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
);
export const IconPin = (p: P) => (
  <svg {...base} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
);
export const IconMail = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const IconBed = (p: P) => (
  <svg {...base} {...p}><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5" /><circle cx="7" cy="11" r="1.5" /></svg>
);
export const IconBath = (p: P) => (
  <svg {...base} {...p}><path d="M4 12h16v2a5 5 0 01-5 5H9a5 5 0 01-5-5z" /><path d="M6 12V6a2 2 0 014 0M7 19l-1 2M17 19l1 2" /></svg>
);
export const IconCar = (p: P) => (
  <svg {...base} {...p}><path d="M5 16V12l2-5h10l2 5v4M3 16h18v3H3z" /><circle cx="7.5" cy="16" r="0.8" /><circle cx="16.5" cy="16" r="0.8" /></svg>
);
export const IconRuler = (p: P) => (
  <svg {...base} {...p}><path d="M3 17L17 3l4 4L7 21z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconMenu = (p: P) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconSend = (p: P) => (
  <svg {...base} {...p}><path d="M21 3L10 14" /><path d="M21 3l-7 18-4-7-7-4z" /></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconRotate = (p: P) => (
  <svg {...base} {...p}><path d="M20 12a8 8 0 11-3-6.2" /><path d="M20 4v5h-5" /></svg>
);
export const IconExpand = (p: P) => (
  <svg {...base} {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
export const IconBot = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V4M9 13h.01M15 13h.01M9 16.5h6" /><circle cx="12" cy="3.5" r="1" /></svg>
);
export const IconWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2a9.9 9.9 0 00-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.2 15.04l-.3-.18-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0112.04 3.8zM8.6 7.6c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.86 4.4 3.9 2.18.86 2.62.69 3.1.65.47-.04 1.52-.62 1.73-1.22.22-.6.22-1.11.15-1.22-.06-.1-.23-.17-.49-.3-.26-.13-1.52-.75-1.76-.84-.23-.08-.4-.13-.58.13-.17.26-.66.84-.8 1-.16.18-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.46.13-.15.17-.26.26-.43.08-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44h-.5z" />
  </svg>
);
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);
