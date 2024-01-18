import cn from 'classnames'
import s from './Loader.module.css'
import { LOADER_SIZE } from '../../constants/loaderSize'

export function Loader({ size = LOADER_SIZE.MEDIUM, fullscreen = false }) {
  const loaderClassNames = cn(s.loader, {
    [s.big]: size === LOADER_SIZE.BIG,
    [s.medium]: size === LOADER_SIZE.MEDIUM,
    [s.small]: size === LOADER_SIZE.SMALL,
  })

  return (
    <div className={cn(s.loaderContainer, { [s.fullscreen]: fullscreen })}>
      <div className={loaderClassNames} />
    </div>
  )
}
