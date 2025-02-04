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

const DialogDatasetSpecificSetting = ({
    open,
    handleClose,
    dataTitle,
    dataOptions,
    specificSettings,
    handleSave,
    handleChange,
    hasCategoryCombo,
    dataSetConfiguration,
    disableSave,
}) => (
    <>
        {open && (
            <Modal large position="middle" onClose={handleClose}>
                <ModalTitle>{i18n.t('Data set specific settings')}</ModalTitle>
                <ModalContent>
                    {dataTitle ? (
                        <p className={titleStyles.mainContent__title__dialog}>
                            {dataTitle}
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
                            hasCategoryCombo={hasCategoryCombo}
                            specificSettings={specificSettings}
                            dataSetConfiguration={dataSetConfiguration}
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
