import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

class SongInfo extends React.Component {
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

        if (this.props.song && this.props.photosList) {
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
            <Container>
                <Row>
                    <Col><div>Title: {songDetails.songTitle}</div>   </Col>
                    <Col xs lg="2"></Col>
                    <Col xs lg="2"></Col>
                </Row>
                <Row>
                    <Col><div>Album: {songDetails.albumTitle}</div></Col>
                    <Col xs lg="2"></Col>
                    <Col xs lg="2"></Col>
                </Row>
                <Row>
                    {
                        this.props.showThumbnails ?
                            <Col><img src={songDetails.thumbURL} alt="album art"/></Col>
                            : <Col></Col>
                    }
                    <Col xs lg="2">
                        {
                            this.props.showDeleteSongInPlaylist ?
                                <ButtonGroup aria-label="list type">
                                    <Button variant="light">Delete</Button>                    
                                </ButtonGroup> 
                                : null
                        }
                        {
                            this.props.showAddSongInPlaylist ?
                                <ButtonGroup aria-label="list type">
                                    <Button variant="light">Add to list</Button>                    
                                </ButtonGroup> 
                                : null
                        }
                    </Col>
                    <Col xs lg="2"></Col>
                </Row>
                <br />
            </Container>
            );
        }
}

export default SongInfo;