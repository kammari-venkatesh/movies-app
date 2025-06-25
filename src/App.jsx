import './App.css'
import EntryView from './Components/EntryView/EntryView'
import LoginPage from './Components/LoginPage/LoginPage'
import { BrowserRouter,Route,Routes } from 'react-router'
const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/' element={<EntryView/>}/>
            </Routes>
        </BrowserRouter>
    )
}





export default App