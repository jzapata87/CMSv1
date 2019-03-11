import React from 'react';




class Test extends React.Component {

  constructor(props) {
    super(props)
    this.textInput = React.createRef();
    this.state = {
      hide: this.props.show,
      data: {
        key: null,
        text: ''
      }
    }

  }

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  componentDidMount() {
    this.setState({
      //hide: this.props.show,
      data: {
        ...this.state.data,
        text: this.state.text,
      },
    });


  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show) {
      //this.focusTextInput()
      this.setState({hide: true})
      this.setState({
        //hide: this.props.show,
        data: {
          ...this.state.data,
          key: this.props.id,
        },
      });
      console.log("=====didupdate========")
      console.log("=====show========", this.props.show)
      console.log("=====prevProps========", prevProps.show)
      console.log("=====text========", this.state.data.text)
    }

  }


  handleDataChange = (event) => {
      this.setState({
        data: {
          ...this.state.data,
          text: event.target.value,
        },
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({hide: false})
    this.props.addToState(this.state.data)
    //this.toggleEditField()

  }

  toggleEditField = () => {
    this.setState({hide: !this.state.hide})
  }

  focusTextArea = () => {
    this.toggleEditField()
  }

  handleTest = (e) => {
    //console.log(e.target.selectionStart)

    if (e.key === "Backspace" && e.target.selectionStart === 0) {
      this.toggleEditField()
      this.props.focus(this.props.id)
      console.log('hihihi')
    }
  }

  render() {

    console.log("=======this.state.hide in redener ", this.state.hide)
    console.log("=======this.state.show in redener ", this.props.show)
    console.log(this.state.hide)
    return (

      <div>
        { this.state.hide ?
          <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea onKeyUp={this.handleTest} ref={this.textInput} autoFocus={true} value={this.state.data.text}
              onChange={this.handleDataChange}
              style={{width: "400px", height: "50px"}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

        : <p onClick={this.focusTextArea}>{this.state.data.text}</p>}
      </div>
    );
  }
}

export default Test;
