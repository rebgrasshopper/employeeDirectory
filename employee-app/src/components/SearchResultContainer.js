import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    employees: [],
    search: "",
    results: [],
    sortRule: ""
  };


  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchGiphy();
  }

  searchGiphy = query => {
    API.search(query)
      .then(res => {
        this.setState({ employees: res.data.results })
        this.setState({ results: res.data.results })
        console.log(res)
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleButtonPush = event => {
    let type = event.target.name;
    this.setState({
      sortRule: type
    });

    if (type === ""){
      function shuffle(array) {//fisher-yates suffle
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

      this.setState({
        results: shuffle(this.state.results)
      })
    }
    console.log(type);
    type = type.split(".");
    console.log(type);

    function compare(a, b) {//sort function lifted from sitepoint.com
      // Use toUpperCase() to ignore character casing
      let cat1 = type[0];
      let cat2;
      let elemA;
      let elemB;
    
      if (type.length > 1){
        cat2 = type[1];
      }


      if (cat2 === undefined) {
        elemA = a[cat1];
      } else {
        elemA = a[cat1][cat2];
      }
      if (cat2 === undefined) {
        elemB = b[cat1];
      } else {
        elemB = b[cat1][cat2];
      }
      let comparison = 0;
      if (elemA > elemB) {
        comparison = 1;
      } else if (elemA < elemB) {
        comparison = -1;
      }
      return comparison;
    }
    
    const newResults = this.state.results.sort(compare);

    this.setState({
      results: newResults
    });
  }

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search === "" || this.state.search === undefined){
      this.setState({ results: this.state.employees });
    } else if (this.state.search.indexOf(" ") < 0){
      this.setState({ results: this.state.employees.filter(employee => {
        return ((employee.name.first.toLowerCase().startsWith(this.state.search.toLowerCase())) || (employee.name.last.toLowerCase().startsWith(this.state.search.toLowerCase())))
      })
    });
    } else {
      this.setState({ results: this.state.employees.filter(employee => {
        return ((employee.name.first + " " + employee.name.last).toLowerCase().startsWith(this.state.search.toLowerCase()));
      })})
    }
  };

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Employee Directory</h1>
          <h5>click on category names to sort, or use the search bar to narrow your results.</h5>
        </div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList results={this.state.results} handleButtonPush={this.handleButtonPush}/>
      </div>
    );
  }
}

export default SearchResultContainer;
