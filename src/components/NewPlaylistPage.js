import React from "react";
import SongInfo from "./SongInfo";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

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
            <div className="container">
                <div className="row no-gutters mb-3">
                    <div className="col-sm-10 px-3">
                        <h3>                   
                            <span>Playlist </span>         
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    className="form-control"
                                    name="playlistName"
                                    id="playlistName"
                                    placeholder="Playlist name "
                                    autoFocus=""
                                    onChange={this.onPlaylistNameChange}
                                    autoComplete="off"
                                    value={this.state.playlistName}
                                />
                            </InputGroup>
                        </h3>
                    </div>
                    <div className="col-sm-2">
                        <ButtonGroup aria-label="list type" className="d-flex">
                            <Button variant="light" onClick={this.props.savePlaylistFromNewPage}>
                                Save playlist
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                {
                    this.props.photosList && songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={index} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} 
                                showAddSongInPlaylist={true}
                                addSongToNewPlaylist={this.props.addSongToNewPlaylist} />
                            );
                        })
                }
            </div>
            );
        }
}

export default NewPlaylistPage;