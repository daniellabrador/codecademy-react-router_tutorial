import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Local(props) {
  const [albums, setAlbums] = useState([]);

  useEffect(()=>{
    const getAccessToken = () => {
      if (props.accessToken){
        return props.accessToken;
      } else if (window.location.href.match(/access_token=([^&]*)/)){
        const accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
        setTimeout(() => props.accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        props.setAccessToken(accessToken);
        return accessToken;
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

    const fetchItems = async () => {
      try {
        const endpoint = `https://api.spotify.com/v1/browse/new-releases?country=${props.countryCode || 'US'}&offset=0&limit=50`;
        const response = await fetch(endpoint, {
          headers: {Authorization: `Bearer ${getAccessToken()}`}
        });
        const json = await response.json();
        const albums = await json.albums.items;
        setAlbums(albums)
      } catch (e){
        console.log(e)
      }
    }

    fetchItems();
  }, [props])

  return (
    <div className="featured">
      <h2>
        New Releases
        <br />
        <span className="uppercase" style={{fontSize: '.625em', color: '#1ED760', top: '-.5em', position: 'relative'}}>
          {props.parsedCountry && 'Hits in '}
          {props.parsedCountry || 'Local Hits'}
        </span>
      </h2>
      <ul className="albums">
        {albums.map(album=>{
          return (
            <li key={album.id}><Link to={`/music/${album.id}`}>
              <img src={album.images[1].url} alt={album.name} style={{maxWidth: 300}}/>
              <p style={{maxWidth: 300}}>{album.name}</p>
            </Link></li>
          )
        })}
      </ul>
    </div>    
  )
}

export default Local;
