import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {
    InputNumber,
    MultiSelect,
    SelectSettings,
} from '../../../components/inputs'
import { TableRow } from '../../../components/table/'
import Wrapper from '../../../components/Wrapper'
import {
    SpecificProgram,
    specificSettingsDefault,
    TEI_DOWNLOAD,
} from '../../../constants/program-settings'
import tableTitleStyles from '../../../styles/TableTitle.module.css'
import { isValidValue } from '../../../utils/validators'

const getProgramFiltersById = (programId, list) => {
    const program = list?.find((p) => p.id === programId)
    return program?.filters
}

const SelectField = ({
    singleSelect,
    row,
    onChange,
    specificSetting,
    filters,
}) => {
    const emptyList = !isValidValue(filters) || filters?.length === 0

    return (
        <>
            {singleSelect ? (
                <SelectSettings
                    key={row.keyDownload}
                    onChange={onChange}
                    keyDownload={row.keyDownload}
                    value={specificSetting[row.keyDownload]}
                    options={row.download}
                />
            ) : (
                <MultiSelect
                    filterable
                    disabled={emptyList}
                    placeholder={
                        emptyList
                            ? i18n.t('No filters available')
                            : i18n.t('Choose a filter')
                    }
                    empty={i18n.t('No filters available')}
                    key={row.keyDownload}
                    onChange={(e) => onChange(e, row.keyDownload)}
                    selected={specificSetting[row.keyDownload]}
                    options={filters || []}
                />
            )}
        </>
    )
}

SelectField.propTypes = {
    singleSelect: PropTypes.bool,
    row: PropTypes.object,
    specificSetting: PropTypes.object,
    onChange: PropTypes.func,
    filters: PropTypes.array,
}

const ProgramTableRow = ({ row, specificSetting, onChange, filters }) => (
    <>
        <TableRow dense>
            <>
                <div>
                    <p> {row.option} </p>
                    {row.maxValue && (
                        <em className={tableTitleStyles.attributeLabel}>
                            {i18n.t('Default:')}
                            {row.keyDownload === TEI_DOWNLOAD
                                ? specificSettingsDefault.teiDownload
                                : specificSettingsDefault.eventsDownload}
                        </em>
                    )}
                </div>
                <div>
                    {Array.isArray(row.download) ? (
                        <SelectField
                            singleSelect={!row.multiple}
                            row={row}
                            onChange={onChange}
                            specificSetting={specificSetting}
                            filters={filters}
                        />
                    ) : (
                        <InputNumber
                            onChange={onChange}
                            keyDownload={row.keyDownload}
                            maxValue={row.maxValue}
                            value={specificSetting[row.keyDownload]}
                            step="50"
                        />
                    )}
                </div>
            </>
        </TableRow>
        <Divider />
    </>
)

ProgramTableRow.propTypes = {
    row: PropTypes.object,
    specificSetting: PropTypes.object,
    onChange: PropTypes.func,
}

const SpecificSettings = ({
    specificSetting,
    onChange,
    programWithRegistration,
    programOptions,
}) => (
    <Wrapper fullWidth>
        <div>
            {programWithRegistration
                ? SpecificProgram.withRegistration.map((row) => (
                      <ProgramTableRow
                          key={row.option}
                          row={row}
                          specificSetting={specificSetting}
                          onChange={onChange}
                          filters={getProgramFiltersById(
                              specificSetting.id,
                              programOptions
                          )}
                      />
                  ))
                : SpecificProgram.withoutRegistration.map((row) => (
                      <ProgramTableRow
                          key={row.option}
                          row={row}
                          specificSetting={specificSetting}
                          onChange={onChange}
                          filters={getProgramFiltersById(
                              specificSetting.id,
                              programOptions
                          )}
                      />
                  ))}
        </div>
    </Wrapper>
)

SpecificSettings.propTypes = {
    specificSetting: PropTypes.object,
    onChange: PropTypes.func,
    completeListOptions: PropTypes.array,
}

export default SpecificSettings
