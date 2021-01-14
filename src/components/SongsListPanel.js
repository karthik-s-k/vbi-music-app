import React from 'react';

class SongsListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <div>
                This is Songs List Panel
            </div>
            );
        }
}

export default SongsListPanel;