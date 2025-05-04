'use client'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Loading from "../app/loading"

export default function AnimatedBackground() {
  const [_dx, _dy] = [0.02, 0.05]
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const [dx, setDx] = useState(1 * _dx)
  const [dy, setDy] = useState(-1 * _dy)

  useEffect(() => {
    let animationFrameId: number
    let frameCount = 0

    const animate = () => {
      frameCount++
      if (frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      setX((prevX) => {
        let newX = prevX + dx
        if (newX >= 99 && dx > 0) {
          setDx(-1 * _dx)
          newX = 99
        } else if (newX <= 1 && dx < 0) {
          setDx(1 * _dx)
          newX = 1
        }
        return newX
      })

      setY((prevY) => {
        let newY = prevY + dy
        if (newY >= 99 && dy > 0) {
          setDy(-1 * _dy)
          newY = 99
        } else if (newY <= 1 && dy < 0) {
          setDy(1 * _dy)
          newY = 1
        }
        return newY
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dx, dy])

  return (
    <div className={`
      fixed 
      top-0
      w-full 
      h-full 
    `}>
      <Suspense fallback={<Loading />}>
        <Image
          className="h-full object-none"
          style={{ objectPosition: `${x}% ${y}%` }}
          src="/17384x5558.jpg"
          alt="Large Image"
          height={5558}
          width={17384}
          loading="eager"
        />
      </Suspense>
    </div>
  )
}