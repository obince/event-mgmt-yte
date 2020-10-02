import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import DialogContent from "@material-ui/core/DialogContent";

class ChartDialog extends Component {

    render() {

        return (
            <Dialog fullScreen open={this.props.isOpen} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <Paper>
                        <Chart
                            data={this.props.rows}
                        >
                            <ValueScale name="peopleSize" />

                            <ArgumentAxis />
                            <ValueAxis scaleName="peopleSize" showLine showTicks />

                            <BarSeries
                                name="Person Numbers"
                                valueField="peopleSize"
                                argumentField="title"
                                scaleName="peopleSize"
                            />

                            <Legend />
                        </Chart>

                    </Paper>
                    <Paper>
                        <Chart
                            data={this.props.rows}
                        >
                            <ValueScale name="peopleSize" />

                            <ArgumentAxis />
                            <ValueAxis scaleName="peopleSize" showLine showTicks />

                            <BarSeries
                                name="Person Numbers"
                                valueField="peopleSize"
                                argumentField="title"
                                scaleName="peopleSize"
                            />

                            <Legend />
                        </Chart>

                    </Paper>

                </DialogContent>

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

export default ChartDialog