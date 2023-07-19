import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import buttonStyles from '../../styles/Button.module.css'

export const AddNewSetting = ({ label, onClick, disable }) => (
    <Button
        className={buttonStyles.button__add}
        onClick={onClick}
        disabled={disable}
    >
        {label}
    </Button>
)

AddNewSetting.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    disable: PropTypes.bool,
}
