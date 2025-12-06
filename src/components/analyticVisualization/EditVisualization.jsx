import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    NotEditableElement,
    SelectVisualizationType,
    VisualizationGroup,
    VisualizationTitle,
} from './index'

const sections = {
    home: {
        type: 'home',
        typeName: '',
        label: i18n.t('Home'),
    },
    program: {
        type: 'program',
        typeName: 'programName',
        label: i18n.t('Program'),
    },
    dataset: {
        type: 'dataset',
        typeName: 'datasetName',
        label: i18n.t('Data set'),
    },
}

export const EditVisualization = ({
    open,
    settings,
    handleChange,
    currentGroup,
    groups,
    handleEdit,
    handleClose,
    type,
}) => {
    const typeName = sections[type].typeName || ''
    const label = sections[type].label || ''

    return (
        <>
            {open && (
                <Modal position="middle">
                    <ModalTitle>
                        {i18n.t('Edit {{label}} visualization', { label })}
                    </ModalTitle>
                    <ModalContent>
                        {type !== sections.dataset.type && (
                            <SelectVisualizationType
                                settings={settings}
                                onChange={handleChange}
                                disabled={true}
                            />
                        )}

                        {type !== sections.home.type && (
                            <NotEditableElement
                                value={settings[typeName]}
                                name={type}
                                label={label}
                            />
                        )}

                        <NotEditableElement
                            value={settings.visualizationName}
                            name="visualization"
                            label={i18n.t('Visualization item')}
                        />
                        <VisualizationTitle
                            settings={settings}
                            onChange={handleChange}
                        />
                        <VisualizationGroup
                            groupList={groups}
                            groupId={currentGroup}
                            settings={settings}
                            type={type}
                            disabled={true}
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
}

EditVisualization.propTypes = {
    open: PropTypes.bool,
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    currentGroup: PropTypes.string,
    groups: PropTypes.array,
    handleEdit: PropTypes.func,
    handleClose: PropTypes.func,
    type: PropTypes.string,
}
