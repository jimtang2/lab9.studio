import clsx from "clsx"

interface ExperienceProps {
  className?: string; 
  company: string;
  department: string;
  title: string;
  start: string;
  end: string;
  city: string;
  description: string;
  stack: string[];
}

export default function Experience({ className, company, department, title, start, end, city, description, stack=[], }: ExperienceProps) {
  const cls = {
    job: [
      "flex flex-col",
      "whitespace-nowrap",
      "py-2 px-4 my-2 last:mb-0",
      className,
    ],
    first: [
    	"flex flex-row gap-1",
    ],
    company: [
      "text-base/6 text-accent font-base",
    ],
    location: [
      "text-base/6",
    ],
    second: [
    	"flex flex-row gap-1",
    ],
    title: [
      "text-base/6",
    ],
    department: [
      "text-base/6",
    ],
    third: [

    ],
    date: [
      "text-base/6 text-subtext",
    ],
    description: [
      
    ],
    stack: [
      "hidden",
    ],
    tech: [
      // "pl-4",
    ],
  }
  return <div className={clsx(cls.job)}>
  	<div className={clsx(cls.first)}>
  		<div className={clsx(cls.company)}>{company},</div>
  		<div className={clsx(cls.location)}>{city}</div> 
  	</div>
  	<div className={clsx(cls.second)}>
  		<div className={clsx(cls.title)}>{title},</div>
  		<div className={clsx(cls.department)}>{department}</div>
  	</div>
  	<div className={clsx(cls.third)}>
  		
  	</div>
    <div className={clsx(cls.date)}>
      <span>{start}</span>
      <span> – </span>
      <span>{end}</span>
    </div>
    <div className={clsx(cls.description)}>{description}</div>
    <div className={clsx(cls.stack)}>
      {stack.map(t => <div className={clsx(cls.tech)} key={t}>{t}</div>)}
    </div>
  </div>
}
