import React from 'react'
import PropTypes from 'prop-types'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import buttonStyles from '../../../styles/Button.module.css'
import {
    VisualizationGroup,
    SelectDataset,
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
            <Modal large position="middle">
                <ModalTitle>{i18n.t('Add Data set visualization')}</ModalTitle>

                <ModalContent>
                    <SelectDataset
                        settings={settings}
                        onChange={handleChange}
                    />

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
                                type="dataset"
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
                            {i18n.t('Add Data set Visualization')}
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
    groups: PropTypes.object,
}

export default DialogVisualization
