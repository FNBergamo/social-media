import React, { useState } from "react"
import s from "./Carousel.module.css"

export function Carousel({ children, size = 5 }) {
  const middleImageIndex = Math.floor(size / 2)
  const [currentImage, setCurrentImage] = useState(middleImageIndex)

  // async function teste() {
  // const result = await ApiService.post("http://localhost:3000/api/usuarios", {
  //   name: "teste",
  //   email: "teste",
  //   password: "teste",
  // })
  // const result = await ApiService.get("http://localhost:3000/api/movies")
  // console.log(result)
  // }

  function back() {
    currentImage <= middleImageIndex
      ? setCurrentImage(children.length - 1 - middleImageIndex)
      : setCurrentImage(currentImage - 1)
  }

  function foward() {
    currentImage >= children.length - 1 - middleImageIndex
      ? setCurrentImage(middleImageIndex)
      : setCurrentImage(currentImage + 1)
  }

  const start = (currentImage - 2 + children.length) % children.length
  const end = (currentImage + 3) % children.length

  const imagesList =
    end > start
      ? children.slice(start, end)
      : [...children.slice(start), ...children.slice(0, end)]

  return (
    <div className={s.logos}>
      <div className={s.logosSlide}>
        <div className={s.buttons}>
          <button onClick={back}>voltar</button>
          <button onClick={foward}>avançar</button>
        </div>
        <div className={s.slide}>{imagesList}</div>
      </div>
    </div>
  )
}
