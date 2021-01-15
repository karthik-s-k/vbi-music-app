import React from 'react';
import PlaylistBox from "./PlaylistBox";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class ShowAllPlaylistPage extends React.Component {
    render() {
        return (
            <Container>
                <Row onClick={this.props.setShowEditPlaylistPageIndicator}>
                    <Card style={{padding: "1%"}}> 
                        <PlaylistBox />
                    </Card>                    
                </Row>
                <Row onClick={this.props.setShowEditPlaylistPageIndicator}>
                    <Card style={{padding: "1%"}}> 
                        <PlaylistBox />
                    </Card>                    
                </Row>
                <Row onClick={this.props.setShowEditPlaylistPageIndicator}>
                    <Card style={{padding: "1%"}}> 
                        <PlaylistBox />
                    </Card>                    
                </Row>
                <Row>
                    <ButtonGroup aria-label="list type">
                        <Button variant="light" onClick={this.props.setShowNewPlaylistPageIndicator}>Create playlist</Button>
                    </ButtonGroup>
                </Row>
            </Container>
            );
        }
}

export default ShowAllPlaylistPage;