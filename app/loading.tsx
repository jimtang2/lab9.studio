import clsx from "clsx"

export default function Loader() {
  const cls = {
    container: [
      "grid grid-cols-1 grid-rows-1",
      "w-full h-full",
    ],
    spinnerContainer: [
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
      "z-10",
    ],
  }



  return <div className={clsx(cls.container)}>
    <div className={clsx(cls.spinnerContainer)}>
      <div className={clsx(cls.spinner)}></div>
    </div>
    <div className={clsx(cls.background)}></div>
  </div>
}