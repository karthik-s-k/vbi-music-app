import React from "react";
import PlaylistBox from "./PlaylistBox";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class ShowAllPlaylistPage extends React.Component {   
    
    render() {
        let allPlaylists = this.props.userAllPlaylists;

        return (
            <Container>
                <div className="d-flex justify-content-end">
                    <Button className="my-3" variant="button" onClick={this.props.setShowNewPlaylistPageIndicator}>
                        <i class="fas fa-plus"></i> Create playlist
                    </Button>
                </div>
                {
                    allPlaylists && allPlaylists.map((playlist, index) => {
                        return (
                                <PlaylistBox key={index} playlist={playlist} setShowEditPlaylistPageIndicator={this.props.setShowEditPlaylistPageIndicator} 
                                    deleteCurrentPlaylist={this.props.deleteCurrentPlaylist} />
                        );
                    })
                }
            </Container>
            );
        }
}

export default ShowAllPlaylistPage;