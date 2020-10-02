import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class ReactDialog extends Component {

  state = {
    userInput: {...this.props.data}
  }

  closeModal = () => {
    let initialState = { eventNumber: null, title: null, startDate: null, endDate:null, quota:null }

    this.setState({
      userInput: initialState
    });
  }

  handleInputChange = (event) => {
    event.persist();
    console.log(event.target);

    this.setState(prevState => {
      console.log(event.target)
      let userInput = {...prevState.userInput};
      userInput[event.target.id] = event.target.value;
      return {userInput};
    })
  }


  render() {

    return (
      <Dialog open={this.props.isOpen} onClose={() => {this.props.onClose(); this.closeModal();}} aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>

        <DialogContent>
          {this.props.fields.map(field => {

            return (
              <TextField margin="dense" id={field.id} label={field.label} type={field.type}
                         onChange={this.handleInputChange}/>
            );
          })}

        </DialogContent>

        <DialogActions>

          <Button onClick={() => {this.props.onClose(); this.closeModal();}} color="secondary">
            Cancel
          </Button>

          <Button onClick={() => {this.props.onSubmit(this.state.userInput); this.closeModal();}} color="secondary">
            Submit
          </Button>

        </DialogActions>
      </Dialog>
    );
  }
}

export default ReactDialog