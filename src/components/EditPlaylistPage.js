import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class EditPlaylistPage extends React.Component {

    savePlaylistAction(playlistInfo) {
        this.props.savePlaylistFromEditPage(playlistInfo);
    }

    render() {
        let editPlayList = this.props.editPlaylistInfo;
        let songList = editPlayList.songs;

        // if(this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1) {
        //     songList = this.props.songList;
        // }
        // else if (this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0) {
        //     songList = this.props.filteredSearchResult;
        // }

        return (
            <Container>
                <Row>
                    <Col>Playlist {editPlayList.playlistName}</Col>
                    <Col>
                        <ButtonGroup aria-label="list type">
                            <Button variant="light">Shuffle playlist</Button>
                            <Button variant="light">Add song</Button>
                            <Button variant="light" onClick={this.savePlaylistAction.bind(this, editPlayList)}>Save playlist</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {
                    songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={index} song={song} editPlaylistInfo={editPlayList} showThumbnails={this.props.showThumbnails} 
                                showDeleteSongInPlaylist={true} isEditPlaylist={true}  
                                removeSongFromEditPlaylist={this.props.removeSongFromEditPlaylist} />
                            );
                        })
                }
            </Container>
            );
        }
}

export default EditPlaylistPage;