import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useApiVersion } from '../../utils/useApiVersion'
import { CheckboxField } from './CheckboxField.jsx'
import { HelpText } from './HelpText.jsx'
import {
    defaultTrackerImporterVersion,
    newTrackerVersion,
    shouldUseNewTracker,
} from './TrackerImporter.jsx'

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
                    helpText={
                        <HelpText
                            helpText={i18n.t(
                                'Use new tracker endpoints dedicated to querying tracker objects (including tracked entities, enrollments, events, and relationships).'
                            )}
                            warning={i18n.t(
                                'Only applicable for users using Android app version 2.8 or later.'
                            )}
                            type="info"
                            version={i18n.t('2.8 +')}
                        />
                    }
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
