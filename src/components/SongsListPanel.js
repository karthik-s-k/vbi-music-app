import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';

class SongsListPanel extends React.Component {
    render() {
        let songList = [];

        if(this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1) {
            songList = this.props.songList;
        }
        else if (this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0) {
            songList = this.props.filteredSearchResult;
        }

        return (
            <Container>
                {
                    this.props.photosList && songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={index} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} />
                            );
                        })
                }
            </Container>
            );
        }
}

export default SongsListPanel;