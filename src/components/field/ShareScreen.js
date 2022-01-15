import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { CheckboxField } from './CheckboxField'

const CODE = 'allowScreenCapture'

export const defaultShareScreen = false

export const ShareScreen = ({ value, onChange, ...props }) => {
    const handleCheckbox = e => {
        onChange({ ...value, [CODE]: e.checked })
    }

    return (
        <CheckboxField
            name={CODE}
            label={i18n.t(
                'Allow user to take screenshots and share their screen.'
            )}
            checked={value[CODE]}
            onChange={handleCheckbox}
            {...props}
        />
    )
}

ShareScreen.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
