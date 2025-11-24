import { Divider, Help } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
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

InputChoice.propTypes = {
    dataRow: PropTypes.shape({
        download: PropTypes.string,
        keyDownload: PropTypes.string,
        defaultValues: PropTypes.array,
        radioButton: PropTypes.bool,
        maxValue: PropTypes.number,
    }),
    states: PropTypes.shape({
        disableAll: PropTypes.bool,
    }),
    onChange: PropTypes.func,
}

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

SettingsTableRow.propTypes = {
    dataRow: PropTypes.shape({
        option: PropTypes.string,
        helpText: PropTypes.string,
    }),
    states: PropTypes.shape({
        disableAll: PropTypes.bool,
    }),
    onChange: PropTypes.func,
}

export default SettingsTableRow
