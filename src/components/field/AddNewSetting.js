import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { Button } from '@dhis2/ui'
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
