import React from 'react';
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class EditPlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            showNewSongsList: false
        };

        this.onPlaylistNameChange = this.onPlaylistNameChange.bind(this);
        this.showNewSongsToAdd = this.showNewSongsToAdd.bind(this);
    }

    componentDidMount() {
        if(this.props.editPlaylistInfo) {
            this.setState({ showNewSongsList: false, playlistName: this.props.editPlaylistInfo.playlistName })
        }
        else {
            this.setState({ showNewSongsList: false });
        }
    }

    onPlaylistNameChange(event) {
        this.setState({ playlistName: event.target.value })
    }

    savePlaylistAction(playlistInfo) {
        playlistInfo.playlistName = this.state.playlistName;
        this.props.savePlaylistFromEditPage(playlistInfo);
    }
    
    shuffleSongsInPlaylist(playlistInfo) {
        this.props.shufflePlaylistSongs(playlistInfo);
    }

    showNewSongsToAdd() {
        this.setState({ showNewSongsList: true });
    }

    render() {
        let editPlayList = this.props.editPlaylistInfo;
        let songList = editPlayList.songs;
        let newSongsList = [];
        let updatedNewSongsList = [];

        if (this.state.showNewSongsList) {
            if(this.props.filteredSearchResult && this.props.filteredSearchResult.length < 1) {
                newSongsList = this.props.songList;
            }
            else if (this.props.filteredSearchResult && this.props.filteredSearchResult.length > 0) {
                newSongsList = this.props.filteredSearchResult;
            }
            updatedNewSongsList = newSongsList;

            newSongsList.map((newSong, index) => {
                let songExists = songList.some(song => song.songId === newSong.id);
                if(songExists) {
                    updatedNewSongsList.splice(index, 1);
                }
            });

            newSongsList = updatedNewSongsList;
        }

        return (
            <Container>
                <Row>
                    <Col>Playlist <input type="text" value={this.state.playlistName} onChange={this.onPlaylistNameChange} /></Col>
                    <Col>
                        <ButtonGroup aria-label="list type">
                            <Button variant="light" onClick={this.shuffleSongsInPlaylist.bind(this, editPlayList)}>Shuffle playlist</Button>
                            <Button variant="light" onClick={this.showNewSongsToAdd}>Add song</Button>
                            <Button variant="light" onClick={this.savePlaylistAction.bind(this, editPlayList)}>Save playlist</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {
                    this.state.showNewSongsList && newSongsList && newSongsList.map((newSong, index) => {
                        return (
                            <SongInfo key={index} song={newSong} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} 
                                showAddSongInPlaylist={true} isEditPlaylist={true} showNewSongsList={true} addSongToEditPlaylist={this.props.addSongToEditPlaylist} />
                            );
                    })
                }
                {
                    songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={index} song={song} showThumbnails={this.props.showThumbnails} 
                                showDeleteSongInPlaylist={true} showAddSongInPlaylist={false} isEditPlaylist={true}  
                                removeSongFromEditPlaylist={this.props.removeSongFromEditPlaylist} />
                            );
                        })
                }                
            </Container>
            );
        }
}

export default EditPlaylistPage;