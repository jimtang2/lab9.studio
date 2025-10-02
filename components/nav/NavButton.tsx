"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"

interface NavButtonProps {
  id: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  title?: string;
  icon: React.ReactNode;
  active?: boolean;
}

export default function NavButton({ id, href="", onClick, className, title="", icon, active=false}: NavButtonProps) {
  const path = usePathname()
  const isCurrent = (path == href) || active
  const isLink = href?.length > 0

  const cls = {
  	base: [
      "flex items-center justify-center",
      isCurrent ? "text-accent font-bold" : "text-subtext hover:text-text",
      "transition-all duration-150",
      className,
	  ],
	  icon: [
      "sm:hidden",
    ],
	  text: [
      "text-sm",
      "not-sm:hidden",
    ],
  }

  if (isLink) {
    return <Link id={id} href={href} className={clsx(cls.base)} title={title}>
      <span className={clsx(cls.icon)}>{icon}</span>
      <span className={clsx(cls.text)}>{title}</span>
    </Link>
  } else {
    return <button id={id} onClick={onClick} className={clsx(cls.base)}>
      <span className={clsx(cls.icon)}>{icon}</span>
      <span className={clsx(cls.text)}>{title}</span>
    </button>
  }

}