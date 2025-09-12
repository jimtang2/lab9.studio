import clsx from "clsx"

export default function Loader() {
  const cls = {
    container: [
      "w-[calc(100vw-50px)] h-screen",
      "sm:w-screen sm:h-[calc(100vh-50px)]",
      "flex flex-row items-center justify-center",
    ],
    spinner: [
      "h-30 w-30 self-center justify-self-center",
      "border-0 border-t-8 rounded-full",
      "animate-spin",
      "mx-auto",
    ],
  }

  return <div className={clsx(cls.container)}>
    <div className={clsx(cls.spinner)}></div>
  </div>
}