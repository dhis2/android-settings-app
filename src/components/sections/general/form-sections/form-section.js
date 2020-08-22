import React from 'react'
import PropTypes from '@dhis2/prop-types'
import formStyles from '../../../../styles/Form.module.css'

const FormSection = props => (
    <div className={formStyles.row}>{props.children}</div>
)

FormSection.propTypes = {
    children: PropTypes.element,
}

export default FormSection
