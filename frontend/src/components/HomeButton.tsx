import { useNavigate } from 'react-router-dom'

// when clicked => go to home
export const HomeButton = () => {
  let navigate = useNavigate()

  function handleClick() {
    navigate('/home')
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  )
}
