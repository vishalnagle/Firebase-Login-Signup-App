import React from "react";
import { ReactDOM } from "react";
import "./Crud.css";

export default class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", age: "", data: [] };
  }

  handleAdd(e) {
    e.preventDefault();
    let details = {
      id: this.state.data.length + 1,
      name: this.state.name,
      age: this.state.age,
    };

    this.state.data = [...this.state.data, details];
    this.setState({ name: "", age: "" });
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }
  handleChangeAge(e) {
    this.setState({ age: e.target.value });
  }

  handleDelete(id) {
    let filteredData = this.state.data.filter((elm) => elm.id !== id);
    this.setState({ data: filteredData });
  }

  handleEdit(id) {
    const { name, age, data } = this.state;
    let editedItem = data.find((elm) => elm.id === id);
    console.log("editedItem", editedItem);
    this.setState({ name: editedItem.name, age: editedItem.age });
  }

  render() {
    const { name, age, data } = this.state;

    return (
      <div>
        <h1>Crud App</h1>
        <div className="form">
          <form onSubmit={this.handleAdd.bind(this)}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => this.handleChangeName(e)}
            />
            <br />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={age}
              onChange={(e) => this.handleChangeAge(e)}
            />
            <br />
            <button type="submit">Add</button>
          </form>
        </div>
        {/* Table div */}
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elm, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{elm.id}</td>
                    <td>{elm.name}</td>
                    <td>{elm.age}</td>
                    <td>
                      <button onClick={this.handleEdit.bind(this, elm.id)}>
                        Edit
                      </button>
                      <button onClick={this.handleDelete.bind(this, elm.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
