import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songName: '' 
        };
      }
    
    render() {
        return (
            <div>
                This is Header
            </div>
            );
        }
}

export default Header;