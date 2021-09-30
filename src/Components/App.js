import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Home from './Home';
import Local from './Local';
import Global from './Global';
import AlbumDetail from './AlbumDetail';
import GetLocation from './util/GetLocation';
import './App.css';

function App() {
  
  const [ accessToken, setAccessToken ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ parsedCountry, setParsedCountry ] = useState('');
  const [ countryCode, setCountryCode ] = useState('');

  useEffect(()=>{
    const setCountryDetails = async () => {
      const countryResponse = await GetLocation();
      setCountry(countryResponse.country);
      setParsedCountry(countryResponse.parsedCountry);
      setCountryCode(countryResponse.countryCode);
    }

    setCountryDetails();
  }, [])

  return (
    <Router>
    {/* {console.log([country, parsedCountry, countryCode])} */}
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" render={()=>{
            return <Home accessToken={accessToken} setAccessToken={setAccessToken} name="test"/>
          }} />
          <Route exact path="/local" render={()=>{
            return <Local accessToken={accessToken} setAccessToken={setAccessToken} name="test" country={country} parsedCountry={parsedCountry} countryCode={countryCode}/>
          }} />
          <Route exact path="/global" render={()=>{
            return <Global accessToken={accessToken} setAccessToken={setAccessToken} name="test"/>
          }} />
          <Route path="/music/:id" render={()=>{
            return <AlbumDetail accessToken={accessToken} setAccessToken={setAccessToken} />
          }} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
