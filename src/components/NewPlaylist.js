import React from 'react';
import PlaylistInfo from "./PlaylistInfo";

class NewPlaylist extends React.Component {
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
                    this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1 && 
                    this.props.songList && this.props.songList.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} showPlaylistOptions={true} />
                            );
                        })
                }
                {
                    this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0 && 
                    this.props.filteredSearchResult && this.props.filteredSearchResult.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} showPlaylistOptions={true} />
                            );
                        })
                }
            </div>
            );
        }
}

export default NewPlaylist;