import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

class DialogDelete extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onHandleClose}>
                <DialogTitle>
                    Are you sure you want to delete {this.props.name}{' '}
                    {this.props.typeName} settings?
                </DialogTitle>
                <DialogActions style={{ borderTop: 'none' }}>
                    <Button onClick={this.props.onHandleDelete} color="primary">
                        Delete
                    </Button>
                    <Button
                        onClick={this.props.onHandleClose}
                        color="primary"
                        autoFocus
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogDelete
