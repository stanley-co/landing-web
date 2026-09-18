export type AdminPreviewDraft = { kind: 'content' | 'product' | 'slide'; value: Record<string, unknown> };

function isIpAddress(hostname: string): boolean {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.includes(':');
}

function validAdminOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const parsed = new URL(value);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:')
      && parsed.pathname === '/'
      && !parsed.search
      && !parsed.hash
      && !parsed.username
      && !parsed.password
      && !isIpAddress(parsed.hostname)
      ? parsed.origin
      : undefined;
  } catch { return undefined; }
}

export function adminPreviewOrigin(value: string | undefined, location: Location | undefined = window.location): string | undefined {
  if (location && !isIpAddress(location.hostname) && (location.hostname === 'kitexp.ru' || location.hostname.endsWith('.kitexp.ru'))) {
    return `${location.protocol}//admin.${location.hostname}`;
  }
  return validAdminOrigin(value);
}

/** Narrow message validation keeps the preview bridge ephemeral and origin-bound. */
export function trustedAdminDraft(origin: string, allowedOrigin: string | undefined, data: unknown): AdminPreviewDraft | undefined {
  if (!allowedOrigin || origin !== allowedOrigin || !data || typeof data !== 'object') return undefined;
  const message = data as { type?: string; draft?: AdminPreviewDraft };
  if (message.type !== 'landing-admin-preview' || !message.draft || !['content', 'product', 'slide'].includes(message.draft.kind) || !message.draft.value || typeof message.draft.value !== 'object') return undefined;
  return message.draft;
}
