import React, { useEffect, useRef, useState } from "react"
import s from "./InfiniteSlider.module.css"

export function InfiniteSlider({ children }) {
  const carouselRef = useRef(null)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev >= children.length) {
          return 0
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const imagesList = children.slice(
    (currentImage - 2) % children.length,
    (currentImage + 3) % children.length
  )

  const handleMouseEnter = () => {
    const carousel = carouselRef.current
    carousel.style.animationPlayState = "paused"
  }

  const handleMouseLeave = () => {
    const carousel = carouselRef.current
    carousel.style.animationPlayState = "running"
  }

  return (
    <div className={s.logos}>
      <div
        className={s.logosSlide}
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={s.slide}>{imagesList}</div>
      </div>
    </div>
  )
}
