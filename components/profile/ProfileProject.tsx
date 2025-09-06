import clsx from "clsx"

interface ProjectProps {
  className?: string;
  name: string;
  start: string;
  end: string;
  description: string;
  stack: string[];
}

export default function Project({ className, name, start, end, description, stack=[], }: ProjectProps) {
   const cls = {
    project: [
      "flex flex-col",
      "whitespace-nowrap",
      "py-2 px-4 my-2 last:mb-0",
      // "border-b-1 border-border last:border-b-0",
      className,
    ],
    first: [

    ],
    name: [
      "font-base text-accent",
    ],
    second: [

    ],
    third: [
      "text-subtext",
    ],
  }
  return <div className={clsx(cls.project)}>
    <div className={clsx(cls.first)}>
    	<span className={clsx(cls.name)}>{name}</span>
    </div>
    <div className={clsx(cls.second)}>
    </div>
    <div className={clsx(cls.third)}>
      <span>{start} - </span>
     <span>{end}</span>
    </div>
  </div>
}