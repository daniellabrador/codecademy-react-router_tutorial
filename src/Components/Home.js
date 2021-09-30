import { Link } from 'react-router-dom';
import banner from './img/banner.jpg';
import './App.css';

const Home = (props) => {
  if (window.location.href.match(/access_token=([^&]*)/)){
      const accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      setTimeout(() => props.accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      try {
        props.setAccessToken(accessToken);
      } catch (e) {

      }
      return accessToken;
  } 

  const getAccessToken = () => {
    if (props.accessToken){
      return props.accessToken;
    } else {
      const clientID = "c4389a24cf894fd1b59be6aed0b1288f";
      const spotifyAuthorizeEndpoint = 'https://accounts.spotify.com/authorize'
      let redirectURLAfterLogin = window.location.href.replaceAll('/', '%2F');
      // let redirectURLAfterLogin = 'http://localhost:3000/music'.replaceAll('/', '%2F');
      redirectURLAfterLogin = redirectURLAfterLogin.replaceAll('-', '%2D');
  
      const scopes = ['playlist-modify-public']
      const spaceDelimiter = "%20"
      const scopesURLParam = scopes.join(spaceDelimiter)

      window.location = `${spotifyAuthorizeEndpoint}?client_id=${clientID}&redirect_uri=${redirectURLAfterLogin}&scope=${scopesURLParam}&response_type=token&show_dialogue=true`;
    }
  }

  return (<>
  <div className="col-span-12" style={{maxHeight: '20vh', overflow: 'hidden'}}>
    <img src={banner} alt="Banner"  style={{width: '100%'}}/>
  </div>
  <div className="col-grid app-home" style={{paddingBottom: '10vh'}}>
    <h2 className="col-span-12" style={{textAlign: 'left', marginBottom: 0}}>Spotify Music Previews</h2>
    <p className="col-span-12" style={{textAlign: 'left', margin: 0}}>
      Explore new music hits with Spotify Music Previews.
      {!props.accessToken && ' To access this app, you need to sign in using your Spotify account (required by Spotify).'}
    </p>
    {!props.accessToken && <div className="uppercase col-span-3 buttons" onClick={getAccessToken}><i className="fab fa-spotify"></i>Log In With Spotify</div>}
    {props.accessToken && <div className="col-span-12 button-container">
      <Link to="/local"><div className="buttons">Local<span></span></div></Link>
      <Link to="/global"><div className="col-span-4 buttons">Global<span></span></div></Link>
    </div>}
  </div>
  </>)}

export default Home;
