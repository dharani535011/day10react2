
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Users from './pages/Users'
import User from './pages/User'


const router=createBrowserRouter([{
       path:"/",
       element:<Users/>
},
{
  path:"/user/:id",
  element:<User/>
}])



function App() {
  

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
