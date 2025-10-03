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

const DialogDisableSettings = ({ openDialog, onClose, disableSettings }) => {
    return (
        <>
            {openDialog && (
                <Modal small position="middle" onClose={onClose}>
                    <ModalTitle>{i18n.t('Disable all settings')}</ModalTitle>
                    <ModalContent>
                        {i18n.t(
                            'This action will disable and remove all General, Synchronization, Appearance and Analytics settings. Are you sure you want to disable all settings?'
                        )}
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={onClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            <Button onClick={disableSettings} primary>
                                {i18n.t('Disable')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogDisableSettings.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    disableSettings: PropTypes.func.isRequired,
}

export default DialogDisableSettings
