import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui'
import {
    NotEditableElement,
    NotEditableGroup,
    VisualizationTitle,
} from '../../../components/analyticVisualization'

const EditVisualization = ({
    open,
    settings,
    handleChange,
    currentGroup,
    groups,
    handleEdit,
    handleClose,
}) => (
    <>
        {open && (
            <Modal position="middle">
                <ModalTitle>{i18n.t('Edit Program visualization')}</ModalTitle>
                <ModalContent>
                    <NotEditableElement
                        value={settings.programName}
                        name="program"
                        label={i18n.t('Program')}
                    />
                    <NotEditableElement
                        value={settings.visualizationName}
                        name="visualization"
                        label={i18n.t('Visualization item')}
                    />
                    <VisualizationTitle
                        settings={settings}
                        onChange={handleChange}
                    />
                    <NotEditableGroup
                        groupList={groups}
                        groupId={currentGroup}
                        settings={settings}
                        type="program"
                    />
                </ModalContent>
                <ModalActions>
                    <ButtonStrip end>
                        <Button onClick={handleClose}>
                            {i18n.t('Cancel')}
                        </Button>
                        <Button onClick={handleEdit}>
                            {i18n.t('Edit Visualization')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

EditVisualization.propTypes = {
    open: PropTypes.bool,
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    currentGroup: PropTypes.string,
    groups: PropTypes.array,
    handleEdit: PropTypes.func,
    handleClose: PropTypes.func,
}

export default EditVisualization
