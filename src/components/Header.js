import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
      }

    render() {
        return (
            <Container>
                <ButtonGroup className="button-group-tabs d-flex justify-content-center" aria-label="list type">
                    <Button variant={this.props.allSongsTabSelected ? "primary" : "light"} onClick={this.props.allSongsTabSelect}>
                        All Songs
                    </Button>
                    <Button variant={this.props.playlistTabSelected ? "primary" : "light"} onClick={this.props.playlistTabSelect}>
                        All Playlists
                    </Button>
                </ButtonGroup>

                {
                    (this.props.allSongsTabSelected || (this.props.showNewPlaylistPage || this.props.showEditPlaylistPage)) ?
                        <div className="d-flex justify-content-end">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Show/Hide album thumbnails</Tooltip>}>
                                <span className="d-inline-block" onClick={this.props.toggleShowingThumnails}>
                                    <i className="far fa-images"></i>
                                </span>
                            </OverlayTrigger>                            
                        </div>
                        : null
                }
                
            </Container>
            );
        }
}

export default Header;