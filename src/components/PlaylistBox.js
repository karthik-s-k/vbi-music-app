import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class PlaylistBox extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>Playlist: {this.props.playlist.playlistName}</Col>
                    <Col>Created Date: {new Date(this.props.playlist.createdDate).toISOString().split('T')[0]}</Col>
                </Row>
            </Container>
            );
        }
}

export default PlaylistBox;