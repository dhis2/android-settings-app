import React from 'react'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from '@dhis2/prop-types'
import UnsavedChangesAlert from '../unsaved-changes-alert'

const SectionWrapper = ({ loading, unsavedChanges, children }) => {
    if (loading === true) {
        return <CircularLoader small />
    }

    return (
        <>
            <UnsavedChangesAlert unsavedChanges={unsavedChanges} />
            {children}
        </>
    )
}

SectionWrapper.propTypes = {
    loading: PropTypes.bool,
    unsavedChanges: PropTypes.bool,
    children: PropTypes.element.isRequired,
}

export default SectionWrapper
