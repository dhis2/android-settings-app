import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useApiVersion } from '../../utils/useApiVersion'
import { CheckboxField } from './CheckboxField'

const CODE = 'trackerImporterVersion'
const minApiVersion = '2.38'
const minApiVersionNewTrackerDefault = '2.40'

export const defaultTrackerImporterVersion = 'V1'
export const newTrackerVersion = 'V2'

const isValidVersion = (apiVersion) => apiVersion >= minApiVersion
const shouldUseNewTracker = (apiVersion) =>
    apiVersion >= minApiVersionNewTrackerDefault

export const TrackerImporter = ({ value, onChange, ...props }) => {
    const [validVersion, setValidVersion] = useState(false)
    const [tracker, setTracker] = useState(value[CODE] === newTrackerVersion)
    const { apiVersion } = useApiVersion()

    useEffect(() => {
        if (apiVersion) {
            isValidVersion(apiVersion)
                ? setValidVersion(true)
                : setValidVersion(false)

            if (shouldUseNewTracker(apiVersion)) {
                onChange({
                    ...value,
                    [CODE]: newTrackerVersion,
                })
                setTracker(true)
            }
        }
    }, [apiVersion])

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
                        'Use the new version of Tracker Importer (Web API)'
                    )}
                    helpText={i18n.t(
                        'Use new tracker endpoints dedicated to importing and querying tracker objects (including tracked entities, enrollments, events, and relationships). Be aware that some functionality might not be ready in the new endpoints, although primary use-cases are supported.'
                    )}
                    checked={tracker}
                    onChange={handleCheckbox}
                    {...props}
                />
            )}
        </>
    )
}

TrackerImporter.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
