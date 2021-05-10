import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    Modal,
    ModalContent,
    ModalTitle,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import buttonStyles from '../../styles/Button.module.css'
import {
    ProgramSection,
    TitleSection,
    VisualizationElement,
    VisualizationType,
    WHOElements,
} from '../../components/analytics'
import { WHO_NUTRITION } from './helper'

const DialogAnalyticsTEI = ({
    open,
    handleClose,
    handleSave,
    specificSettings,
    handleChange,
    edit,
    disableSave,
}) => {
    const [attributeOptions, setAttributeOptions] = useState([])

    return (
        <>
            {open && (
                <Modal large onClose={handleClose} position="middle">
                    <ModalTitle>{i18n.t('Add TEI Analytics')}</ModalTitle>
                    <ModalContent>
                        <ProgramSection
                            onChange={handleChange}
                            value={specificSettings}
                            edit={edit}
                        />

                        <TitleSection
                            onChange={handleChange}
                            value={specificSettings}
                        />

                        <VisualizationType
                            onChange={handleChange}
                            value={specificSettings}
                            handleWHOAttribute={setAttributeOptions}
                            edit={edit}
                        />

                        {specificSettings.type === WHO_NUTRITION ? (
                            <WHOElements
                                handleChange={handleChange}
                                specificSettings={specificSettings}
                                attributeOptions={attributeOptions}
                                edit={edit}
                            />
                        ) : (
                            <VisualizationElement
                                handleChange={handleChange}
                                specificSettings={specificSettings}
                                edit={edit}
                            />
                        )}
                    </ModalContent>

                    <ModalActions>
                        <ButtonStrip end>
                            <Button
                                onClick={handleClose}
                                className={
                                    buttonStyles.mainContent__dialog__button
                                }
                            >
                                {i18n.t('Cancel')}
                            </Button>
                            <Button onClick={handleSave} disabled={disableSave}>
                                {i18n.t('Add TEI Analytics')}
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            )}
        </>
    )
}

DialogAnalyticsTEI.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    specificSettings: PropTypes.object,
    handleChange: PropTypes.func,
    edit: PropTypes.bool,
    disableSave: PropTypes.bool,
}

export default DialogAnalyticsTEI
