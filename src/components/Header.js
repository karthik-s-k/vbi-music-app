import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col><h1>VBI Music</h1></Col>
                    <Col></Col>
                    <Col></Col>                
                </Row>

                <Row>
                    <Col></Col>
                    <Col>
                        <ButtonGroup aria-label="list type">
                            <Button variant={this.props.allSongsTabSelected ? "success" : "light" } onClick={this.props.allSongsTabSelect}>All Songs</Button>                    
                        
                            <Button variant={this.props.playlistTabSelected ? "success" : "light" } onClick={this.props.playlistTabSelect}>Playlist</Button>
                        </ButtonGroup> 
                    </Col>    

                    <Col xs lg="2">
                        <Button variant="link" onClick={this.props.toggleShowingThumnails}>Album Thumb</Button>                              
                    </Col>
                </Row>                

                <br />           
            </Container>
            );
        }
}

export default Header;