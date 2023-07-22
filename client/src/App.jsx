import {BrowserRouter, Route, Routes} from "react-router-dom"
import Entities from "./pages/entities/Entities.jsx";
import './App.css'
import Chart from "./pages/canvas/Chart.jsx";
import {useEffect} from "react";
import {fetchEntities} from "./asyncActions/entities.js";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchEntities())
    }, [])

  return (
   <BrowserRouter>
        <Routes>
            <Route path={"/entities"} element={<Entities/>}/>
            <Route path={"/chart"} element={<Chart/>}/>
        </Routes>
   </BrowserRouter>
  )
}

export default App
