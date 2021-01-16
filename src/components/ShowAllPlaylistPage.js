import React from "react";
import PlaylistBox from "./PlaylistBox";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class ShowAllPlaylistPage extends React.Component {    

    openPlaylistForEdit(playlist) {
        this.props.setShowEditPlaylistPageIndicator(playlist);
    }

    render() {
        let allPlaylists = this.props.userAllPlaylists;

        return (
            <Container>
                <Row>
                    <ButtonGroup aria-label="list type">
                        <Button variant="light" onClick={this.props.setShowNewPlaylistPageIndicator}>
                            <i class="fas fa-plus"></i> Create playlist
                        </Button>
                    </ButtonGroup>
                </Row>
                {
                    allPlaylists && allPlaylists.map((playlist) => {
                        return (
                            <Row key={playlist.playlistId} onClick={this.openPlaylistForEdit.bind(this, playlist)}>
                                <Card style={{padding: "1%"}}> 
                                    <PlaylistBox playlist={playlist} />
                                </Card>                    
                            </Row>
                        );
                    })
                }
            </Container>
            );
        }
}

export default ShowAllPlaylistPage;