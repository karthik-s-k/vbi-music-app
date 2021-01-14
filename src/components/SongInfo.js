import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

class SongInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }

    render() {

        let photos = this.props.photosList.filter(photos => photos.id === this.props.song.id);

        let songDetails = {
            "songId": this.props.song.id,
            "albumId": photos[0].albumId,
            "songTitle": this.props.song.title,
            "albumTitle": photos[0].title,
            "albumURL": photos[0].url,
            "thumbURL": photos[0].thumbnailUrl,
            "userId": this.props.song.userId
        };

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
                            <Col><img src={songDetails.thumbURL}/></Col>
                            : <Col></Col>
                    }
                    <Col xs lg="2">
                        {
                            this.props.showPlaylistOptions ?
                                <ButtonGroup aria-label="list type">
                                    <Button variant="light">Delete</Button>                    
                                </ButtonGroup> 
                                : null
                        }
                        {
                            this.props.createNewPlaylist ?
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