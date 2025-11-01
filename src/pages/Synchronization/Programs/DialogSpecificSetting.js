import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    spacers,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Select } from '../../../components/inputs'
import buttonStyles from '../../../styles/Button.module.css'
import titleStyles from '../../../styles/LayoutTitles.module.css'
import SpecificSettings from './SpecificSettings'

const DialogSpecificSetting = ({
    open,
    handleClose,
    programTitle,
    handleChange,
    programOptions,
    specificSetting,
    handleSubmitDialog,
    disableSave,
    programWithRegistration,
}) => (
    <>
        {open && (
            <Modal large onClose={handleClose} position="middle">
                <ModalTitle>{i18n.t('Values per Program')}</ModalTitle>
                <ModalContent>
                    {programTitle ? (
                        <p className={titleStyles.mainContent__title__dialog}>
                            {programTitle}
                        </p>
                    ) : (
                        <Select
                            name="name"
                            inputWidth={spacers.dp384}
                            onChange={handleChange}
                            value={specificSetting.id || ''}
                            options={programOptions}
                        />
                    )}

                    {specificSetting.id && (
                        <SpecificSettings
                            specificSetting={specificSetting}
                            onChange={handleChange}
                            programWithRegistration={programWithRegistration}
                            programOptions={programOptions}
                        />
                    )}
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button
                            onClick={handleClose}
                            className={buttonStyles.mainContent__dialog__button}
                        >
                            {i18n.t('Cancel')}
                        </Button>
                        <Button
                            onClick={handleSubmitDialog}
                            disabled={disableSave}
                        >
                            {i18n.t('Save Program')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

DialogSpecificSetting.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    programTitle: PropTypes.string,
    handleChange: PropTypes.func,
    programOptions: PropTypes.array,
    specificSetting: PropTypes.object,
    handleSubmitDialog: PropTypes.func,
    programWithRegistration: PropTypes.bool,
    disableSave: PropTypes.bool,
}

export default DialogSpecificSetting
