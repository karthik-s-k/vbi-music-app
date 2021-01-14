import React from 'react';
import SongInfo from "./SongInfo";

class PlaylistInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <div>
                
                Playlist 
                Created At { this.props.playlist}
                {
                    this.props.playlistSongs && this.props.playlistSongs.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} createNewPlaylist={this.props.createNewPlaylist} />
                            );
                        })
                }
            </div>
            );
        }
}

export default PlaylistInfo;