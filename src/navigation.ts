import type { MouseEvent } from 'react';

/** Preserve new-tab, download and modified-click behavior on internal links. */
export function shouldNavigateInApp(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.defaultPrevented &&
    !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
    event.currentTarget.target !== '_blank';
}
