import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

class SongInfo extends React.Component {

    addSongToPlaylist(songDetails) {
        this.props.addSongToNewPlaylist(songDetails);
    }

    removeSongFromPlaylist(songDetails) {
        this.props.removeSongFromEditPlaylist(songDetails);
    }

    addSongToEditPlaylist(songDetails) {
        this.props.addSongToEditPlaylist(songDetails);
    }

    render() {
        let photos = {};
        let songDetails = {
            "songId": "",
            "albumId": "",
            "songTitle": "",
            "albumTitle": "",
            "albumURL": "",
            "thumbURL": "",
            "userId": ""
        };

        let bgColor = "white";
        if (this.props.bgColor) {
            bgColor = this.props.bgColor;
        }

        if (this.props.isEditPlaylist && this.props.showAddSongInPlaylist === false) {
            songDetails.songId = this.props.song.songId;
            songDetails.albumId = this.props.song.albumId;
            songDetails.songTitle = this.props.song.songTitle;
            songDetails.albumTitle = this.props.song.albumTitle;
            songDetails.albumURL = this.props.song.albumURL;
            songDetails.thumbURL = this.props.song.thumbURL;
            songDetails.userId = this.props.song.userId;
        }        
        else if (this.props.song && this.props.photosList) {
            photos = this.props.photosList.filter(photos => photos.id === this.props.song.id);

            songDetails.songId = this.props.song.id;
            songDetails.albumId = photos[0].albumId;
            songDetails.songTitle = this.props.song.title;
            songDetails.albumTitle = photos[0].title;
            songDetails.albumURL = photos[0].url;
            songDetails.thumbURL = photos[0].thumbnailUrl;
            songDetails.userId = this.props.song.userId;
        }        

        return (
            <div>
                {
                    this.props.showThumbnails ?
                     (
                        
                        <div className="card mb-4">
                            <div style={{backgroundColor: bgColor}}>
                                <div className="row no-gutters">
                                    <div className="col-md-2">
                                        <img src={songDetails.thumbURL} className="card-img" alt="album art" />
                                    </div>
                                    <div className="col-md-6 pt-md-3 pt-sm-1">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <span>Title : </span> {songDetails.songTitle}
                                            </h4>
                                            <h6 className="card-subtitle text-muted">
                                                <span>Album : </span>
                                                {songDetails.albumTitle}
                                            </h6>
                                            <p className="card-text">Singers : N/A</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 px-auto pt-md-5 pt-sm-1 mb-2">
                                        <div className="row no-gutters">
                                            <div className="col d-flex justify-content-center">
                                                <span>Play time : N/A</span>
                                            </div>
                                            <div className="col d-flex justify-content-center">
                                                {
                                                    this.props.showDeleteSongInPlaylist ? (
                                                        <ButtonGroup aria-label="list type">
                                                            <Button variant="light" onClick={this.removeSongFromPlaylist.bind(this, songDetails)}>
                                                                <i class="fas fa-minus-circle"></i> Remove
                                                            </Button>                    
                                                        </ButtonGroup> 
                                                        ) : null
                                                }
                                                {
                                                    this.props.showAddSongInPlaylist ? (
                                                        <ButtonGroup aria-label="list type">
                                                        {
                                                            this.props.isEditPlaylist ?
                                                                <Button variant="light" onClick={this.addSongToEditPlaylist.bind(this, songDetails)}>
                                                                    <i class="fas fa-plus"></i> Add to list
                                                                </Button>                    
                                                                :   <Button variant="light" onClick={this.addSongToPlaylist.bind(this, songDetails)}>
                                                                        <i class="fas fa-plus"></i> Add to list
                                                                    </Button> 
                                                        }
                                                        </ButtonGroup>
                                                        ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )
                     :
                     (
                        
                        <div className="card mb-4">
                            <div style={{backgroundColor: bgColor}}>
                                <div className="row no-gutters">
                                    <div className="col-md-8 mt-">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <span>Title : </span> {songDetails.songTitle}
                                            </h4>
                                            <h6 className="card-subtitle text-muted">
                                                <span>Album : </span>
                                                {songDetails.albumTitle}
                                            </h6>
                                            <p className="card-text">Singers : Undefined</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 px-auto pt-md-5 pt-sm-1 mb-2">
                                        <div className="row no-gutters">
                                            <div className="col  d-flex justify-content-center">
                                                <span>Play time : Undefined</span>
                                            </div>
                                            <div className="col  d-flex justify-content-center">
                                                {
                                                    this.props.showDeleteSongInPlaylist ? (
                                                        <ButtonGroup aria-label="list type">
                                                            <Button variant="light" onClick={this.removeSongFromPlaylist.bind(this, songDetails)}>
                                                                <i class="fas fa-minus-circle"></i> Remove
                                                            </Button>                    
                                                        </ButtonGroup>
                                                        ) : null
                                                }
                                                {
                                                    this.props.showAddSongInPlaylist ? (
                                                        <ButtonGroup aria-label="list type">
                                                        {
                                                            this.props.isEditPlaylist ?
                                                                <Button variant="light" onClick={this.addSongToEditPlaylist.bind(this, songDetails)}>
                                                                    <i class="fas fa-plus"></i> Add to list
                                                                </Button>                    
                                                                :   <Button variant="light" onClick={this.addSongToPlaylist.bind(this, songDetails)}>
                                                                        <i class="fas fa-plus"></i> Add to list
                                                                    </Button> 
                                                        }
                                                        </ButtonGroup>
                                                        ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )
                }
            </div>            
            );
        }
}

export default SongInfo;