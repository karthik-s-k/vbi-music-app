import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class SearchPanel extends React.Component { 
    render() {
        return (
            <div style={{width: "50%", margin: "2%"}}>
                <InputGroup className="mb-3">
                    <FormControl 
                        type="text"
                        className="form-control"
                        name="searchBox"
                        placeholder="Search by song title... "
                        id="searchBox"
                        autoFocus=""
                        onChange={this.props.searchBoxChange}
                        required
                        autoComplete="off"
                        value={this.props.searchBoxText}
                    />
                </InputGroup>
            </div>
            );
        }
}

export default SearchPanel;