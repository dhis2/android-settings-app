import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import { RadioGroup } from './RadioGroup'
import styles from './styles/GroupType.module.css'

export const GroupType = ({ onChange, settings, groupList, type }) => {
    const [group, setGroup] = useState()

    const handleChange = e => {
        setGroup(e.value)
    }

    return (
        <div className={styles.container}>
            <RadioGroup
                onChange={handleChange}
                value={group}
                name="groupVisualization"
                groupName={settings}
                changeGroup={onChange}
                groups={groupList}
                type={type}
            />
        </div>
    )
}

GroupType.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    settings: PropTypes.object,
    groupList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
