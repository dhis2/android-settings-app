import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { AddNewSetting } from '../../components/field'

// TODO: create handleClick function, and modal to create a new intent
const NewIntent = ({ disable }) => {
    return (
        <AddNewSetting
            label={i18n.t('Add Intent')}
            onClick={() => {}}
            disable={disable}
        />
    )
}

NewIntent.propTypes = {
    disable: PropTypes.bool.isRequired,
}

export default NewIntent
