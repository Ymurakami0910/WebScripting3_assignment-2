import { useState } from 'react'
import AllBooks from './pages/allBooks.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <AllBooks/>
    </>
  )
}

export default App
