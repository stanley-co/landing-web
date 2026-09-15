import ReactMarkdown from 'react-markdown';

export function LegalMarkdown({ children }: { children: string }) {
  return <ReactMarkdown skipHtml>{children}</ReactMarkdown>;
}
