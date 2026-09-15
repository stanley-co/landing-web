import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LegalMarkdown } from './LegalMarkdown';

describe('LegalMarkdown', () => {
  it('renders markdown as semantic content and leaves raw html inert', () => {
    const html = renderToStaticMarkup(
      <LegalMarkdown>{'# Terms\n\n- First\n- [Example](https://example.com)\n\n<script>alert(1)</script>'}</LegalMarkdown>,
    );

    expect(html).toContain('<h1>Terms</h1>');
    expect(html).toContain('<li>First</li>');
    expect(html).toContain('<a href="https://example.com">Example</a>');
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('alert(1)');
  });
});
