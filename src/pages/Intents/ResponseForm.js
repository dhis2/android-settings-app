import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Intent.module.css'

const FieldWrapper = (props) => (
    <div className={styles.row}>{props.children}</div>
)

const ResponseForm = ({ data = {}, onChange }) => {
    return (
        <div className={styles.responseForm}>
            <FieldWrapper>
                <InputField
                    label={i18n.t('Argument')}
                    value={data.argument || ''}
                    onChange={(e) =>
                        onChange('response.data.argument', e.value)
                    }
                    required
                />
            </FieldWrapper>

            <FieldWrapper>
                <InputField
                    label={i18n.t('Path')}
                    value={data.path || ''}
                    onChange={(e) => onChange('response.data.path', e.value)}
                    required
                />
            </FieldWrapper>
        </div>
    )
}

ResponseForm.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
}

export default ResponseForm
