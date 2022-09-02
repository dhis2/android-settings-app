import React, {useEffect, useState} from 'react'
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
import {VisualizationGroup, VisualizationTitle} from "./index";

const EditVisualization = ({open, settings, handleChange, currentGroup, groups, handleEdit, handleClose, type}) => {
    const [typeName, useTypeName] = useState('')
    const [label, useLabel] = useState('')

    const chooseTypeName = type => {
        switch (type) {
            case 'home':
                useTypeName('')
                useLabel('Home')
                break
            case 'program':
                useTypeName('programName')
                useLabel('Program')
                break
            case 'dataset':
                useTypeName('datasetName')
                useLabel('Data set')
        }
    }

    useEffect(() => {
        chooseTypeName(type)
    }, [type])

    return (
        <>
            {open && (
                <Modal position="middle">
                    <ModalTitle>{i18n.t('Edit {{label}} visualization', {label})}</ModalTitle>
                    <ModalContent>
                        { type !=='home' &&
                            <NotEditableElement
                                value={settings[typeName]}
                                name={type}
                                label={label}
                            />
                        }

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

export default EditVisualization
