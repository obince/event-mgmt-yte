import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswer from '@material-ui/icons/QuestionAnswerTwoTone';
import Ask from '@material-ui/icons/HelpOutlineTwoTone';
import People from '@material-ui/icons/PeopleAltTwoTone';


export default function TableContent(props) {

  let iconMap = {
    "update": <CreateIcon style={{fill: "red"}}/>,
    "delete": <DeleteIcon style={{fill: "red"}}/>,
    "display": <People style={{fill: "red"}}/>,
    "questions": <QuestionAnswer style={{fill: "red"}}/>,
    "ask": <Ask style={{fill: "red"}}/>
  }


  return (

    <TableBody>
      {getRowSlice().map(row => createTableRow(row))}
    </TableBody>

  );

  function getRowSlice() {

    return props
      .rows
      .slice(calculatePageBeginning(), calculatePageEnd());
  }

  function calculatePageBeginning() {
    return props.page * props.rowsPerPage;
  }

  function calculatePageEnd() {
    return props.page * props.rowsPerPage + props.rowsPerPage;
  }

  function createTableRow(row) {

    return (
      <TableRow hover role="checkbox" key={row.eventNumber}>
        {props.columns.map(column => createTableCell(column, row))}
      </TableRow>
    );
  }

  function createTableCell(column, row) {

    let cellValue = row[column.id];
    if (column.id === "update" || column.id === "delete"  || column.id === "ask" || column.id === "questions" || column.id === "display") {
      cellValue = createIcon(column.id, column.onClick, row.eventNumber);
    }

    return (

      <TableCell key={column.id} align={column.align}>
        {cellValue}
      </TableCell>
    );
  }

  function createIcon(key, onClick, eventNumber) {
    return (

      <IconButton aria-label={key} color="red" onClick={() => onClick(eventNumber)}>
        {iconMap[key]}
      </IconButton>
    )
  }

}