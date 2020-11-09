import React from "react";
import './styles.css'



function ResultList(props) {

return (
    <table className="list-group mx-4">
        <tr className="list-group-item list-group-title d-flex justify-content-between align-items-center">
          <td><button name="" onClick={props.handleButtonPush}>Picture</button></td>
          <td><button name="name.last" onClick={props.handleButtonPush}>name</button></td>
          <td><button name="phone" onClick={props.handleButtonPush}>phone</button></td>
          <td><button name="email" onClick={props.handleButtonPush}>email</button></td>
          <td><button name="dob.date" onClick={props.handleButtonPush}>D.O.B.</button></td>
        </tr>
      {props.results.map(result => (
        <tr className="list-group-item d-flex align-items-center justify-content-between">
            <td><img src={result.picture.large} alt={result.name.first + result.name.last}/></td>
            <td>{result.name.first} {result.name.last}</td>
            <td>{result.phone}</td>
            <td>{result.email}</td>
            <td>{result.dob.date.slice(0,10)}</td>
        </tr>
      ))}
    </table>
  );
}

export default ResultList;
