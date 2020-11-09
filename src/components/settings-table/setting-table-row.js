import React from 'react'
import { Divider } from '@dhis2/ui'
import cx from 'classnames'
import disable from '../../styles/Disable.module.css'
import { InputNumber, RadioField, SelectSettings } from '../inputs'
import TableRow from './table-row'

const InputChoice = ({ dataRow, states, onChange }) => (
    <>
        {Array.isArray(dataRow.download) === true ? (
            dataRow.radioButton === true ? (
                <RadioField
                    onChange={onChange}
                    keyDownload={dataRow.keyDownload}
                    value={states[dataRow.keyDownload]}
                    disabled={states.disableAll}
                    options={dataRow.download}
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
                {dataRow.option}
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
