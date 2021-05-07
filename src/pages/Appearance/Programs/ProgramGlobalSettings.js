import React from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import Wrapper from '../../../components/wrapper'
import PageHeader from '../../../components/page/PageHeader'
import { CheckboxField } from '../../../components/CheckboxField'
import { TableHeader, TableRowWrapper } from '../../../components/table'
import { programAppearanceSettings } from '../../../constants/program-appearance'
import { GlobalProgramCompletion } from '../../../components/field'

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
            <PageHeader title={i18n.t('Global settings')} />

            <GlobalProgramCompletion
                settings={spinnerSettings}
                onChange={onChangeSpinner}
                disable={disableAll}
            />

            <Wrapper>
                <div>
                    <TableHeader title={i18n.t('Show Filter')} />
                    {programAppearanceSettings.map(row => (
                        <TableRowWrapper
                            row={row}
                            disable={disableAll}
                            key={row.key}
                        >
                            <CheckboxField
                                name={row.key}
                                onChange={handleChange}
                                disabled={disableAll}
                                checked={settings[row.key].filter}
                            />
                        </TableRowWrapper>
                    ))}
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
