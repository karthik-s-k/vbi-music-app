import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import SongsListPanel from "../components/SongsListPanel";
import ShowAllPlaylistPage from "../components/ShowAllPlaylistPage";
import NewPlaylistPage from "../components/NewPlaylistPage";
import EditPlaylistPage from "../components/EditPlaylistPage";

import * as MusicActions from '../actions/MusicActions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSongsTabSelected: true,
            playlistTabSelected: false,
            showNewPlaylistPage: false,
            showEditPlaylistPage: false,
            showThumbnails: false,
            searchBoxText: '',
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
    }

    componentDidMount() {
        this.fetchAllSongsList();
    }
    
    allSongsTabSelect() {
        this.setState({ 
                allSongsTabSelected: true, playlistTabSelected: false, showNewPlaylistPage: false, showEditPlaylistPage: false, 
                searchBoxText: ""
            }, this.fetchAllSongsList());
    }
    playlistTabSelect() {
        let userPlaylists = [];
        if(localStorage.getItem("userPlaylists")) {
            userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
        }        

        this.setState({ searchBoxText:"", playlistTabSelected: true, allSongsTabSelected: false, userAllPlaylists: userPlaylists });
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

    searchBoxChange(event) {
        this.setState({ searchBoxText: event.target.value }, this.fetchSongsByName(event.target.value));
    }
    fetchSongsByName(songName) {
        if(songName === "") {
            this.setState({ filteredSearchResult: [] });
        }
        else {
            this.setState({ filteredSearchResult: this.props.songsInfo.songList.filter(song => song.title.includes(songName)) });
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

        this.setState({ showNewPlaylistPage: true, showEditPlaylistPage: false, newPlaylistInfo: playlistInfo });
    }
    setShowEditPlaylistPageIndicator(selectedPlaylist) {
        this.setState({ showEditPlaylistPage: true, showNewPlaylistPage: false, editPlaylistInfo: selectedPlaylist });
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

        this.setState({ showNewPlaylistPage: false, showEditPlaylistPage: false, userAllPlaylists: userPlaylists, newPlaylistInfo: {} });
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

        this.setState({ showNewPlaylistPage: false, showEditPlaylistPage: false, userAllPlaylists: userPlaylists, editPlaylistInfo: {} });
    }

    addSongToNewPlaylist(playlistInfo, songInfo) {
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

    removeSongFromEditPlaylist(playlistInfo, songInfo) {
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

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Header 
                        allSongsTabSelected={this.state.allSongsTabSelected} playlistTabSelected={this.state.playlistTabSelected} showThumbnails={this.state.showThumbnails}
                        allSongsTabSelect={this.allSongsTabSelect} playlistTabSelect={this.playlistTabSelect} toggleShowingThumnails={this.toggleShowingThumnails}
                        />
                </Row>
                
                {
                    this.state.allSongsTabSelected || (this.state.showNewPlaylistPage || this.state.showEditPlaylistPage) ?
                        <Row className="justify-content-md-center">
                            <SearchPanel 
                                searchBoxText={this.state.searchBoxText} 
                                searchBoxChange={this.searchBoxChange} 
                            />
                        </Row>
                        : null
                }                
                
                <Row className="justify-content-md-center">
                    {
                        this.state.allSongsTabSelected ?
                            <SongsListPanel photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult} 
                                showThumbnails={this.state.showThumbnails} searchBoxText={this.state.searchBoxText} />
                            : null
                    }
                    {
                        this.state.playlistTabSelected && !this.state.showNewPlaylistPage && !this.state.showEditPlaylistPage ?
                            <ShowAllPlaylistPage showNewPlaylistPage={this.state.showNewPlaylistPage} userAllPlaylists={this.state.userAllPlaylists}
                                setShowNewPlaylistPageIndicator={this.setShowNewPlaylistPageIndicator} setShowEditPlaylistPageIndicator={this.setShowEditPlaylistPageIndicator} />
                            : this.state.showNewPlaylistPage && !this.state.showEditPlaylistPage ?
                                <NewPlaylistPage photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult}
                                    showThumbnails={this.state.showThumbnails} newPlaylistInfo={this.state.newPlaylistInfo}
                                    savePlaylistFromNewPage={this.savePlaylistFromNewPage} addSongToNewPlaylist={this.addSongToNewPlaylist} />
                                : this.state.showEditPlaylistPage && !this.state.showNewPlaylistPage ?
                                    <EditPlaylistPage photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult}
                                        showThumbnails={this.state.showThumbnails} editPlaylistInfo={this.state.editPlaylistInfo}
                                        savePlaylistFromEditPage={this.savePlaylistFromEditPage} removeSongFromEditPlaylist={this.removeSongFromEditPlaylist} />
                                    : null
                    }
                </Row>
                
            </Container>
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