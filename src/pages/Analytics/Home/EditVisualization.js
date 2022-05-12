import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import {
    NotEditableGroup,
    NotEditableElement,
    VisualizationTitle,
} from '../../../components/analyticVisualization'

const EditVisualization = ({
    open,
    settings,
    handleChange,
    groups,
    currentGroup,
    handleClose,
    handleEdit,
}) => (
    <>
        {open && (
            <Modal position="middle">
                <ModalTitle>{i18n.t('Edit Home visualization')}</ModalTitle>
                <ModalContent>
                    <NotEditableElement
                        value={settings.visualizationName}
                        name="visualizationName"
                        label={i18n.t('Visualization item')}
                    />
                    <VisualizationTitle
                        settings={settings}
                        onChange={handleChange}
                    />
                    <NotEditableGroup
                        groupList={groups}
                        groupId={currentGroup}
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
    groups: PropTypes.array,
    currentGroup: PropTypes.string,
    handleClose: PropTypes.func,
    handleEdit: PropTypes.func,
}

export default EditVisualization
