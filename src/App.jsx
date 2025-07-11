import './App.css'
import EntryView from './Components/EntryView/EntryView'
import LoginPage from './Components/LoginPage/LoginPage'
import { BrowserRouter,Route,Routes } from 'react-router'
import React  from 'react'
import Home from './Components/Home/Home'
import Moviedetails from './Components/Moviedetails/Moviedetails'
import Tvshowdetails from './Components/Tvshowdetails/Tvshowdetails'
import SearchMovies from './Components/SearchMovies/SearchMovies'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFoundPage from './NotFoundPage/NotFoundPage'
const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/home' element={
                    <Home/>
                }/>
                
                <Route path='/' element={<EntryView/>}/>
                <Route path='/movie/:id' element={<ProtectedRoute><Moviedetails/></ProtectedRoute>}/>
                <Route path='/tvshow/:id' element={<ProtectedRoute><Tvshowdetails/></ProtectedRoute>}/>
                <Route path='/search' element={<ProtectedRoute><SearchMovies/></ProtectedRoute>}/>
                <Route path='/*' element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}





export default App