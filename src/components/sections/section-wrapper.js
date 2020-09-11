import React from 'react'
import { CircularLoader } from '@dhis2/ui'
import UnsavedChangesAlert from '../unsaved-changes-alert'

const SectionWrapper = ({ loading, unsavedChanges, ...props }) => {
    if (loading === true) {
        return <CircularLoader small />
    }

    return (
        <>
            <UnsavedChangesAlert unsavedChanges={unsavedChanges || null} />
            {props.children}
        </>
    )
}

export default SectionWrapper
