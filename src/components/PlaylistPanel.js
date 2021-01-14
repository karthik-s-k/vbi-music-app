import React from 'react';
import PlaylistInfo from "./PlaylistInfo";

class PlayListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <div>
                {
                    this.props.playlistSet && this.props.playlistSet.map((playlist, index) => {                  
                        return (
                            <div>
                                Playlist {playlist.Number}
                                Created At {playlist.CreatedAt}
                                // <div>
                                //     <PlaylistInfo key={playlist.playlist_id} playlistSongs={this.props.playlistSongs} />
                                // </div>
                            </div>
                            );
                        })
                }                

                <div name="createPlaylist" id="createPlaylist" onClick={this.props.createNewPlaylist}>Create Playlist</div>
            </div>
            );
        }
}

export default PlayListPanel;