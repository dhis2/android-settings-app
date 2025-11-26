import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { InputNumber, SelectSettings } from '../../../components/inputs'
import { TableRow } from '../../../components/table/'
import Wrapper from '../../../components/Wrapper.jsx'
import {
    SpecificProgram,
    specificSettingsDefault,
    TEI_DOWNLOAD,
} from '../../../constants/program-settings'
import tableTitleStyles from '../../../styles/TableTitle.module.css'

const ProgramTableRow = ({ row, specificSetting, onChange }) => (
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
                        <SelectSettings
                            key={row.keyDownload}
                            onChange={onChange}
                            keyDownload={row.keyDownload}
                            value={specificSetting[row.keyDownload]}
                            options={row.download}
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
                      />
                  ))
                : SpecificProgram.withoutRegistration.map((row) => (
                      <ProgramTableRow
                          key={row.option}
                          row={row}
                          specificSetting={specificSetting}
                          onChange={onChange}
                      />
                  ))}
        </div>
    </Wrapper>
)

SpecificSettings.propTypes = {
    specificSetting: PropTypes.object,
    onChange: PropTypes.func,
    programWithRegistration: PropTypes.bool,
}

export default SpecificSettings
