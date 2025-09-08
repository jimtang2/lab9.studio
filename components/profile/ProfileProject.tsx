import clsx from "clsx"

interface ProjectProps {
  name: string;
  type: string;
  company: string;
  start: string;
  end: string;
  description: string;
  stack: string[];
  selected: boolean;
  hasSelection: boolean;
}

export default function Project({ name, type, company, start, end, description, stack=[], selected, hasSelection, }: ProjectProps) {
   const cls = {
    project: [
      "profile-project",
      "flex flex-col",
      // "whitespace-nowrap",
      "text-wrap",
      "px-3",
      (hasSelection && !selected) ? 
        [
          "opacity-0 -translate-y-5",
          "h-0 mt-0 pb-0",
        ] : 
        [
          "opacity-100 translate-y-0",
          "pb-4 mt-4",
        ],
      [
        "transition-all duration-300 ease-in-out",
      ],
    ],
    title: [
      // "flex flex-row gap-1",
    ],
    second: [
      "text-subtext",
    ],
    company: [
      "px-1",
    ],
    name: [
      "font-bold",
    ],
    stack: [

    ],
    tech: [
      "text-subtext",
    ],
  }
  return <div className={clsx(cls.project)}>
    <div className={clsx(cls.title)}>
      <span className={clsx(cls.name)}>{name}</span>
      <span className={clsx(cls.company)}>{company}</span>
    </div>
    <div className={clsx(cls.second)}>
      <span>{start} - </span>
     <span>{end}</span>
    </div>
    <div className={clsx(cls.stack)}>
      {stack.map((tech, i) => <div key={i} className={clsx(cls.tech)}>{tech}</div>)}
    </div>
  </div>
}