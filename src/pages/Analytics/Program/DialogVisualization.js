import i18n from '@dhis2/d2-i18n'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ButtonStrip,
    Button,
    ModalActions,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    VisualizationGroup,
    SelectProgram,
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
            <Modal large position="middle">
                <ModalTitle>{i18n.t('Add Program visualization')}</ModalTitle>
                <ModalContent>
                    <SelectVisualizationType
                        settings={settings}
                        onChange={handleChange}
                    />
                    <SelectProgram
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
                                type="program"
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
                            {i18n.t('Add Program Visualization')}
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
