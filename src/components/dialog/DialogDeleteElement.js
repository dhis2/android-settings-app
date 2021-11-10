import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'

const DialogDeleteElement = ({
    open,
    onHandleClose,
    text,
    element,
    onHandleDelete,
}) => (
    <>
        {open && (
            <Modal small position="middle" onClose={onHandleClose}>
                <ModalTitle>
                    {i18n.t('Delete {{element}}', { element })}
                </ModalTitle>
                <ModalContent>{text}</ModalContent>
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

DialogDeleteElement.propTypes = {
    open: PropTypes.bool,
    onHandleClose: PropTypes.func,
    onHandleDelete: PropTypes.func,
    text: PropTypes.string,
    element: PropTypes.string,
}

export default DialogDeleteElement
