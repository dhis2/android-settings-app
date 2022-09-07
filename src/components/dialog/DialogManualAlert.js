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
import { DATA, METADATA, METADATA_SYNC } from '../../constants/android-settings'

const DialogManualAlert = ({
    openDialog,
    onClose,
    chooseOption,
    manualOptionType,
}) => {
    const type = manualOptionType === METADATA_SYNC ? METADATA : DATA

    return (
        <>
            {openDialog && (
                <Modal small onClose={onClose} position="middle">
                    <ModalTitle>{i18n.t('Select Manual option')}</ModalTitle>
                    <ModalContent>
                        <p>
                            {i18n.t(
                                'By selecting Manual there will NOT be any AUTOMATIC SYNCHRONIZATION of {{type}}. Your users will need to download the {{type}} manually.',
                                { type }
                            )}
                        </p>

                        <p>{i18n.t('Do you want to select this option?')}</p>
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip end>
                            <Button onClick={onClose}>
                                {i18n.t('Cancel')}
                            </Button>
                            <Button onClick={chooseOption} primary>
                                {i18n.t('Yes')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogManualAlert.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    chooseOption: PropTypes.func.isRequired,
    manualOptionType: PropTypes.string,
}

export default DialogManualAlert
