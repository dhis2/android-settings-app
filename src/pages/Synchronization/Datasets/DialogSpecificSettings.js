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

const DialogSpecificSettings = ({
    open,
    handleClose,
    datasetTitle,
    handleChange,
    datasetOptions,
    specificSetting,
    handleSubmitDialog,
    periodType,
    disableSave,
}) => (
    <>
        {open && (
            <Modal large onClose={handleClose} position="middle">
                <ModalTitle>{i18n.t('Values per Data set')}</ModalTitle>
                <ModalContent>
                    {datasetTitle ? (
                        <p className={titleStyles.mainContent__title__dialog}>
                            {datasetTitle}
                        </p>
                    ) : (
                        <Select
                            name="name"
                            inputWidth={spacers.dp384}
                            onChange={handleChange}
                            value={specificSetting.id || ''}
                            options={datasetOptions}
                        />
                    )}

                    {specificSetting.id && (
                        <SpecificSettings
                            specificSettings={specificSetting}
                            onChange={handleChange}
                            periodType={periodType}
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
                            {i18n.t('Save Data set')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

DialogSpecificSettings.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    periodType: PropTypes.string,
    datasetTitle: PropTypes.string,
    handleChange: PropTypes.func,
    datasetOptions: PropTypes.array,
    specificSetting: PropTypes.object,
    handleSubmitDialog: PropTypes.func,
    disableSave: PropTypes.bool,
}

export default DialogSpecificSettings
