import { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Menu from './Menu/Menu'
import Dashboard from './Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'
import Orders from './Orders/Orders'

function App() {

  return (
    <>
      
        <Routes>
          <Route path="/" element={
            <div className='page'>
              <Sidebar/>
              <div className='page__menu'>
                <Dashboard />
              </div>
              
            </div>
          }/>
          <Route path="/menu" element={
            <div className='page'>
              <Sidebar/>
              <div className='page__menu'>
                <Menu />
              </div>
              
            </div>
          }/>
          <Route path="/orders" element={
            <div className='page'>
              <Sidebar/>
              <div className='page__menu'>
                <Orders />
              </div>
            </div>
          }/>
        </Routes>
    </>
  )
}

export default App
