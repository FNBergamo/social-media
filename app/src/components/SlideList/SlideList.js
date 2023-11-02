import { Carousel } from "../Carousel/Carousel"
import s from "./SlideList.module.css"

const img = "https://image.tmdb.org/t/p/w220_and_h330_face"

export function SlideList({ title, list }) {
  return (
    <section className={s.slideList}>
      <div className={s.container}>
        <h3>{title}</h3>
        <Carousel>
          {list.map((movie) => (
            <img
              src={img + movie.poster_path}
              alt={movie.title}
              key={movie.id}
            />
          ))}
        </Carousel>
      </div>
    </section>
  )
}
