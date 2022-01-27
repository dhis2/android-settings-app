import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import { CheckboxField } from '../../field'
import { GroupType } from './GroupType'
import { useSystemId } from '../../../utils/useSystemId'

const DEFAULT = 'default'

const findDefaultGroup = (type, groupList, settings) => {
    let defaultGroup

    switch (type) {
        case 'program':
        case 'dataset':
            const selectedGroup = groupList[settings[type]]
            defaultGroup = find(selectedGroup, g => g.name === DEFAULT)
            break
        default:
            defaultGroup = find(groupList, g => g.name === DEFAULT)
            break
    }

    return defaultGroup
}

export const VisualizationGroup = ({ settings, onChange, groupList, type }) => {
    const { data: id } = useSystemId()
    const [group, setGroup] = useState(true)
    const [groupType, setGroupType] = useState(true)

    const handleChange = e => {
        setGroup(e.checked)
        setGroupType(e.checked)
        if (!isEmpty(groupList)) {
            const defaultFound = findDefaultGroup(type, groupList, settings)
            onChange({
                ...settings,
                [e.name]: {
                    name: DEFAULT,
                    id: defaultFound ? defaultFound.id : id.system.codes[0],
                },
            })
        }
    }

    return (
        <>
            <CheckboxField
                name="group"
                label={i18n.t('Use a group visualization')}
                checked={group}
                onChange={handleChange}
            />

            {groupType && (
                <GroupType
                    onChange={onChange}
                    settings={settings}
                    groupList={groupList}
                    type={type}
                />
            )}
        </>
    )
}

VisualizationGroup.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
    groupList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
