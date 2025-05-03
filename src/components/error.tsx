export function Error({ error }: {
	error: string
}) {
	return (
		<div className="error">
			<div className="error-message">{error}</div>
		</div>)
}