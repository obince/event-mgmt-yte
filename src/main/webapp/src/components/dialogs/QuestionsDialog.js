import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class QuestionsDialog extends Component {

    renderTableData() {
        return this.props.rows.map((element, index) => {

            let str = element.toString();
            console.log(str);

            let first_index = str.indexOf("question");

            str = str.substring(first_index + 11, str.length - 2);

            return (
                <TableRow key={index}>

                    <TableCell >{str}</TableCell>

                </TableRow>
            )
        })
    }

    render() {
        return (
            <Dialog open={this.props.isOpen} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">

                        <TableBody>
                            {this.renderTableData()}
                        </TableBody>

                    </Table>
                </TableContainer>

                <DialogActions>

                    <Button onClick={this.props.onClose} color="secondary">
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>
    )
    ;
}
}

export default QuestionsDialog