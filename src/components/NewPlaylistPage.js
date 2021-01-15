import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class NewPlaylistPage extends React.Component {
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
                <Row>
                    <Col>Playlist 1</Col>
                    <Col>
                        <ButtonGroup aria-label="list type">
                            <Button variant="light" onClick={this.props.savePlaylistFromNewPage}>Save playlist</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {
                    this.props.photosList && songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={song.id} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} 
                                showAddSongInPlaylist={true} />
                            );
                        })
                }
            </Container>
            );
        }
}

export default NewPlaylistPage;