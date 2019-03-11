import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Data from './Data.js'
import Test from './Test.js'

const insert = (arr, index, newItem) => [
// part of the array before the specified index
...arr.slice(0, index),
// inserted item
newItem,
// part of the array after the specified index
...arr.slice(index)
]

class App extends Component {

  state = {
    id: 0,
    newIndex:null,
    sections: [],
    list: [],
    otherList:[],
    testList:[],
    dataList:[],
    show:[]
  }

  addDataToState = (data) => {console.log(this.state.newIndex, " ======newindex")
    console.log(this.state.id, " ======id")
    let newList = insert(this.state.list, this.state.newIndex || this.state.id, data)
    this.setState({list: newList})
    this.setState({newIndex: null})

  }

  //adds a div live so that we can see it in re
  liveUpdate = (data) => {
    console.log("this is id", this.state.id)
    let newState = [...this.state.otherList];
    newState[this.state.id] = data;
    this.setState({otherList: newState})
    console.log(this.state.otherList)

  }


  //adds a consecutive div
  handleAdd = (data) => {
    console.log(this.state.newIndex||this.state.id)
    let index = this.state.list.findIndex(item => item === data)
    this.setState({newIndex: index+1})
    let newSections = insert(this.state.sections, index+1, <Data liveUpdate={this.liveUpdate} handleAdd={this.handleAdd} key={this.state.id} id={this.state.id} deleteFromState={this.deleteFromState} addDataToState={this.addDataToState}/>)
    this.setState({sections: newSections})
    this.setState({id: this.state.id + 1})
  }

  handleClick = () => {

    this.setState({sections: [...this.state.sections, <Data liveUpdate={this.liveUpdate} handleAdd={this.handleAdd} key={this.state.id} id={this.state.id} deleteFromState={this.deleteFromState} addDataToState={this.addDataToState}/>]})
    this.setState({id: this.state.id + 1})
  }

  handleClickTest = () => {
    this.setState({show: [...this.state.show, true]})
    this.setState({testList: [...this.state.testList, this.state.id]})
    this.setState({id: this.state.id + 1})
  }

  deleteFromState = (data) => {
    console.log(data, '  data--------------')
    let filteredArray = this.state.list.filter(item => item !== data)
    console.log(filteredArray, "  filtered ")
    let index = this.state.list.findIndex(item => item === data)
    console.log(index, ' index ======================')
    let filteredSection = this.state.sections.filter((item, i) => index !== i)
    this.setState({list: filteredArray});
    this.setState({sections: filteredSection});
    // this.setState({list: this.state.list.filter(function(item,index) {
    //     return item[index] !== id
    // })});
  }

  focus = (id) => {
    let newShow = this.state.show.map((item, i) => i === id-1 ? !item : item )
    console.log("=======newShow array========= ", newShow)
    this.setState({show: newShow })

  }

  addToState = (data) => {
    this.setState({dataList:[...this.state.dataList, data]})
  }


  render() {
    console.log(this.state.show, 'shhhow')
    const listItems = this.state.list.map((item) =>
    <p key={item.key}>{item.text}</p>
    // console.log(item, " ", item[index])

    );

    const otherListItems = this.state.otherList.map((item,index) =>
    <p key={index}>{item}</p>
    // console.log(item, " ", item[index])

    );


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.handleClick}>Add More</button>
          <button onClick={this.handleClickTest}>Add TEST</button>

        </header>
        {this.state.sections}
        <h1>Blog View</h1>
        {
          listItems
          // console.log(this.state.list)
        }

        <h1>2nd View</h1>
        {
          otherListItems
          // console.log(this.state.list)
        }
        <h1>3rd View</h1>
        {
          this.state.testList.map((item,i) => (
            <Test key={item} id={item} show={this.state.show[i]} addToState={this.addToState} focus={this.focus}>{item}</Test>
          ))

        }
      </div>
    );
  }
}

export default App;
