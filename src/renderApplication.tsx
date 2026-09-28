import { createRoot, hydrateRoot } from 'react-dom/client';
import type { ReactNode } from 'react';

/** Mount into the server-rendered shell, hydrating only when markup exists. */
export function renderApplication(root: HTMLElement, app: ReactNode): void {
  if (root.hasChildNodes()) {
    hydrateRoot(root, app);
    return;
  }

  createRoot(root).render(app);
}
