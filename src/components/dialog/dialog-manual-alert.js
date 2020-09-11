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
import PropTypes from '@dhis2/prop-types'

const DialogManualAlert = ({ openDialog, onClose, chooseOption }) => (
    <>
        {openDialog && (
            <Modal small onClose={onClose} position="middle">
                <ModalTitle>{i18n.t('Select Manual option')}</ModalTitle>
                <ModalContent>
                    <p>
                        {i18n.t(
                            'By selecting Manual there will NOT be any AUTOMATIC SYNCHRONIZATION of data. Your users will need to sync manually for data to be sent to the server.'
                        )}
                    </p>

                    <p>{i18n.t('Do you want to select this option?')}</p>
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button onClick={onClose}>{i18n.t('Cancel')}</Button>
                        <Button onClick={chooseOption} primary>
                            {i18n.t('Ok')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

DialogManualAlert.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    chooseOption: PropTypes.func.isRequired,
}

export default DialogManualAlert
