import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
    return (
        <WeatherProvider>
            <Router>
                <Routes>
                    <Route path='/' element = {<Home />} />
                    <Route path='/search' element = {<Search />} />
                </Routes>
            </Router>
        </WeatherProvider>
    );
};

export default App;
