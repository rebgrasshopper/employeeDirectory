import React from "react";
import './styles.css'

function SearchForm(props) {
  return (
    <form 
    className="mx-5" 
    autoComplete="off"
    onSubmit={props.handleFormSubmit}
    >
      <div className="form-group d-flex align-items-center justify-content-start">
        <label htmlFor="search">Search:</label>
        <input
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Employee name"
          id="search"
          onChange={props.handleInputChange}
        />
      </div>
    </form>
  );
}

export default SearchForm;
