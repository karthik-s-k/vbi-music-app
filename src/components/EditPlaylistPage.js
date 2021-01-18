import React from "react";
import SearchPanel from "../components/SearchPanel";
import SongInfo from "./SongInfo";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class EditPlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: ''
        };

        this.onPlaylistNameChange = this.onPlaylistNameChange.bind(this);
        this.showNewSongsToAdd = this.showNewSongsToAdd.bind(this);
        this.searchBoxChange = this.searchBoxChange.bind(this);
    }

    componentDidMount() {
        if(this.props.editPlaylistInfo) {
            this.setState({ playlistName: this.props.editPlaylistInfo.playlistName });
        }
        else {
            this.props.disableShowNewSongsInEditPlaylistPageIndicator();
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
        this.props.savePlaylistFromEditPage(playlistInfo);
    }
    
    shuffleSongsInPlaylist(playlistInfo) {
        this.props.shufflePlaylistSongs(playlistInfo);
    }

    showNewSongsToAdd() {
        this.props.setShowNewSongsInEditPlaylistPageIndicator();
    }

    render() {
        let editPlayList = this.props.editPlaylistInfo;
        let songList = editPlayList.songs;
        let newSongsList = [];
        let updatedNewSongsList = [];
        let searchResultCount = 0;
        let searchResultText = "";

        if (this.props.showNewSongsInEditPlaylistPage) {
            if(this.props.showFilteredResult && this.props.filteredSearchResult) {
                newSongsList = this.props.filteredSearchResult;
            }
            else {
                newSongsList = this.props.songList;
            }
            updatedNewSongsList = newSongsList;

            if (newSongsList && newSongsList.length > 0) {
                newSongsList.map((newSong, index) => {
                    if (songList.some(song =>  song.songId === newSong.id)) {
                        updatedNewSongsList.splice(index, 1);
                    }
                })
            }

            newSongsList = updatedNewSongsList;            
            searchResultCount = newSongsList.length;

            if (searchResultCount === 0) {
                searchResultText = "No records found";
            }
            else if (searchResultCount === 1) {
                searchResultText = "Found 1 record";
            }
            else {
                searchResultText = "Showing " + searchResultCount + " records";
            }
        }

        return (
            <div className="container">
                <div className="row no-gutters mb-3">
                    <div className="col-sm-6 px-3">
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
                    <div className="col-sm-6">
                        <ButtonGroup aria-label="list type" className="d-flex">
                            <Button variant="light" onClick={this.shuffleSongsInPlaylist.bind(this, editPlayList)}>
                                <i class="fas fa-random"></i> Shuffle playlist
                            </Button>
                            <Button variant="light" onClick={this.showNewSongsToAdd}>
                                <i class="fas fa-plus"></i> Add song
                            </Button>
                            <Button variant="light" onClick={this.savePlaylistAction.bind(this, editPlayList)}>
                                <i class="fas fa-save"></i> Save playlist
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                {
                    this.props.showNewSongsInEditPlaylistPage ?
                        <div className="col-sm-12  d-flex justify-content-center">
                            <div className="col-sm-8">
                                <SearchPanel 
                                    searchBoxText={this.props.searchBoxText} 
                                    searchBoxChange={this.searchBoxChange} 
                                />
                                {
                                    (this.props.showFilteredResult && this.props.filteredSearchResult) ?
                                        <div style={{float: "right", paddingBottom: "1%"}}>
                                            { searchResultText }
                                        </div>
                                        : null
                                }    
                            </div>
                        </div>
                        : null 
                }
            
                {
                    this.props.showNewSongsInEditPlaylistPage && newSongsList && newSongsList.map((newSong, index) => {
                        return (
                            <SongInfo key={index} song={newSong} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} bgColor={"white"}
                                showAddSongInPlaylist={true} isEditPlaylist={true} showNewSongsList={true} addSongToEditPlaylist={this.props.addSongToEditPlaylist} />
                            );
                    })
                }
                
                {
                    songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={index} song={song} showThumbnails={this.props.showThumbnails} bgColor={"lavender"}
                                showDeleteSongInPlaylist={true} showAddSongInPlaylist={false} isEditPlaylist={true}  
                                removeSongFromEditPlaylist={this.props.removeSongFromEditPlaylist} />
                            );
                        })
                }                
            </div>
            );
        }
}

export default EditPlaylistPage;