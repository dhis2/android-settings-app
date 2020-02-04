import React from 'react'

import { Button } from '@dhis2/ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import i18n from '@dhis2/d2-i18n'

const DialogDelete = ({
    open,
    onHandleClose,
    name,
    typeName,
    onHandleDelete,
}) => {
    return (
        <Dialog open={open} onClose={onHandleClose}>
            <DialogTitle>
                Are you sure you want to delete {name} {typeName} settings?
            </DialogTitle>
            <DialogActions style={{ borderTop: 'none' }}>
                <Button onClick={onHandleDelete} primary>
                    {i18n.t('Delete')}
                </Button>
                <Button onClick={onHandleClose} primary autoFocus>
                    {i18n.t('Cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDelete
