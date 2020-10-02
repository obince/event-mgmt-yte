import React, {Component} from 'react';
import PaginationTable from "../components/admin_table/PaginationTable";
import Button from "@material-ui/core/Button";
import ReactDialog from "../components/dialogs/ReactDialog";
import PeopleDialog from "../components/dialogs/PeopleDialog";
import ChartDialog from "../components/dialogs/ChartDialog";
import PlusIcon from '@material-ui/icons/AddCircleTwoTone';
import axios from "axios";
import ShowChart from '@material-ui/icons/ShowChart';
import moment from 'moment';
import QuestionsDialog from "../components/dialogs/QuestionsDialog";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class AdminPage extends Component {

    addEventDialogFields = [
        {id: "eventNumber", label: "Event Number", type: "text" },
        {id: "title", label: "Name", type: "text"},
        {id: "startDate", label: "Start Date", type: "date"},
        {id: "endDate", label: "End Date", type: "date"},
        {id: "quota", label: "Quota", type: "int"},
    ]

    addQuestionDialogFields = [
        {id: "question", label: "Question", type: "text" }
    ]

    updateEventDialogFields = [
        {id: "title", label: "Name", type: "text" },
        {id: "startDate", label: "Start Date", type: "date" },
        {id: "endDate", label: "End Date", type: "date" },
        {id: "quota", label: "Quota", type: "int" },
    ]

    state = {
        rows: [],
        curPeople: [],
        curQuestions: [],
        chartInfo: [],
        curEventNumber: "",
        addEventModalOpen: false,
        addQuestionModalOpen: false,
        updateEventModalOpen: false,
        displayPeopleModalOpen: false,
        displayQuestionsModalOpen: false,
        displayChartModalOpen: false,
        snackbarProperties: {
            isOpen: false,
            message: "",
            severity: ""
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

        if ( userInput.eventNumber == null || userInput.title == null ||  userInput.startDate == null || userInput.endDate == null ||
             userInput.quota == null ) {
            this.snackbarOpen("You are already enrolled in this event with same email.", "error");
            return false;
        }

        if ( isNaN( parseInt(userInput.eventNumber))) {
            this.snackbarOpen("Event number must consist of numerics (0-9)", "error");
            return false;
        }

        else if ( this.findByEventNumber(userInput.eventNumber) != null ){
            this.snackbarOpen("Event number must be non-existent.", "error");
            return false;
        }

        else if ( userInput.startDate > userInput.endDate ) {
            this.snackbarOpen("End date must be after than start date.", "error");
            return false;
        }

        else if ( isNaN( parseInt(userInput.quota))) {
            this.snackbarOpen("Quota must be a number.", "error");
            return false;
        }

        return true;
    }

    validationCheckUpdate = (userInput) => {
        let valid = true;

        if ( isNaN( parseInt(userInput.quota))) {
            this.snackbarOpen("Quota must be a number.", "error");
            valid = false;
        }

        else if ( userInput.startDate > userInput.endDate ) {
            this.snackbarOpen("End date must be after than start date.", "error");
            valid = false;
        }

        return valid;
    }

    componentDidMount() {

        axios.get("/event")
            .then(response => {
                this.setState({rows: response.data})
            })
    }

    toggleAddEventModal = () => {
        this.setState({addEventModalOpen: !this.state.addEventModalOpen})
    }

    toggleAddQuestionModal = () => {
        this.setState({addQuestionModalOpen: !this.state.addQuestionModalOpen})
    }

    toggleUpdateEventModal = () => {
        this.setState({updateEventModalOpen: !this.state.updateEventModalOpen } )
    }

    toggleDisplayPeopleModal = () => {
        this.setState({displayPeopleModalOpen: !this.state.displayPeopleModalOpen } )
    }

    toggleDisplayQuestionsModal = () => {
        this.setState({displayQuestionsModalOpen: !this.state.displayQuestionsModalOpen } )
    }

    toggleDisplayChartModal = () => {
        this.setState({displayChartModalOpen: !this.state.displayChartModalOpen})
    }

    submitEventAdd = (userInput) => {
        this.toggleAddEventModal();

        if ( this.validationCheck(userInput) ) {
            axios.post("/event", userInput)
                .then(response => {
                    this.setState(prevState => (
                        {rows: [...prevState.rows, response.data]}
                    ));
                    this.snackbarOpen("Event has been added.", "success");
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
                    }
                    console.log(error.response);
                })
        }
    }

    onAskQuestion = (eventNumber) => {

        let event = this.findByEventNumber( eventNumber );
            this.setState(
                {curEventNumber: eventNumber},
                () => {
                    this.toggleAddQuestionModal();
                });

    }

    submitEventQuestion = (question) => {
        this.toggleAddQuestionModal();

        if ( question !== "" ) {
            axios.post("/event/" + this.state.curEventNumber + "/questions", question)
                .then(response => {
                    this.snackbarOpen("Question has been asked.", "success");
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.snackbarOpen("Question could not been added.", "error")
                    }
                })
        }
    }

    submitEventUpdate = (userInput) => {
        this.toggleUpdateEventModal()

        let myUserInput = this.buildMyUserInput( userInput )

        if ( this.validationCheckUpdate(myUserInput) ) {
            axios.put("/event/" + this.state.curEventNumber, myUserInput)
                .then(response => {
                    let newRows = [...this.state.rows];
                    for (let i = 0; i < newRows.length; i++)
                        if (newRows[i].eventNumber === this.state.curEventNumber)
                            newRows[i] = myUserInput;
                    this.setState(
                        {rows: newRows}
                    );
                    this.snackbarOpen("Event with event number " + this.state.curEventNumber + " has been updated.", "success")
                })
        }
    }

    onEventUpdate = (eventNumber) => {
        let event = this.findByEventNumber( eventNumber);

        if ( moment( event.startDate ).isBefore() )
            this.snackbarOpen("You cannot update an event whose start date is in past.", "error")
        else {
            this.setState(
                {curEventNumber: eventNumber},
                () => {
                    this.toggleUpdateEventModal();
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

    onEventDelete = (eventNumber) => {
        let event = this.findByEventNumber( eventNumber );
        if ( moment( event.startDate ).isBefore() )
            this.snackbarOpen("You cannot delete events whose start date is in past.", "error")
        else {

            axios.delete("/event/" + eventNumber)
                .then(response => {
                    this.setState({
                        rows: this.state.rows.filter((event) => event.eventNumber !== eventNumber)
                    })

                    this.snackbarOpen("Event with event number " + eventNumber + " has been deleted.", "success")
                })
        }
    }

    onDisplayChart = () => {
        let newChartInfo = [];
        let myRows = this.state.rows;
        for ( let i = 0; i < myRows.length; i++ ) {
            axios.get("/event/" + myRows[i].eventNumber + "/personno" )
                .then(response => {
                    newChartInfo[i] = { title: myRows[i].title, peopleSize: response.data }
                    if ( i === myRows.length - 1 ) {
                        this.setState({
                            chartInfo: newChartInfo
                        }, () => {
                            this.toggleDisplayChartModal();
                        });
                    }
                })
        }
    }

    onDisplayPeople = (eventNumber) => {
        this.setState(
            {curEventNumber: eventNumber}
            );
        this.updateCurPeople( eventNumber );
    }

    onDisplayQuestions = (eventNumber) => {
        this.setState(
            {curEventNumber: eventNumber}
        );
        this.updateCurQuestions( eventNumber );
    }

    updateCurPeople = (eventNumber) => {
        axios.get("/event/" + eventNumber + "/persons" )
            .then(response => {
                this.setState( {
                    curPeople: response.data
                }, () => {
                    this.toggleDisplayPeopleModal();
                });
            })
    }

    updateCurQuestions = (eventNumber) => {
        axios.get("/event/" + eventNumber + "/questions" )
            .then(response => {
                this.setState( {
                    curQuestions: response.data
                }, () => {
                    this.toggleDisplayQuestionsModal();
                });
            })
    }

    buildMyUserInput(userInput ) {
        let myuserInput = { eventNumber: this.state.curEventNumber,
                            title: userInput.title,
                            startDate: userInput.startDate,
                            endDate: userInput.endDate,
                            quota: userInput.quota }

        let originalData = this.findByEventNumber( this.state.curEventNumber );

        if ( myuserInput.title == null )
            myuserInput.title = originalData.title;
        if ( myuserInput.startDate == null )
            myuserInput.startDate = originalData.startDate;
        if ( myuserInput.endDate == null )
            myuserInput.endDate = originalData.endDate;
        if ( myuserInput.quota == null )
            myuserInput.quota = originalData.quota;

        return myuserInput;

    }

    render() {

        return (
            <div className="App">
                <h2 style={{ color: 'red' }}>  Admin Page  </h2>
            <Button variant="contained"
        color="secondary"
        style={{float: "left", margin: 20,}}
        onClick={this.onDisplayChart}
        startIcon={<ShowChart/>}>
        Display chart
        </Button>
                <Button variant="contained"
                        color="secondary"
                        style={{float: "right", margin: 20,}}
                        onClick={this.toggleAddEventModal}
                        startIcon={<PlusIcon/>}>
                    Add event
                </Button>
        <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={4000} onClose={this.snackbarClose}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
    <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
            {this.state.snackbarProperties.message}
            </Alert>
            </Snackbar>
                <ReactDialog fields={this.addQuestionDialogFields} title="Ask a Question" isOpen={this.state.addQuestionModalOpen} onClose={this.toggleAddQuestionModal}
                             onSubmit={this.submitEventQuestion}/>
            <ReactDialog fields={this.addEventDialogFields} title="Add Event" isOpen={this.state.addEventModalOpen} onClose={this.toggleAddEventModal}
        onSubmit={this.submitEventAdd}/>
            <ReactDialog fields={this.updateEventDialogFields} title="Update Event" isOpen={this.state.updateEventModalOpen} onClose={this.toggleUpdateEventModal}
        onSubmit={this.submitEventUpdate}/>
            <PeopleDialog title="Persons" isOpen={this.state.displayPeopleModalOpen} onClose={this.toggleDisplayPeopleModal} rows={this.state.curPeople} />
            <QuestionsDialog title="Questions" isOpen={this.state.displayQuestionsModalOpen} onClose={this.toggleDisplayQuestionsModal} rows={this.state.curQuestions} />
            <ChartDialog title="Person Number Chart - All and By Date Respectively" isOpen={this.state.displayChartModalOpen} onClose={this.toggleDisplayChartModal} rows={this.state.chartInfo}/>
            <PaginationTable rows={this.state.rows} onUpdate={this.onEventUpdate} onDelete={this.onEventDelete} onDisplay={this.onDisplayPeople} onAskQuestion={this.onAskQuestion} onDisplayQuestions={this.onDisplayQuestions}/>

            </div>

    );
    }
}

export default AdminPage;