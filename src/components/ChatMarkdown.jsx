// Minimal, safe markdown for chat replies: **bold**, [text](url), bare URLs, "- " bullets.
// Renders React elements only (no innerHTML), and only allows http(s)/mailto links.

const TOKEN_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
const SAFE_HREF = /^(https?:\/\/|mailto:)/i;

const linkClass = 'text-accent-soft underline underline-offset-2 hover:text-white break-all';

function renderInline(text, keyPrefix) {
  return text.split(TOKEN_RE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    const md = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (md && SAFE_HREF.test(md[2])) {
      return <a key={key} href={md[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>{md[1]}</a>;
    }
    if (/^https?:\/\//i.test(part)) {
      const clean = part.replace(/[.,;:!?]+$/, '');
      return (
        <span key={key}>
          <a href={clean} target="_blank" rel="noopener noreferrer" className={linkClass}>{clean}</a>
          {part.slice(clean.length)}
        </span>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
      return <a key={key} href={`mailto:${part}`} className={linkClass}>{part}</a>;
    }
    return part;
  });
}

const ChatMarkdown = ({ text }) => {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
        const nl = i < lines.length - 1 ? '\n' : '';
        if (bullet) {
          return (
            <span key={i} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">•</span>
              <span>{renderInline(bullet[1], i)}</span>
            </span>
          );
        }
        return (
          <span key={i}>
            {renderInline(line, i)}
            {nl}
          </span>
        );
      })}
    </>
  );
};

export default ChatMarkdown;
