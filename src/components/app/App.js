import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, NotFound, SingleComicPage} from '../pages';

const App = () => { 
     return (
         <BrowserRouter>
            <div className="app">
                    <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SingleComicPage/>}/>
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;