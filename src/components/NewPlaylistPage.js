import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class NewPlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: ''
        };

        this.onPlaylistNameChange = this.onPlaylistNameChange.bind(this);
    }

    componentDidMount() {
        if(this.props.newPlaylistInfo) {
            this.setState({ playlistName: this.props.newPlaylistInfo.playlistName })
        }
    }

    onPlaylistNameChange(event) {
        this.setState({ playlistName: event.target.value })
    }

    savePlaylistAction(playlistInfo) {
        playlistInfo.playlistName = this.state.playlistName;
        this.props.savePlaylistFromNewPage(playlistInfo);
    }

    render() {
        debugger;
        let songList = [];
        let updatedSongsList = [];
        let playlistSongs = [];
        let playlistInfo = {};
        
        if(this.props.newPlaylistInfo) {
            playlistInfo = this.props.newPlaylistInfo;
            playlistSongs = playlistInfo.songs;
        }

        if(this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1) {
            songList = this.props.songList;
        }
        else if (this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0) {
            songList = this.props.filteredSearchResult;
        }
        updatedSongsList = songList;

        playlistSongs.map((playlistSong, index) => {
            let songExists = songList.some(song => song.id === playlistSong.songId);
            if(songExists) {
                updatedSongsList.splice(index, 1);
            }
        });

        songList = updatedSongsList;

        return (
            <Container>
                <Row>
                <Col>Playlist <input type="text" value={this.state.playlistName} onChange={this.onPlaylistNameChange} /></Col>
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