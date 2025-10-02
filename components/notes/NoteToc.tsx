
interface NoteTocProps {
	id?: string;
	className?: string;
	html: { __html: string };
}

export default function NoteToc({ id="", className="", html }: NoteTocProps) {
	return <div id={id} 
			className={className} 
			dangerouslySetInnerHTML={html} />
}

export function observeToc(markdownId: string, tocId: string): IntersectionObserver {
  const currentIntersecting = new Set<string>();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentIntersecting.add(entry.target.id);
      } else {
        currentIntersecting.delete(entry.target.id);
      }
    });

    if (currentIntersecting.size > 0) {
      document.querySelectorAll(`#${tocId} li > a.active`).forEach(el => el.classList.remove("active"));
      for (const id of currentIntersecting) {
        const tocEl = document.querySelector(`#${tocId} li > a[href='#${id}']`);
        tocEl?.classList.add("active");
      }
    }

    document.querySelectorAll(`#${tocId} li > a.active`).forEach((el, i) => {
      if (i === 0) {
        el?.classList.add("top");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        el?.classList.remove("top");
      }
    });
  }, {
    rootMargin: '0% 0px -80% 0px',
    root: document.querySelector(`#${markdownId}`),
    threshold: 1
  });

  const headings = document.querySelectorAll(`#${markdownId} h1, #${markdownId} h2, #${markdownId} h3`);
  headings.forEach(el => observer.observe(el));
  return observer;
}