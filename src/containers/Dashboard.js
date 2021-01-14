import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import PlaylistPanel from "../components/PlaylistPanel";
import SongsListPanel from "../components/SongsListPanel";

import * as MusicActions from '../actions/MusicActions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSongsTabSelected: true,
            playlistTabSelected: false,
            showNewPlaylist: false,
            showThumbnails: false,
            searchBoxText: '',
            filteredSearchResult: [],
            playlistSet: [],
            playlistSongs: []
        };

        this.searchBoxChange = this.searchBoxChange.bind(this);
        this.allSongsTabSelect = this.allSongsTabSelect.bind(this);
        this.playlistTabSelect = this.playlistTabSelect.bind(this);
        this.fetchAllSongsList = this.fetchAllSongsList.bind(this);
        this.fetchSongsByName = this.fetchSongsByName.bind(this);
        this.fetchAllPhotosList = this.fetchAllPhotosList.bind(this);
        this.fetchAllPlaylists = this.fetchAllPlaylists.bind(this);
        this.fetchPlaylistSongs = this.fetchPlaylistSongs.bind(this);
        this.createNewPlaylist = this.createNewPlaylist.bind(this);
        this.toggleShowingThumnails = this.toggleShowingThumnails.bind(this);
      }

    componentDidMount() {
        this.fetchAllSongsList();
    }
    
    searchBoxChange(event) {
        this.setState({ searchBoxText: event.target.value }, this.fetchSongsByName(event.target.value));
    }

    allSongsTabSelect() {
        this.setState({ allSongsTabSelected: true, playlistTabSelected: false }, this.fetchAllSongsList());
    }

    playlistTabSelect() {
        this.setState({ playlistTabSelected: true, allSongsTabSelected: false }, this.fetchAllPlaylists());
    }

    toggleShowingThumnails() {
        this.setState({ showThumbnails: !this.state.showThumbnails });
    }

    fetchAllSongsList() {
        this.props.MusicActions.getAllSongsList();
        this.fetchAllPhotosList();
    }

    fetchSongsByName(songName) {
        this.setState({ filteredSearchResult: this.props.songsInfo.songList.filter(song => song.title.includes(songName)) });
    }

    fetchAllPhotosList() {
        this.props.MusicActions.getAllPhotosList();
    }

    fetchAllPlaylists() {
        this.setState({ playlistSet: localStorage.getItem("allPlaylists") });
    }

    fetchPlaylistSongs(playlist_id) {
        this.setState({ playlistSongs: this.state.playlistSet.filter(playlist => playlist.playlist_id === playlist_id) });
    }

    createNewPlaylist() {
        this.setState({ showNewPlaylist: true });
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
                
                <Row className="justify-content-md-center">
                    <SearchPanel 
                        searchBoxText={this.state.searchBoxText} 
                        searchBoxChange={this.searchBoxChange} 
                        />
                </Row>
                
                <Row className="justify-content-md-center">
                    {
                        this.state.allSongsTabSelected ?
                            <SongsListPanel photosList={this.props.photosInfo.photosList} songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult} 
                                showThumbnails={this.state.showThumbnails} />
                            : 
                            <PlaylistPanel showNewPlaylist={this.state.showNewPlaylist} playlistSet={this.state.playlistSet} playlistSongs={this.state.playlistSongs} 
                                songList={this.props.songsInfo.songList} filteredSearchResult={this.state.filteredSearchResult} 
                                createNewPlaylist={this.createNewPlaylist} />
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