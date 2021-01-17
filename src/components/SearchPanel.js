import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class SearchPanel extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            className="form-control"
            name="searchBox"
            placeholder="Search by song title "
            id="searchBox"
            autoFocus=""
            onChange={this.props.searchBoxChange}
            required
            autoComplete="off"
            value={this.props.searchBoxText}
          />
          <div className="search-icon">
            <i className="fas fa-search mr-1" />
          </div>
        </InputGroup>
      </div>
    );
  }
}

export default SearchPanel;
