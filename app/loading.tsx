import clsx from "clsx"

export default function Loader() {
  const cls = {
    container: [
      "grid grid-cols-1 grid-rows-1",
      "w-full h-full",
    ],
    spinner: [
      "h-30 w-30 self-center justify-self-center",
      "border-0 border-t-8 rounded-full",
      "animate-spin",
    ],
  }

  return <div className={clsx(cls.container)}>
    <div className={clsx(cls.spinner)}></div>
  </div>
}