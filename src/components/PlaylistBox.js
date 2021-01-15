import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class PlaylistBox extends React.Component {
    render() {
        let userPlaylists = 5;

        return (
            <Container>
                <Row>
                    <Col>Playlist 1</Col>
                    <Col>Created Date: 01-01-2021</Col>
                </Row>
            </Container>
            );
        }
}

export default PlaylistBox;