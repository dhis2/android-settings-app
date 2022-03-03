import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { CheckboxField } from './CheckboxField'

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
                    'Allow the user to create a TEI without the prior search'
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
