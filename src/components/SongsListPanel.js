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
        let searchResultCount = 0;
        let searchResultText = "";

        if(this.props.showFilteredResult && this.props.filteredSearchResult) {
            songList = this.props.filteredSearchResult;
        }
        else {
            songList = this.props.songList;
        }
        
        if(songList) {
            searchResultCount = songList.length;
        }

        if (searchResultCount === 0) {
            searchResultText = "No records found";
        }
        else if (searchResultCount === 1) {
            searchResultText = "Found 1 record";
        }
        else {
            searchResultText = "Showing " + searchResultCount + " records";
        }

        return (
            <Container>
                <div className="col-sm-12  d-flex justify-content-center">
                    <div className="col-sm-8">
                        <SearchPanel 
                            searchBoxText={this.props.searchBoxText} 
                            searchBoxChange={this.searchBoxChange} 
                        />
                        
                        {
                            (this.props.showFilteredResult && this.props.filteredSearchResult) ?
                                <div style={{float: "right", paddingBottom: "1%"}}>
                                    { searchResultText }
                                </div>
                                : null
                        }                        
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