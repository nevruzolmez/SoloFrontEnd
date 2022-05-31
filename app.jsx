import React, { Component } from "react";
import ReactDOM from "react-dom";
import Box from "./box.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };
    // this.postMethod = this.postMethod.bind(this);
    // console.log("CHECKK");
  }
  // RESET FUNCTION WILL SEND DELETE ALL REQUEST TO THE SERVER
  reset() {
    fetch("http://localhost:3000/todoList", {
      method: "DELETE",
    })
      .then((data) => data.json())
      .catch((err) => {
        console.log("Error:", err);
      });
  }
  // GETINPUTVALUE WILL SEND THE NEW INPUT TO THE SERVER AS POST REQUEST
  getInputValue() {
    const userValue = document.getElementById("toDo").value;

    console.log(userValue);

    fetch("http://localhost:3000/todoList", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        activity: `${userValue}`,
        date: "05/30/2022",
      }),
    })
      .then((data) => data.json())
      .catch((err) => {
        console.log("Error:", err);
      });
  }
  // When the page is rendered, it will trigger this function so we will get our data from the DB.
  componentDidMount() {
    fetch("http://localhost:3000/todoList/getData")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        // WE UPDATE THE STATE HERE
        this.setState({ itemList: data });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  render() {
    console.log("RENDERING");

    return (
      <div id="mainBody">
        <h1>CREATE YOUR OWN TO-DO LIST!!!</h1>
        <Item list={this.state.itemList} />
        <div>
          <div>
            <label>Date Selection</label>
            <input
              id="datee"
              type="date"
              onClick={() =>
                console.log(document.querySelector('input[id="datee"]').value)
              }
            />
          </div>
        </div>
        <input type="text" id="toDo" />
        <button id="postbtn" onClick={this.getInputValue}>
          POST!
        </button>
        <button id="retrieve" onClick={this.reset}>
          RESET!
        </button>
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
  }
  // itemDelete(id) {
  //   fetch("http://localhost:3000/todoList/itemdelete", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json; charset=UTF-8" },
  //     body: JSON.stringify({
  //       id: `${input}`,
  //     }),
  //   })
  //     .then((data) => data.json())
  //     .catch((err) => {
  //       console.log("Error:", err);
  //     });
  // }
  render() {
    const activity = [];
    for (let i = 0; i < this.props.list.length; i++) {
      activity.push(
        <div className="activityFeed" key={i}>
          <Box list={this.props.list[i]} onDelete={this.itemDelete} />
        </div>
      );
    }
    return activity;
  }
}

ReactDOM.render(<App />, document.getElementById("entry"));
