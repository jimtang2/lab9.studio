import clsx from "clsx"

export default function Loader() {
	const cls = {
		container: [
			"col-start-1 col-end-[-1]",
			"row-start-1 row-end-[-1]",
			"z-12",
			"flex flex-col justify-center items-center",			
		],
		spinner: [
		  "animate-spin rounded-full h-24 w-24 border-8 border-l-2 border-r-2 border-accent-ternary",
		],
		background: [
			"col-start-1 col-end-[-1]",
			"row-start-1 row-end-[-1]",
			"bg-background-primary",
			"opacity-40",
			"z-10",
		],
	}

	return <>
		<div className={clsx(cls.container)}>
			<div className={clsx(cls.spinner)}></div>
		</div>
		<div className={clsx(cls.background)}></div>
	</>
}