import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const DialogSaveData = ({ openDialog, onClose, saveDataStore }) => {
    return (
        <>
            {openDialog && (
                <Modal small onClose={onClose} position="middle">
                    <ModalTitle>{i18n.t('Save new configuration')}</ModalTitle>
                    <ModalContent>
                        {i18n.t(
                            "You are about to update the configuration settings. Please confirm if you'd like to proceed?"
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
