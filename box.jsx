import React, { Component } from "react";
import ReactDOM from "react-dom";

class Box extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let deletedItem = this.props.list.id;
    console.log(deletedItem);
    return (
      <div>
        <p className="activity">
          {this.props.list.activity} - {this.props.list.input_date}
        </p>
        <button>EDIT</button>
        <button key={deletedItem} onClick={this.props.onDelete}>
          DELETE!
        </button>
      </div>
    );
  }
}

export default Box;
