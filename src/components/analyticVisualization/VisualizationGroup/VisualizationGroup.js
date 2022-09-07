import i18n from '@dhis2/d2-i18n'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSystemId } from '../../../utils/useSystemId'
import { CheckboxField, TextField } from '../../field'
import { GroupType } from './GroupType'
import styles from './styles/GroupField.module.css'

const DEFAULT = 'default'

const findDefaultGroup = (type, groupList, settings) => {
    let defaultGroup

    switch (type) {
        case 'program':
        case 'dataset':
            const selectedGroup = groupList[settings[type]]
            defaultGroup = find(selectedGroup, (g) => g.name === DEFAULT)
            break
        default:
            defaultGroup = find(groupList, (g) => g.name === DEFAULT)
            break
    }

    return defaultGroup
}

const isDefaultGroup = (group) => (group.name === DEFAULT)

const findGroup = (type, group, settings) => {
    const { groupList, groupId } = group

    switch (type) {
        case 'program':
        case 'dataset':
            return settings.group
        default:
            return find(groupList, g => g.id === groupId)
    }
}

export const VisualizationGroup = ({ settings, onChange, groupList, type, groupId, disabled }) => {
    const { refetch: refetchId, data: id } = useSystemId()
    const [group, setGroup] = useState(true)
    const [groupType, setGroupType] = useState(true)
    const [title, setTitle] = useState('')

    useEffect(() => {
        refetchId()
        const groupFound = findGroup(type, { groupList, groupId }, settings)
        if (disabled) {
            if (!isDefaultGroup(groupFound)) {
                setGroup(!!groupFound)
                setTitle(groupFound.name)
            } else {
                setGroup(false)
            }
        }
    }, [])

    const handleChange = (e) => {
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
                disabled={disabled}
            />

            {disabled ?
                group && (
                    <div className={styles.field}>
                        <TextField dense value={title} disabled />
                    </div>
                )
                : groupType && (
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
