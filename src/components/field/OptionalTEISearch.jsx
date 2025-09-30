import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckboxField } from './CheckboxField.jsx'

const CODE = 'optionalSearch'

export const OptionalTEISearch = ({
    isTrackerProgram,
    handleChange,
    settings,
}) => (
    <>
        {isTrackerProgram && (
            <CheckboxField
                name={CODE}
                label={i18n.t(
                    'Allow the user to create a TEI without searching'
                )}
                onChange={handleChange}
                checked={settings[CODE]}
            />
        )}
    </>
)

OptionalTEISearch.propTypes = {
    isTrackerProgram: PropTypes.bool,
    handleChange: PropTypes.func,
    settings: PropTypes.object,
}
