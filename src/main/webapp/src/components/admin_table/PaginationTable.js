import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import {TablePageController} from "./TablePageController";

export default class PaginationTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      rows: []
    };
  }

  columns = [
    {id: 'eventNumber', label: 'Event Number', minWidth: 150},
    {id: 'title', label: 'Name', minWidth: 100},
    {id: 'startDate', label: 'Start Date', minWidth: 150, align: 'center',},
    {id: 'endDate', label: 'End Date', minWidth: 150, align: 'center',},
    {id: 'quota', label: 'Quota', minWidth: 150, align: 'center',},
    {id: "update", label: "Update Event", align: "center", onClick: this.props.onUpdate},
    {id: "delete", label: "Delete Event", align: "center", onClick: this.props.onDelete},
    {id: "display", label: "Display Persons", align: "center", onClick: this.props.onDisplay},
    {id: "ask", label: "Ask Question", align: "center", onClick: this.props.onAskQuestion},
    {id: "questions", label: "Display Questions", align: "center", onClick: this.props.onDisplayQuestions},
  ];

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    });
  };


  render() {
    return (
      <Paper>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">

            <TableHeader columns={this.columns}/>
            <TableContent rows={this.props.rows} page={this.state.page} rowsPerPage={this.state.rowsPerPage}
                          columns={this.columns} onDisplay={this.props.onDisplay} onDisplayQuestions={this.props.onDisplayQuestions}/>
          </Table>
        </TableContainer>

        <TablePageController count={this.state.rows.length}
                             rowsPerPage={this.state.rowsPerPage}
                             page={this.state.page} handleChangePage={this.handleChangePage}
                             handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
      </Paper>
    );
  }


}
