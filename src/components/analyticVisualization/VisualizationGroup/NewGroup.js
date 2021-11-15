import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { Radio } from '@dhis2/ui'
import { TextField } from '../../field'
import { useSystemId } from '../../../utils/useSystemId'
import styles from './styles/GroupField.module.css'

export const NewGroup = ({ checked, groupName, changeGroup, ...props }) => {
    const { refetch: refetchId, data: id } = useSystemId()
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle('')
        refetchId()
    }, [checked])

    const handleChange = e => {
        setTitle(e.value)
        changeGroup({
            ...groupName,
            group: {
                name: e.value,
                id: id.system.codes[0],
            },
        })
    }

    return (
        <>
            <Radio checked={checked} {...props} />

            {checked && (
                <div className={styles.field}>
                    <TextField
                        dense
                        value={title}
                        onChange={handleChange}
                        placeholder={i18n.t('Add a group name')}
                    />
                </div>
            )}
        </>
    )
}

NewGroup.propTypes = {
    checked: PropTypes.bool,
    groupName: PropTypes.object,
    changeGroup: PropTypes.func,
}
