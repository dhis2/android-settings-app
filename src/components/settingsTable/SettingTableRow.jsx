import { Divider, Help } from '@dhis2/ui'
import cx from 'classnames'
import React from 'react'
import disable from '../../styles/Disable.module.css'
import tableTitleStyles from '../../styles/TableTitle.module.css'
import { InputNumber, RadioGroup, SelectSettings } from '../inputs'
import TableRow from './TableRow.jsx'

const InputChoice = ({ dataRow, states, onChange }) => (
    <>
        {Array.isArray(dataRow.download) === true ? (
            dataRow.radioButton === true ? (
                <RadioGroup
                    onChange={onChange}
                    keyDownload={dataRow.keyDownload}
                    value={states[dataRow.keyDownload]}
                    disabled={states.disableAll}
                    options={dataRow.download}
                    defaultValues={dataRow.defaultValues}
                />
            ) : (
                <SelectSettings
                    onChange={onChange}
                    keyDownload={dataRow.keyDownload}
                    value={states[dataRow.keyDownload]}
                    disabled={states.disableAll}
                    options={dataRow.download}
                />
            )
        ) : (
            <InputNumber
                onChange={onChange}
                keyDownload={dataRow.keyDownload}
                maxValue={dataRow.maxValue}
                value={states[dataRow.keyDownload]}
                disabled={states.disableAll}
            />
        )}
    </>
)

const SettingsTableRow = ({ dataRow, states, onChange }) => (
    <div>
        <TableRow>
            <div className={cx({ [disable.disable_label]: states.disableAll })}>
                <p className={tableTitleStyles.attribute}>{dataRow.option}</p>
                {dataRow.helpText && (
                    <Help className={tableTitleStyles.helpText}>
                        {dataRow.helpText}
                    </Help>
                )}
            </div>
            <div>
                <InputChoice
                    dataRow={dataRow}
                    states={states}
                    onChange={onChange}
                />
            </div>
        </TableRow>
        <Divider />
    </div>
)

export default SettingsTableRow
