
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