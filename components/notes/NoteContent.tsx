
interface NoteContentProps {
	id?: string;
	className?: string;
	html: { __html: string };
}

export default function NoteContent({ id="", className="", html }: NoteContentProps) {
	return <div id={id} 
			className={className} 
			dangerouslySetInnerHTML={html} />
}