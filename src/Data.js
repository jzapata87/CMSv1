import React from 'react';




class Data extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hide: true,
      data: {
        key: null,
        text: ''
      }
    }

  }

  componentDidMount() {
    this.setState({
      data: {
        ...this.state.data,
        key: this.props.id,
      },
    });
  }


  handleDataChange = (event) => {
      this.props.liveUpdate(event.target.value)
      this.setState({
        data: {
          ...this.state.data,
          text: event.target.value,
        },
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addDataToState(this.state.data)
    this.toggleEditField()

  }

  toggleEditField = () => {
    this.setState({hide: !this.state.hide})
  }

  focusTextArea = () => {
    this.toggleEditField()
  }

  handleDelete = (data) => {
    this.props.deleteFromState(data)
  }

  add = (data) => {
    this.props.handleAdd(data)
  }

  handleTest = (e) => {
    //console.log(e.target.selectionStart)

    if (e.key === "Backspace" && e.target.selectionStart === 0) {
      this.toggleEditField()
    }
  }

  render() {


    return (

      <div>
        { this.state.hide ?
          <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea onKeyDown={this.handleTest} ref={this.textArea} autoFocus={true} value={this.state.data.text}
              onChange={this.handleDataChange}
              style={{width: "400px", height: "50px"}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={()=>this.handleDelete(this.state.data)}>Delete</button>
        <button onClick={()=>this.add(this.state.data)}>Add</button>
      </div>

        : <p onClick={this.focusTextArea}>{this.state.data.text}</p>}
      </div>
    );
  }
}

export default Data;
