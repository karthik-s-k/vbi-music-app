import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "../components/Header";
import SongsListPanel from "../components/SongsListPanel";
import ShowAllPlaylistPage from "../components/ShowAllPlaylistPage";
import NewPlaylistPage from "../components/NewPlaylistPage";
import EditPlaylistPage from "../components/EditPlaylistPage";

import * as MusicActions from "../actions/MusicActions";
import "../assets/CSS/Main.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSongsTabSelected: true,
            playlistTabSelected: false,
            showNewPlaylistPage: false,
            showEditPlaylistPage: false,
            showNewSongsInEditPlaylistPage: false,
            showThumbnails: false,
            searchBoxText: '',
            showFilteredResult: false,
            filteredSearchResult: [],
            newPlaylistInfo: {},
            editPlaylistInfo: {},
            userAllPlaylists: []
        };

        this.searchBoxChange = this.searchBoxChange.bind(this);
        this.allSongsTabSelect = this.allSongsTabSelect.bind(this);
        this.playlistTabSelect = this.playlistTabSelect.bind(this);

        this.fetchAllSongsList = this.fetchAllSongsList.bind(this);
        this.fetchSongsByName = this.fetchSongsByName.bind(this);
        this.fetchAllPhotosList = this.fetchAllPhotosList.bind(this);
        this.toggleShowingThumnails = this.toggleShowingThumnails.bind(this);

        this.setShowNewPlaylistPageIndicator = this.setShowNewPlaylistPageIndicator.bind(this);
        this.setShowEditPlaylistPageIndicator = this.setShowEditPlaylistPageIndicator.bind(this);
        this.savePlaylistFromNewPage = this.savePlaylistFromNewPage.bind(this);
        this.savePlaylistFromEditPage = this.savePlaylistFromEditPage.bind(this);
        this.addSongToNewPlaylist = this.addSongToNewPlaylist.bind(this);
        this.removeSongFromEditPlaylist = this.removeSongFromEditPlaylist.bind(this);
        this.shufflePlaylistSongs = this.shufflePlaylistSongs.bind(this);
        this.addSongToEditPlaylist = this.addSongToEditPlaylist.bind(this);
        this.setShowNewSongsInEditPlaylistPageIndicator = this.setShowNewSongsInEditPlaylistPageIndicator.bind(this);
        this.disableShowNewSongsInEditPlaylistPageIndicator = this.disableShowNewSongsInEditPlaylistPageIndicator.bind(this);
        this.deleteCurrentPlaylist = this.deleteCurrentPlaylist.bind(this);
    }

    componentDidMount() {
        this.fetchAllSongsList();
    }
    
    allSongsTabSelect() {
        this.setState({ 
                allSongsTabSelected: true, playlistTabSelected: false, showNewPlaylistPage: false, 
                showEditPlaylistPage: false, showNewSongsInEditPlaylistPage: false, showFilteredResult: false,
                searchBoxText: '', filteredSearchResult: []
            }, this.fetchAllSongsList());
    }
    playlistTabSelect() {
        let userPlaylists = [];
        if(localStorage.getItem("userPlaylists")) {
            userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
        }        

        this.setState({ 
                playlistTabSelected: true, allSongsTabSelected: false, showNewPlaylistPage: false, 
                showNewSongsInEditPlaylistPage: false, showEditPlaylistPage: false, showFilteredResult: false,
                searchBoxText: '', filteredSearchResult: [],
                newPlaylistInfo: {}, editPlaylistInfo: {}, userAllPlaylists: userPlaylists 
            });
    }
    toggleShowingThumnails() {
        this.setState({ showThumbnails: !this.state.showThumbnails });
    }

    fetchAllSongsList() {
        this.props.MusicActions.getAllSongsList();
        this.fetchAllPhotosList();
    }    
    fetchAllPhotosList() {
        this.props.MusicActions.getAllPhotosList();
    }

    searchBoxChange(text) {
        this.setState({ searchBoxText: text }, this.fetchSongsByName(text));
    }
    fetchSongsByName(songName) {
        if(songName === "") {
            this.setState({ filteredSearchResult: [], showFilteredResult: false });
        }
        else {            
            songName = songName.toLowerCase();
            let filteredResult = this.props.songsInfo.songList.filter(song => song.title.includes(songName));

            this.setState({ filteredSearchResult: filteredResult, showFilteredResult: true });
        }        
    }

    setShowNewPlaylistPageIndicator() {
        let playlistCounter = 0;
        if(localStorage.getItem("userPlaylists")) {
            let userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
            playlistCounter = userPlaylists.length;
        }

        let playlistInfo = {
            "playlistId": playlistCounter + 1,
            "playlistName": playlistCounter + 1,
            "createdDate": new Date(),
            "updatedDate": new Date(),
            "songs": []
          };

        this.setState({ 
            showNewPlaylistPage: true, showEditPlaylistPage: false, newPlaylistInfo: playlistInfo,
            searchBoxText: '', filteredSearchResult: []
        });
    }
    setShowEditPlaylistPageIndicator(selectedPlaylist) {
        this.setState({ 
            showEditPlaylistPage: true, showNewPlaylistPage: false, editPlaylistInfo: selectedPlaylist, 
            searchBoxText: '', filteredSearchResult: [], showNewSongsInEditPlaylistPage: false 
        });
    }
    setShowNewSongsInEditPlaylistPageIndicator() {
        this.setState({ showNewSongsInEditPlaylistPage: true });
    }
    disableShowNewSongsInEditPlaylistPageIndicator() {
        this.setState({ showNewSongsInEditPlaylistPage: false });
    }

    savePlaylistFromNewPage(playlistInfo) {
        let userPlaylists = [];
        let savePlaylistData = playlistInfo;
        
        savePlaylistData.updatedDate = new Date();

        if(localStorage.getItem("userPlaylists")) {
            userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
            localStorage.removeItem("userPlaylists");            
        }

        userPlaylists.push(savePlaylistData);            
        localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));

        this.setState({ showNewPlaylistPage: false, showEditPlaylistPage: false, showFilteredResult: false,
            userAllPlaylists: userPlaylists, newPlaylistInfo: {} 
        });
    }
    savePlaylistFromEditPage(playlistInfo) {
        let userPlaylists = [];
        let savePlaylistData = playlistInfo;
        let playlistIndex = 0;

        savePlaylistData.updatedDate = new Date();

        if(localStorage.getItem("userPlaylists")) {
            userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
            localStorage.removeItem("userPlaylists");   
            
            playlistIndex = userPlaylists.findIndex(playlist => playlist.playlistId === playlistInfo.playlistId);
            userPlaylists.splice(playlistIndex, 1);
        }

        userPlaylists.push(savePlaylistData);            
        localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));

        this.setState({ showNewPlaylistPage: false, showEditPlaylistPage: false, showFilteredResult: false,
            userAllPlaylists: userPlaylists, editPlaylistInfo: {} 
        });
    }

    addSongToNewPlaylist(songInfo) {
        let newPlaylistToBeSaved = this.state.newPlaylistInfo;

        let songDetails = {
            "songId": "",
            "albumId": "",
            "songTitle": "",
            "albumTitle": "",
            "albumURL": "",
            "thumbURL": "",
            "userId": ""
        };

        if (songInfo) {
            songDetails = {
                "songId": songInfo.songId,
                "albumId": songInfo.albumId,
                "songTitle": songInfo.songTitle,
                "albumTitle": songInfo.albumTitle,
                "albumURL": songInfo.albumURL,
                "thumbURL": songInfo.thumbURL,
                "userId": songInfo.userId
            };
        }

        if(newPlaylistToBeSaved) {
            newPlaylistToBeSaved.songs.push(songDetails);
        }        
        
        this.setState({ newPlaylistInfo: newPlaylistToBeSaved });
    }

    removeSongFromEditPlaylist(songInfo) {
        let editPlaylistToBeSaved = this.state.editPlaylistInfo;
        let playlistSongs = editPlaylistToBeSaved.songs;
        let songIndex = 0;

        let songDetails = {
            "songId": "",
            "albumId": "",
            "songTitle": "",
            "albumTitle": "",
            "albumURL": "",
            "thumbURL": "",
            "userId": ""
        };

        if (songInfo) {
            songDetails = {
                "songId": songInfo.songId,
                "albumId": songInfo.albumId,
                "songTitle": songInfo.songTitle,
                "albumTitle": songInfo.albumTitle,
                "albumURL": songInfo.albumURL,
                "thumbURL": songInfo.thumbURL,
                "userId": songInfo.userId
            };
        }

        if(editPlaylistToBeSaved && playlistSongs) {
            songIndex = playlistSongs.findIndex(song => song.songId === songDetails.songId);
            playlistSongs.splice(songIndex, 1);

            editPlaylistToBeSaved.songs = playlistSongs;
        }        
        
        this.setState({ editPlaylistInfo: editPlaylistToBeSaved });
    }

    shufflePlaylistSongs(playlistInfo) {
        let playlistSongs = playlistInfo.songs;
        let shuffledSongs = [];

        if(playlistSongs) {
            shuffledSongs = playlistSongs.map((a) => ({sort: Math.random(), value: a}))
                                        .sort((a, b) => a.sort - b.sort)
                                        .map((a) => a.value);       
        }

        playlistInfo.songs = shuffledSongs;
        let updatedPlaylist = playlistInfo;

        this.setState({ editPlaylistInfo: updatedPlaylist });
    }

    addSongToEditPlaylist(songInfo) {
        let editPlaylistToBeSaved = this.state.editPlaylistInfo;
        let playlistSongs = editPlaylistToBeSaved.songs;

        let songDetails = {
            "songId": "",
            "albumId": "",
            "songTitle": "",
            "albumTitle": "",
            "albumURL": "",
            "thumbURL": "",
            "userId": ""
        };

        if (songInfo) {
            songDetails = {
                "songId": songInfo.songId,
                "albumId": songInfo.albumId,
                "songTitle": songInfo.songTitle,
                "albumTitle": songInfo.albumTitle,
                "albumURL": songInfo.albumURL,
                "thumbURL": songInfo.thumbURL,
                "userId": songInfo.userId
            };
        }

        if(editPlaylistToBeSaved) {
            playlistSongs.push(songDetails);
            editPlaylistToBeSaved.songs = playlistSongs;
        }        
        
        this.setState({ editPlaylistInfo: editPlaylistToBeSaved });
    }

    deleteCurrentPlaylist(playlistInfo) {
        let userPlaylists = [];
        let playlistIndex = 0;

        if(localStorage.getItem("userPlaylists")) {
            userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
            localStorage.removeItem("userPlaylists");   
            
            playlistIndex = userPlaylists.findIndex(playlist => playlist.playlistId === playlistInfo.playlistId);
            userPlaylists.splice(playlistIndex, 1);

            localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));
        }

        this.playlistTabSelect();
    }

    render() {
        return (
            <div>
                <Jumbotron fluid style={{ backgroundImage: "https://unsplash.com/photos/YrtFlrLo2DQ" }}>
                    <Container>
                        <h1>VBI Music</h1>
                        <p>A Simple music search platform</p>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row className="justify-content-md-center">
                        <Header 
                            allSongsTabSelected={this.state.allSongsTabSelected} playlistTabSelected={this.state.playlistTabSelected} showThumbnails={this.state.showThumbnails}
                            showNewPlaylistPage={this.state.showNewPlaylistPage} showEditPlaylistPage={this.state.showEditPlaylistPage}
                            allSongsTabSelect={this.allSongsTabSelect} playlistTabSelect={this.playlistTabSelect} toggleShowingThumnails={this.toggleShowingThumnails}
                            />
                    </Row>   
                    <Row className="justify-content-md-center">
                        {
                            this.state.allSongsTabSelected ?
                                <SongsListPanel photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult} 
                                    showThumbnails={this.state.showThumbnails} searchBoxText={this.state.searchBoxText} showFilteredResult={this.state.showFilteredResult}
                                    searchBoxChange={this.searchBoxChange} />
                                : null
                        }
                        {
                            this.state.playlistTabSelected && !this.state.showNewPlaylistPage && !this.state.showEditPlaylistPage ?
                                <ShowAllPlaylistPage showNewPlaylistPage={this.state.showNewPlaylistPage} userAllPlaylists={this.state.userAllPlaylists} showFilteredResult={this.state.showFilteredResult}
                                    setShowNewPlaylistPageIndicator={this.setShowNewPlaylistPageIndicator} setShowEditPlaylistPageIndicator={this.setShowEditPlaylistPageIndicator} 
                                    deleteCurrentPlaylist={this.deleteCurrentPlaylist} />
                                : this.state.showNewPlaylistPage && !this.state.showEditPlaylistPage ?
                                    <NewPlaylistPage photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult}
                                        showThumbnails={this.state.showThumbnails} newPlaylistInfo={this.state.newPlaylistInfo} searchBoxText={this.state.searchBoxText} showFilteredResult={this.state.showFilteredResult}
                                        savePlaylistFromNewPage={this.savePlaylistFromNewPage} addSongToNewPlaylist={this.addSongToNewPlaylist} searchBoxChange={this.searchBoxChange} />
                                    : this.state.showEditPlaylistPage && !this.state.showNewPlaylistPage ?
                                        <EditPlaylistPage photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult} searchBoxText={this.state.searchBoxText}
                                            showThumbnails={this.state.showThumbnails} editPlaylistInfo={this.state.editPlaylistInfo} showNewSongsInEditPlaylistPage={this.state.showNewSongsInEditPlaylistPage} showFilteredResult={this.state.showFilteredResult}
                                            savePlaylistFromEditPage={this.savePlaylistFromEditPage} removeSongFromEditPlaylist={this.removeSongFromEditPlaylist}  searchBoxChange={this.searchBoxChange}
                                            shufflePlaylistSongs={this.shufflePlaylistSongs} addSongToEditPlaylist={this.addSongToEditPlaylist} 
                                            setShowNewSongsInEditPlaylistPageIndicator={this.setShowNewSongsInEditPlaylistPageIndicator} disableShowNewSongsInEditPlaylistPageIndicator={this.disableShowNewSongsInEditPlaylistPageIndicator} />
                                        : null
                        }
                    </Row>                    
                </Container>
            </div>
            );
        }
}

Dashboard.propTypes = {
    MusicActions: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        MusicActions: bindActionCreators(MusicActions, dispatch)
    };
}

const mapStateToProps = state => ({
    songsInfo: state.songList,
    photosInfo: state.photosList
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Dashboard);