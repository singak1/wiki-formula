import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Home from './pages/Home';
import NewSeason from './pages/NewSeason';
import NewResult from './pages/NewResult';
import UpdateDStandings from './pages/UpdateDStandings';
import { lastResulContext } from './Contexts/lastResult';
import { nextRaceContext } from './Contexts/nextRaceContext';
import DriverStandingsPage from './pages/DriverStandingsPage';
import ConstructorStandingsPage from './pages/ConstructorStandingsPage';
import UpdateCStandings from './pages/UpdateCStandings';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [lastResult, setLastResult] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  
  return (
    <div className="App">
      <lastResulContext.Provider value={{lastResult, setLastResult}}>
        <nextRaceContext.Provider value={{nextRace, setNextRace}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newseason" element={<NewSeason />} />
            <Route path="/newresult" element={<NewResult />} />
            <Route path="/newdriverstandings" element={<UpdateDStandings/>} />
            <Route path="/newconstructorstandings" element={<UpdateCStandings />} />
            <Route path="/standings/WDC" element={<DriverStandingsPage />} />
            <Route path="/standings/WCC" element={<ConstructorStandingsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
        </nextRaceContext.Provider>
      </lastResulContext.Provider>
    </div>
  );
}

export default App;
