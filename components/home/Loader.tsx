import clsx from "clsx"

interface LoaderProps {
  show?: boolean;
}
export default function Loader({ show=true, }: LoaderProps) {
  const cls = {
    container: [
      "absolute w-full h-full",
      "flex flex-row items-center justify-center",
      !show && "hidden",
      "pointer-events-none",
    ],
    spinner: [
      "h-36 w-36 border-t-12 animate-spin rounded-full border-accent"
    ],
  }

  return <div className={clsx(cls.container)}>
    <div className={clsx(cls.spinner)}></div>
  </div>
}