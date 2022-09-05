import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import Wrapper from '../../../components/Wrapper'
import PageSubtitle from '../../../components/page/PageSubtitle'
import { TableHeader } from '../../../components/table'
import { GlobalProgramCompletion } from '../../../components/field'
import { ProgramGlobalSettings as GlobalSettings } from './TableSettings'

const ProgramGlobalSettings = ({
    settings,
    onChange,
    spinnerSettings,
    onChangeSpinner,
    disableAll,
}) => {
    const handleChange = e => {
        onChange({
            ...settings,
            [e.name]: {
                filter: e.checked,
                sort: e.checked,
            },
        })
    }

    return (
        <>
            <PageSubtitle title={i18n.t('Global settings')} />

            <GlobalProgramCompletion
                settings={spinnerSettings}
                onChange={onChangeSpinner}
                disable={disableAll}
            />

            <Wrapper>
                <div>
                    <TableHeader title={i18n.t('Show Filter')} />
                    <GlobalSettings
                        states={settings}
                        handleChange={handleChange}
                        disabled={disableAll}
                        dense={false}
                    />
                </div>
            </Wrapper>
        </>
    )
}

ProgramGlobalSettings.propTypes = {
    settings: PropTypes.object,
    spinnerSettings: PropTypes.object,
    disableAll: PropTypes.bool,
}

export default ProgramGlobalSettings
