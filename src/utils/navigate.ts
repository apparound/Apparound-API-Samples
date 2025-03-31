import { useNavigate } from 'react-router-dom'

const useRelativeNavigate = () => {
  const basePath: string = window.location.pathname.split('/').filter((part: string) => !!part)[0] || ''
  const navigate = useNavigate()
  return (relativePath: string) => {
    navigate(`/${basePath}${relativePath}`)
  }
}

export default useRelativeNavigate
