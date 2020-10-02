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
    {id: 'eventNumber', label: 'Event Code', minWidth: 150},
    {id: 'title', label: 'Title', minWidth: 100},
    {id: 'startDate', label: 'Start Date', minWidth: 150, align: 'center',},
    {id: 'endDate', label: 'End Date', minWidth: 150, align: 'center',},
    {id: 'quota', label: 'Quota', minWidth: 150, align: 'center',},
    {id: "addPerson", label: "Enroll In", align: "center", onClick: this.props.onAddPerson}
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
                          columns={this.columns} onAddPerson={this.props.onAddPerson}/>

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
