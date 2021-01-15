import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class NewPlaylistPage extends React.Component {

    savePlaylistAction(playlistInfo) {
        this.props.savePlaylistFromNewPage(playlistInfo);
    }

    render() {
        let songList = [];
        let playlistInfo = {};
        
        if(this.props.newPlaylistInfo) {
            playlistInfo = this.props.newPlaylistInfo;
        }

        if(this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1) {
            songList = this.props.songList;
        }
        else if (this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0) {
            songList = this.props.filteredSearchResult;
        }

        return (
            <Container>
                <Row>
                    <Col>Playlist: {playlistInfo.playlistName}</Col>
                    <Col>
                        <ButtonGroup aria-label="list type">
                            <Button variant="light" onClick={this.savePlaylistAction.bind(this, playlistInfo)}>Save playlist</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {
                    this.props.photosList && songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} 
                                showAddSongInPlaylist={true} playlistInfo={playlistInfo} 
                                addSongToNewPlaylist={this.props.addSongToNewPlaylist} />
                            );
                        })
                }
            </Container>
            );
        }
}

export default NewPlaylistPage;