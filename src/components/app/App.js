import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const NotFound = React.lazy(() => import('../pages/notFound/NotFound'));
const MainPage = React.lazy(() => import('../pages/MainPage'));
const ComicsPage = React.lazy(() => import('../pages/ComicsPage/ComicsPage'));
const SingleComicPage = React.lazy(() => import('../pages/ComicsPage/SingleComicPage'));

const App = () => { 

     return (
         <BrowserRouter>
            <div className="app">
                    <AppHeader/>
                <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SingleComicPage/>}/>
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </Suspense>
                </main> 
            </div>
        </BrowserRouter>
    )
}

export default App;