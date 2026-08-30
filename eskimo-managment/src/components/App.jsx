import { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Menu from './Menu/Menu'

function App() {
    const [page, setPage] = useState('cardapio')

  return (
    <>
      <div className='page'>
        <Sidebar setPage={setPage} />
        <div className='page__menu'>
          {page === 'cardapio' && <Menu />}
        </div>
      </div>
    </>
  )
}

export default App
