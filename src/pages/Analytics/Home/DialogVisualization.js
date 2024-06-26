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
import {
    VisualizationGroup,
    SelectVisualization,
    VisualizationTitle,
    VisualizationUserTest,
    SelectVisualizationType,
} from '../../../components/analyticVisualization'
import buttonStyles from '../../../styles/Button.module.css'

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
                    <SelectVisualizationType
                        settings={settings}
                        onChange={handleChange}
                    />

                    {settings.type && (
                        <SelectVisualization
                            settings={settings}
                            onChange={handleChange}
                        />
                    )}

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
