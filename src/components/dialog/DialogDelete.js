import React from 'react'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const DialogDelete = ({
    open,
    onHandleClose,
    name,
    typeName,
    onHandleDelete,
}) => {
    return (
        <>
            {open && (
                <Modal small position="middle" onClose={onHandleClose}>
                    <ModalTitle>
                        {i18n.t('Delete {{typeName}}', { typeName })}
                    </ModalTitle>
                    <ModalContent>
                        {i18n.t(
                            'Are you sure you want to delete {{name}} {{typeName}} settings?',
                            { name: name, typeName: typeName }
                        )}
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={onHandleClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            <Button onClick={onHandleDelete} destructive>
                                {i18n.t('Delete')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

export default DialogDelete
