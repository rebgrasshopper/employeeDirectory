import React from "react";
import './styles.css'

function SearchForm(props) {
  return (
    <form className="mx-5">
      <div className="form-group d-flex align-items-center justify-content-start">
        <label htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Employee name"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
