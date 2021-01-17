import React from 'react';

import Container from 'react-bootstrap/Container';

class PlaylistBox extends React.Component {

    openPlaylistForEdit(playlist) {
        this.props.setShowEditPlaylistPageIndicator(playlist);
    }

    deletePlaylist(playlist) {
        this.props.deleteCurrentPlaylist(playlist);
    }

    render() {
        let playlist = this.props.playlist;
        return (
            <Container>                
                <div className="card mb-4">
                    <div className="row no-gutters" style={{paddingBottom: "2%"}}>
                        <div className="col-md-12 mt-">
                            <div className="card-body">
                                <div style={{float: "left", width: "98%"}} onClick={this.openPlaylistForEdit.bind(this, playlist)}>
                                    <h4 className="card-title">
                                        <span>Playlist : </span> {playlist.playlistName}
                                    </h4>
                                    <h6 className="card-subtitle text-muted">
                                        <span>Created Date : </span>
                                        {new Date(playlist.createdDate).toISOString().split('T')[0]}
                                    </h6> 
                                </div>
                                <div style={{float: "right", position: "absolute", right: "2%"}} onClick={this.deletePlaylist.bind(this, playlist)}>
                                    <i class="fad fa-trash"></i>
                                </div>                                                                                        
                            </div>  
                        </div>
                    </div>
                </div>
            </Container>
            );
        }
}

export default PlaylistBox;