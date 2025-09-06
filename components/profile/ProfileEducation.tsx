import clsx from "clsx"

interface EducationProps {
  className?: string;
  school: string;
  degree: string;
  major: string;
  minor?: string;
  start: string;
  end: string;
  city: string;
}

export default function Education({ className, school, degree, major="", minor="", start, end, city, }: EducationProps) {
   const cls = {
    education: [
      "flex flex-col",
      "whitespace-nowrap",
      "py-2 px-4 my-2 last:mb-0",
      // "border-b-1 border-border last:border-b-0",
      className,
    ],
    first: [

    ],
    school: [
      "font-base text-accent",
    ],
    location: [
    	"px-1",
    ],
    second: [
      "flex flex-col",
    ],
    degree: [

    ],
    major: [
      major.length == 0 && "hidden",
    ],
    minor: [
      minor.length == 0 && "hidden",
    ],
    third: [

      "text-subtext",
    ],
  }
  return <div className={clsx(cls.education)}>
    <div className={clsx(cls.first)}>
    	<span className={clsx(cls.school)}>{school},</span>
    	<span className={clsx(cls.location)}>{city}</span>
    </div>
    <div className={clsx(cls.second)}>
    	<span className={clsx(cls.degree)}>{degree}</span>
    	<span className={clsx(cls.major)}>Major: {major}</span>
      <span className={clsx(cls.minor)}>Minor: {minor}</span>
    </div>
    <div className={clsx(cls.third)}>
      <span>{start} - </span>
     <span>{end}</span>
    </div>
  </div>
}