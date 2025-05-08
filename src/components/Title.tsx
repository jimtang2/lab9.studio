"use client"
import { useEffect } from "react"
import { useNavStore } from "@/lib/store"

type TitleProps = {
	title: string
}

export default function Title({ title }: TitleProps) {
	const { setTitle } = useNavStore()
	useEffect(() => setTitle(title), [])
	return <></>
}