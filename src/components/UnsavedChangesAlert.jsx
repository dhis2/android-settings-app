import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { Prompt } from 'react-router-dom'

const UnsavedChangesAlert = ({ unsavedChanges }) => {
    return (
        <Prompt
            when={unsavedChanges}
            message={i18n.t(
                'You have unsaved changes, if you leave you will lose your changes. Are you sure you want to leave?'
            )}
        />
    )
}
export default UnsavedChangesAlert
