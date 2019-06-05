import React from 'react'

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isChecked: props.isChecked || false,
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
      this.setState({ isChecked: !this.state.isChecked })
    }
    render () {
      return (
        <label className="switch">
          <input type="checkbox" value={this.state.isChecked} onChange={this.handleChange} onClick = {this.props.toggle} />
          <div className="slider"></div>
        </label>
      );
    }
  }
  
  export default Toggle
  