import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import { CheckboxField, TextField } from '../../field'
import styles from './styles/GroupField.module.css'

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

const isDefaultGroup = group => group.name === 'default'

export const NotEditableGroup = ({ groupList, groupId, settings, type }) => {
    const [group, setGroup] = useState(false)
    const [title, setTitle] = useState('')

    useEffect(() => {
        const groupFound = findGroup(type, { groupList, groupId }, settings)
        if (!isDefaultGroup(groupFound)) {
            setGroup(!!groupFound)
            setTitle(groupFound.name)
        }
    }, [groupList])

    return (
        <>
            <CheckboxField
                name="group"
                label={i18n.t('Use a group visualization')}
                checked={group}
                disabled
            />

            {group && (
                <div className={styles.field}>
                    <TextField dense value={title} disabled />
                </div>
            )}
        </>
    )
}

NotEditableGroup.propTypes = {
    groupId: PropTypes.string,
    groupList: PropTypes.array,
    settings: PropTypes.object,
    type: PropTypes.string,
}
