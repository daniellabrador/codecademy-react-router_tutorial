import './App.css';
import { useEffect, useState} from 'react';

function AlbumDetail(props) {
  const [album, setAlbum] = useState({});

  let id = window.location.href.match(/\/music\/([^&]*)/)[1]

  useEffect(()=>{
    const fetchAlbum = async () => {
      try {
        const albumEndpoint = `https://api.spotify.com/v1/albums/${id}`;
        const albumResponse = fetch(albumEndpoint, {
          headers: {Authorization: `Bearer ${props.accessToken}`}
        });
        
        const tracksEndpoint = `https://api.spotify.com/v1/albums/${id}/tracks?offset=0`;
        const tracksResponse = fetch(tracksEndpoint, {
          headers: {Authorization: `Bearer ${props.accessToken}`}
        });

        const responses = await Promise.all([albumResponse, tracksResponse])

        const jsons = await Promise.all([responses[0].json(), responses[1].json()])

        const albumName = await jsons[0].name;
        const albumTracks = await jsons[1].items;
        const albumCover = await jsons[0].images[1].url;
        const albumCopyright = await jsons[0].copyrights[0].text;
        const albumLink = await jsons[0].external_urls.spotify;

        setAlbum({
          name: albumName,
          tracks: albumTracks,
          cover: albumCover,
          copyright: albumCopyright,
          link: albumLink
        })
      } catch (e){
        console.log(e)
      }
    }

    fetchAlbum();
  }, [props, id])

  if (!album.tracks) {
    return <></>
  }

  return (
    <div className="previews">
      <div className="album-description">
        <img src={album.cover} alt={`${album.name} cover`}/>
        <div className="album-description-details">
          <h2>{album.name}</h2>
          <p>{album.copyright}</p>
          <a href={album.link}>Play in Spotify</a>
        </div>
      </div>

      <ul className="album">
        {album.tracks.map(track=>{
        return (
          <li key={track.track_number}>
            <a href={track.external_urls.spotify}>{track.name} <span>(Preview)</span></a>{ track.preview_url ?
            (<audio controls>
              <source src={track.preview_url} type="audio/mpeg" />
              <p>Your browser doesn't support HTML5 audio. Here is
              a <a href="myAudio.mp3">link to the audio</a> instead.</p>
            </audio>): <p>No preview audio clip available.</p>}
          </li>
        )
      })}
      </ul>
    </div>    
  )
}

export default AlbumDetail;
