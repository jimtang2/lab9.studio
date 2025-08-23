import clsx from "clsx"

export default function Loading() {
  const cls = {
    base: [
      "col-start-2 col-end-4 row-start-1 row-end-4",
      "sm:col-start-1 sm:col-end-4 sm:row-start-2 sm:row-end-4",
      "flex flex-col justify-center items-center",
    ],
    spinner: [
      "animate-spin rounded-full h-24 w-24 border-8 border-l-2 border-r-2 border-accent",
    ],
  }

  return (
    <main className={clsx(cls.base)}>
      <div className={clsx(cls.spinner)}></div>
    </main>
  );
}