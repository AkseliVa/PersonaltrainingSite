import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import Home from './components/Home.jsx'
import Customerlist from './components/Customerlist.jsx'
import Traininglist from './components/Traininglist.jsx'
import Calendar from './components/Calendar'
import Statistics from './components/Statistics'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "Customerlist",
        element: <Customerlist />
      },
      {
        path: "Traininglist",
        element: <Traininglist />
      },
      {
        path: "Calendar",
        element: <Calendar />
      },
      {
        path: "Statistics",
        element: <Statistics />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
