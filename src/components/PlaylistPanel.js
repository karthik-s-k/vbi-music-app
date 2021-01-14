import React from 'react';

class PlayListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <div>
                This is Play List Panel
            </div>
            );
        }
}

export default PlayListPanel;