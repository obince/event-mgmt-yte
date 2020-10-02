import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class PeopleDialog extends Component {

    renderTableData() {
        return this.props.rows.map((element, index) => {
            const { name, surname, tcKimlikNo, email } = element
            return (
                <TableRow key={tcKimlikNo}>

                    <TableCell >{name}</TableCell>
                    <TableCell >{surname}</TableCell>
                    <TableCell >{tcKimlikNo}</TableCell>
                    <TableCell >{email}</TableCell>

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
                        <TableHead>

                            <TableRow>

                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                                <TableCell>T.C. ID Number</TableCell>
                                <TableCell>Email</TableCell>

                            </TableRow>

                        </TableHead>
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

export default PeopleDialog