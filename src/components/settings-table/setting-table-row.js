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
                    data={dataRow}
                    onChange={onChange}
                    states={states}
                />
            ) : (
                <SelectSettings
                    data={dataRow}
                    states={states}
                    onChange={onChange}
                />
            )
        ) : (
            <InputNumber data={dataRow} states={states} onChange={onChange} />
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
