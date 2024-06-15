import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import PrivateRoute from './layout/PrivateRoute'
import Prediction from './pages/Prediction'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route index element={<Upload/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/prediction' element={<Prediction/>}/>
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App
