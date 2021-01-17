import React from "react";
import SearchPanel from "../components/SearchPanel";
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
        this.searchBoxChange = this.searchBoxChange.bind(this);
    }

    componentDidMount() {
        if(this.props.newPlaylistInfo) {
            this.setState({ playlistName: this.props.newPlaylistInfo.playlistName })
        }
    }

    searchBoxChange(event) {
        this.props.searchBoxChange(event.target.value);
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

        if(this.props.showFilteredResult && this.props.filteredSearchResult) {
            songList = this.props.filteredSearchResult;
        }
        else {
            songList = this.props.songList;
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
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="playlist-name">
                                    Playlist
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                            type="text"
                                            className="form-control"
                                            name="playlistName"
                                            id="playlistName"
                                            placeholder="playlist name "
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
                            <Button variant="light" onClick={this.savePlaylistAction.bind(this, playlistInfo)}>
                                Save playlist
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="col-sm-12  d-flex justify-content-center">
                    <div className="col-sm-8">
                        <SearchPanel 
                            searchBoxText={this.props.searchBoxText} 
                            searchBoxChange={this.searchBoxChange} 
                        />
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