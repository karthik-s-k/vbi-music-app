import React from 'react';

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <div>
                This is Search Panel
            </div>
            );
        }
}

export default SearchPanel;