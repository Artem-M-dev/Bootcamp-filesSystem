import '../../css/modern-normalize.min.css'
import './app.scss';

import { Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import MainPage from '../mainPage/MainPage';


const App = () => {
    return (
        <Router>
            <div className="app">
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes>
                            <Route path='/*' element={<MainPage/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;