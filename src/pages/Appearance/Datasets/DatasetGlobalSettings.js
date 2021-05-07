import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import Wrapper from '../../../components/wrapper'
import { TableHeader, TableRowWrapper } from '../../../components/table'
import { CheckboxField } from '../../../components/field'
import { datasetAppearanceSettings } from '../../../constants/dataset-appearance'

const DatasetGlobalSettings = ({ disable, settings, onChange }) => {
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
            <h4> {i18n.t('Global settings')} </h4>
            <Wrapper>
                <div>
                    <TableHeader title={i18n.t('Show Filter')} />
                    {datasetAppearanceSettings.map(row => (
                        <TableRowWrapper
                            row={row}
                            disable={disable}
                            key={row.key}
                        >
                            <CheckboxField
                                name={row.key}
                                onChange={handleChange}
                                disabled={disable}
                                checked={settings[row.key].filter}
                            />
                        </TableRowWrapper>
                    ))}
                </div>
            </Wrapper>
        </>
    )
}

DatasetGlobalSettings.propTypes = {
    settings: PropTypes.object,
    disable: PropTypes.bool,
}

export default DatasetGlobalSettings
