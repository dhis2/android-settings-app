import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import buttonStyles from '../../../styles/Button.module.css'
import {
    VisualizationGroup,
    SelectVisualization,
    VisualizationTitle,
    VisualizationUserTest,
} from '../../../components/analyticVisualization'

const DialogVisualization = ({
    open,
    settings,
    handleChange,
    disableSave,
    handleClose,
    handleSave,
    groups,
}) => (
    <>
        {open && (
            <Modal>
                <ModalTitle>{i18n.t('Add Home visualization')}</ModalTitle>

                <ModalContent>
                    <SelectVisualization
                        settings={settings}
                        onChange={handleChange}
                    />

                    {settings.visualization && (
                        <>
                            <VisualizationTitle
                                settings={settings}
                                onChange={handleChange}
                            />

                            <VisualizationGroup
                                settings={settings}
                                onChange={handleChange}
                                groupList={groups}
                            />

                            <VisualizationUserTest
                                visualization={settings.visualization}
                                visualizationName={settings.visualizationName}
                            />
                        </>
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
                            {i18n.t('Add Home Visualization')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

DialogVisualization.propTypes = {
    open: PropTypes.bool,
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    disableSave: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    groups: PropTypes.array,
}

export default DialogVisualization
