import Image from "next/image"
import Link from "next/link"

export default function GithubLink() {
	return (
    <Link className="
      flex flex-row 
      items-center 
      p-2 
      hover:bg-background-lt" 
      href="https://github.com/jimtang2/lab9.studio">
      <img className="" alt="github icon" 
        src="/logos/github-icon.svg" 
        width={24} height={24} />
    </Link>)
}