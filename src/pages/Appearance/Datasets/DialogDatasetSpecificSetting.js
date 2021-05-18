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
} from '@dhis2/ui'
import { Select } from '../../../components/inputs'
import SpecificSettings from './SpecificSettings'
import titleStyles from '../../../styles/LayoutTitles.module.css'
import buttonStyles from '../../../styles/Button.module.css'

const DialogDatasetSpecificSetting = ({
    open,
    handleClose,
    dataTitle,
    dataOptions,
    specificSettings,
    handleSave,
    handleChange,
    hasCategoryCombo,
    disableSave,
}) => (
    <>
        {open && (
            <Modal large onClose={handleClose}>
                <ModalTitle>{i18n.t('Data set specific settings')}</ModalTitle>
                <ModalContent>
                    {dataTitle ? (
                        <p className={titleStyles.mainContent__title__dialog}>
                            {dataTitle}
                        </p>
                    ) : (
                        <Select
                            name="id"
                            inputWidth="300px"
                            onChange={handleChange}
                            value={specificSettings.id || ''}
                            options={dataOptions}
                        />
                    )}

                    {specificSettings.name && (
                        <SpecificSettings
                            hasCategoryCombo={hasCategoryCombo}
                            specificSettings={specificSettings}
                            handleSettings={handleChange}
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
                            {i18n.t('Save Data set')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

DialogDatasetSpecificSetting.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    dataTitle: PropTypes.string,
    dataOptions: PropTypes.array,
    specificSettings: PropTypes.object,
    handleSave: PropTypes.func,
    handleChange: PropTypes.func,
    hasCategoryCombo: PropTypes.bool,
    disableSave: PropTypes.bool,
}

export default DialogDatasetSpecificSetting
