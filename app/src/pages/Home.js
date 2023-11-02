import { useEffect, useState } from "react"
import { Header } from "../components/Header/Header"
import { SlideList } from "../components/SlideList/SlideList"
import { ApiService } from "../services/ApiService"
import { TRENDING_MOVIES_ENDPOINT } from "../constants/Endpoints"

export function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await ApiService.get(TRENDING_MOVIES_ENDPOINT)
        setMovies(response.data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }

    fetchMovies()
  }, [])

  return (
    <>
      <Header />
      <SlideList title='Trending' list={movies} />
      <SlideList title='For You' list={movies} />
    </>
  )
}
