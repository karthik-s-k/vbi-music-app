import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import PlaylistPanel from "../components/PlaylistPanel";
import SongsListPanel from "../components/SongsListPanel";

import * as MusicActions from '../actions/MusicActions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };

      }

    componentDidMount() {
        this.props.MusicActions.getAllSongsList();
    }
    
    render() {
        return (
            <div>
                <Header />
                <SearchPanel />
                This is Dashboard
                <SongsListPanel />
                <PlaylistPanel />
            </div>
            );
        }
}

Dashboard.propTypes = {
    MusicActions: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        MusicActions: bindActionCreators(MusicActions, dispatch)
    };
}

const mapStateToProps = state => ({
    stockDetails: state.stockInfo,
    stockChart: state.financialItem
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Dashboard);