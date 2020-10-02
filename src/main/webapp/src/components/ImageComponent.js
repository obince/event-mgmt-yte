import React from "react";
import Button from "@material-ui/core/Button";
export default class ImageComponent extends React.Component {
    state = { isOpen: false };

    handleShowDialog = () => {
        this.setState({ isOpen: !this.state.isOpen });
        console.log("clicked");
    };

    render() {
        return (
            <div>
                <div > LATEST ENROLLED IN EVENT'S QRCODE </div>

                    <dialog
                        className="dialog"
                        style={{ position: "absolute" }}
                        open
                        onClick={this.handleShowDialog}
                    >
                        <img
                            className="image"
                            src={process.env.PUBLIC_URL + '/QRCode.jpg'}
                            onClick={this.handleShowDialog}
                            alt="no image"
                        />
                    </dialog>

            </div>
        );
    }
}
