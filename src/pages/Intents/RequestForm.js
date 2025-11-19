import i18n from '@dhis2/d2-i18n'
import { Button, IconAdd16, IconDelete16, NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { TextField } from '../../components/field/TextField'
import { generateDhis2Id } from '../../utils/generateId'
import styles from './Intent.module.css'

const RequestForm = ({ argumentsData = [], onChange }) => {
    const handleAdd = () => {
        const newParam = { id: generateDhis2Id(), key: '', value: '' }
        onChange('request.arguments', [...argumentsData, newParam])
    }

    const handleDelete = (id) => {
        const updated = argumentsData.filter((param) => param.id !== id)
        onChange('request.arguments', updated)
    }

    const handleChange = (id, field, value) => {
        const updated = argumentsData.map((param) =>
            param.id === id ? { ...param, [field]: value } : param
        )
        onChange('request.arguments', updated)
    }

    return (
        <div>
            {argumentsData?.length === 0 && (
                <NoticeBox>
                    <span>
                        {i18n.t('No requests parameters have been added')}
                    </span>
                </NoticeBox>
            )}
            {argumentsData.map(({ id, key, value }) => (
                <div key={id} className={styles.argumentRow}>
                    <div className={styles.argumentColumn}>
                        <TextField
                            label={i18n.t('Key')}
                            value={key}
                            onChange={({ value }) =>
                                handleChange(id, 'key', value)
                            }
                        />
                    </div>
                    <div className={styles.argumentColumn}>
                        <TextField
                            label={i18n.t('Value')}
                            value={value}
                            onChange={({ value }) =>
                                handleChange(id, 'value', value)
                            }
                        />
                    </div>
                    <Button
                        small
                        destructive
                        icon={<IconDelete16 />}
                        onClick={() => handleDelete(id)}
                    />
                </div>
            ))}

            <div className={styles.addButtonWrapper}>
                <Button small icon={<IconAdd16 />} onClick={handleAdd}>
                    {i18n.t('Add parameter')}
                </Button>
            </div>
        </div>
    )
}

RequestForm.propTypes = {
    argumentsData: PropTypes.array,
    onChange: PropTypes.func.isRequired,
}

export default RequestForm
