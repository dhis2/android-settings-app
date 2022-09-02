import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    spacers,
} from '@dhis2/ui'
import { Select } from '../../../components/inputs'
import SpecificSettings from './SpecificSettings'
import titleStyles from '../../../styles/LayoutTitles.module.css'
import buttonStyles from '../../../styles/Button.module.css'

const DialogNewProgram = ({
    open,
    handleClose,
    programTitle,
    handleChange,
    dataOptions,
    specificSettings,
    handleSave,
    hasCategoryCombo,
    spinnerSettings,
    disableSave,
    isTrackerProgram,
}) => (
    <>
        {open && (
            <Modal large onClose={handleClose} position="middle">
                <ModalTitle>{i18n.t('Program specific settings')}</ModalTitle>
                <ModalContent>
                    {programTitle ? (
                        <p className={titleStyles.mainContent__title__dialog}>
                            {programTitle}
                        </p>
                    ) : (
                        <Select
                            name="id"
                            inputWidth={spacers.dp384}
                            onChange={handleChange}
                            value={specificSettings.id || ''}
                            options={dataOptions}
                        />
                    )}

                    {specificSettings.name && (
                        <SpecificSettings
                            spinnerSettings={spinnerSettings}
                            hasCategoryCombo={hasCategoryCombo}
                            specificSettings={specificSettings}
                            handleSettings={handleChange}
                            isTrackerProgram={isTrackerProgram}
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
                        <Button onClick={handleSave} disabled={disableSave}>
                            {i18n.t('Save Program')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

DialogNewProgram.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    programTitle: PropTypes.string,
    handleChange: PropTypes.func,
    dataOptions: PropTypes.array,
    specificSettings: PropTypes.object,
    handleSave: PropTypes.func,
    hasCategoryCombo: PropTypes.bool,
    spinnerSettings: PropTypes.object,
    disableSave: PropTypes.bool,
    isTrackerProgram: PropTypes.bool,
}

export default DialogNewProgram
