import React from 'react'

import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'

const DialogSaveData = ({ openDialog, onClose, saveDataStore }) => {
    return (
        <>
            {openDialog && (
                <Modal small onClose={onClose} position="middle">
                    <ModalTitle>{i18n.t('Save in DataStore')}</ModalTitle>
                    <ModalContent>
                        {i18n.t(
                            'Saving settings in DataStore is a critical action that could have very serious consequences. Are you sure you want to save these settings in DataStore?'
                        )}
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={onClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            <Button onClick={saveDataStore} primary>
                                {i18n.t('Save')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogSaveData.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    saveDataStore: PropTypes.func.isRequired,
}

export default DialogSaveData
