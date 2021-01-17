import React from 'react';
import SearchPanel from "../components/SearchPanel";
import SongInfo from "./SongInfo";

import Container from 'react-bootstrap/Container';

class SongsListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.searchBoxChange = this.searchBoxChange.bind(this);
      }

    searchBoxChange(event) {
        this.props.searchBoxChange(event.target.value);
    }

    render() {
        let songList = [];

        if(this.props.showFilteredResult && this.props.filteredSearchResult) {
            songList = this.props.filteredSearchResult;
        }
        else {
            songList = this.props.songList;
        }

        return (
            <Container>
                <div className="col-sm-12  d-flex justify-content-center">
                    <div className="col-sm-8">
                        <SearchPanel 
                            searchBoxText={this.props.searchBoxText} 
                            searchBoxChange={this.searchBoxChange} 
                        />
                    </div>
                </div>
                {
                    this.props.photosList && songList && songList.map((song, index) => {                  
                        return (
                            <SongInfo key={index} song={song} photosList={this.props.photosList} showThumbnails={this.props.showThumbnails} bgColor={"white"} />
                            );
                        })
                }
            </Container>
            );
        }
}

export default SongsListPanel;