import React, {Component} from 'react';
import ImageComponent from "../components/ImageComponent";
import Snackbar from "@material-ui/core/Snackbar";
import PaginationTable from "../components/user_table/PaginationTable";
import axios from "axios";
import ReactDialog from "../components/dialogs/ReactDialog";
import moment from 'moment';
import Alert from "@material-ui/lab/Alert";

class UserPage extends Component {

    eventDialogFields = [
        {id: "name", label: "Name", type: "text"},
        {id: "surname", label: "Surname", type: "text"},
        {id: "tcKimlikNo", label: "T.C. ID Number", type: "text"},
        {id: "email", label: "Email", type: "text"}
    ]


    constructor() {
        super();
        this.state = {
            rows: [],
            curEventNumber: "",
            addPersonModalOpen: false,
            snackbarProperties: {
                isOpen: false,
                message: "",
                severity: ""
            }
        }
    }

    findByEventNumber = (eventNumber) => {
        for ( let i = 0; i < this.state.rows.length; i++ ) {
            if ( this.state.rows[i].eventNumber === eventNumber )
                return this.state.rows[i];
        }
        return null;
    }

    validationCheck = (userInput) => {
        if ( userInput.name == null || userInput.surname == null || userInput.tcKimlikNo == null || userInput.email == null) {
            this.snackbarOpen("You are already enrolled in this event with the same email.", "error");
            return false;
        }

        if (isNaN(parseInt(userInput.tcKimlikNo)) || userInput.tcKimlikNo.length !== 11 ) {
            this.snackbarOpen("T.C. ID number is not valid.", "error");
            return false;
        }

        return true;
    }

    componentDidMount() {

        axios.get("/event")
            .then(response => {
                this.setState({
                    rows: response.data.filter((event) => moment( event.startDate ).isAfter() )
                })
            })
    }

    toggleAddPersonModal = () => {
        this.setState({addPersonModalOpen: !this.state.addPersonModalOpen})
    }

    submitAddPerson = (userInput) => {
        this.toggleAddPersonModal()

        if ( this.validationCheck(userInput) ) {

            axios.post("/event/" + this.state.curEventNumber + "/persons", userInput)
                .then(response => {

                    if ( !response.data )
                        this.snackbarOpen("You cannot enroll in this event - You are already enrolled in.", "error");
                    else {
                        this.snackbarOpen("You have enrolled in the event with event number " + this.state.curEventNumber + ".", "success");

                        let newRows = [...this.state.rows]
                        for (let i = 0; i < newRows.length; i++) {
                            if (newRows[i].eventNumber === this.state.curEventNumber)
                                newRows[i].quota--;
                        }
                        this.setState({rows: newRows})
                    }
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
                    }

                    console.log(error.response);
                })
        }
    }

    onAddPerson = (eventNumber) => {

        if ( this.findByEventNumber( eventNumber ).quota <= 0 )
            this.snackbarOpen("Quota must be bigger than 0.", "error");
        else {
            this.setState(
                {curEventNumber: eventNumber},
                () => {
                    this.toggleAddPersonModal();
                });
        }
    }


    snackbarOpen = (message, severity) => {
        console.log(message, severity);

        this.setState(prevState => {
            let snackbarProperties = {...prevState.snackbarProperties}
            snackbarProperties.isOpen = true;
            snackbarProperties.message = message;
            snackbarProperties.severity = severity;
            return {snackbarProperties};
        })
    }

    snackbarClose = () => {

        this.setState(prevState => {
            let snackbarProperties = {...prevState.snackbarProperties}
            snackbarProperties.isOpen = false;
            snackbarProperties.message = "";
            snackbarProperties.severity = "";
            return {snackbarProperties};
        })
    }


    render() {

        return (
            <div className="App">

                <h2 style={{ color: 'red' }} > User Page </h2>

                <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={4000} onClose={this.snackbarClose}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                        {this.state.snackbarProperties.message}
                    </Alert>
                </Snackbar>

                <ReactDialog fields={this.eventDialogFields} title="Enroll in the Event" isOpen={this.state.addPersonModalOpen} onClose={this.toggleAddPersonModal}
                             onSubmit={this.submitAddPerson}/>

                <PaginationTable rows={this.state.rows} onAddPerson={this.onAddPerson}/>

                <ImageComponent/>
            </div>
        );
    }


}

export default UserPage;