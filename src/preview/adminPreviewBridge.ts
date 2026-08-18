export type AdminPreviewDraft = { kind: 'content' | 'product' | 'slide'; value: Record<string, unknown> };

/** Narrow message validation keeps the preview bridge ephemeral and origin-bound. */
export function trustedAdminDraft(origin: string, allowedOrigin: string | undefined, data: unknown): AdminPreviewDraft | undefined {
  if (!allowedOrigin || origin !== allowedOrigin || !data || typeof data !== 'object') return undefined;
  const message = data as { type?: string; draft?: AdminPreviewDraft };
  if (message.type !== 'landing-admin-preview' || !message.draft || !['content', 'product', 'slide'].includes(message.draft.kind) || !message.draft.value || typeof message.draft.value !== 'object') return undefined;
  return message.draft;
}
