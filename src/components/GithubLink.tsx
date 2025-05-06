import Image from "next/image"
import Link from "next/link"

export default function GithubLink() {
	return (
    <Link className="
      flex flex-row 
      items-center 
      p-2 
      hover:bg-background-hl
      rounded-sm" 
      href="https://github.com/jimtang2">
      <img className="" alt="github icon" 
        src="/github-mark.svg" 
        width={26} height={26} />
    </Link>)
}