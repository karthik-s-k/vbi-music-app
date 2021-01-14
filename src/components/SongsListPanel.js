import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';

class SongsListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }

    render() {
        return (
            <Container>
                {
                    this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1 && 
                    this.props.photosList && this.props.songList && this.props.songList.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} />
                            );
                        })
                }
                {
                    this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0 && 
                    this.props.photosList && this.props.filteredSearchResult && this.props.filteredSearchResult.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} />
                            );
                        })
                }
            </Container>
            );
        }
}

export default SongsListPanel;