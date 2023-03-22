import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useApiVersion } from '../../utils/useApiVersion'
import { CheckboxField } from './CheckboxField'
import {
    defaultTrackerImporterVersion,
    newTrackerVersion,
    shouldUseNewTracker,
} from './TrackerImporter'

const CODE = 'trackerExporterVersion'

export const TrackerExporter = ({ value, onChange, ...props }) => {
    const [tracker, setTracker] = useState(value[CODE] === newTrackerVersion)
    const { apiVersion } = useApiVersion()
    const validVersion = apiVersion && shouldUseNewTracker(apiVersion)

    useEffect(() => {
        setTracker(value[CODE] === newTrackerVersion)
    }, [value[CODE]])

    const handleCheckbox = (e) => {
        setTracker(e.checked)
        onChange({
            ...value,
            [CODE]: e.checked
                ? newTrackerVersion
                : defaultTrackerImporterVersion,
        })
    }

    return (
        <>
            {validVersion && (
                <CheckboxField
                    name={CODE}
                    label={i18n.t(
                        'Use the new version of Tracker Exporter (Web API)'
                    )}
                    helpText={i18n.t(
                        'Use new tracker endpoints dedicated to querying tracker objects (including tracked entities, enrollments, events, and relationships).'
                    )}
                    checked={tracker}
                    onChange={handleCheckbox}
                    {...props}
                />
            )}
        </>
    )
}

TrackerExporter.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
