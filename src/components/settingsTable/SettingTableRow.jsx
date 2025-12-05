import { Divider, Help } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import disable from '../../styles/Disable.module.css'
import tableTitleStyles from '../../styles/TableTitle.module.css'
import { InputNumber, RadioGroup, SelectSettings } from '../inputs'
import TableRow from './TableRow.jsx'

const SelectorType = ({ radioButton, onChange, dataRow, states }) => (
    <>
        {radioButton === true ? (
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
        )}
    </>
)

SelectorType.propTypes = {
    radioButton: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    dataRow: PropTypes.shape({
        download: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        keyDownload: PropTypes.string,
        defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        maxValue: PropTypes.number,
    }),
    states: PropTypes.shape({
        disableAll: PropTypes.bool,
    }),
}

const InputChoice = ({ dataRow, states, onChange }) => (
    <>
        {Array.isArray(dataRow.download) === true ? (
            <SelectorType
                radioButton={dataRow.radioButton}
                onChange={onChange}
                dataRow={dataRow}
                states={states}
            />
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
