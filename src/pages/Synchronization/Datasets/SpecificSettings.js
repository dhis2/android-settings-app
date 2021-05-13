import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { Divider } from '@dhis2/ui'
import TableRow from '../../../components/settings-table/table-row'
import Wrapper from '../../../components/wrapper'
import { InputNumber } from '../../../components/inputs'
import { DataSpecificSetting } from '../../../constants/data-set-settings'
import { getPeriodDefaultValueByType } from './helper'
import tableTitleStyles from '../../../styles/TableTitle.module.css'

const DataSetTableRow = ({
    row,
    periodType,
    defaultValue,
    specificSettings,
    onChange,
}) => (
    <>
        <TableRow>
            <div>
                <p>
                    {row.option} ({periodType})
                </p>
                <em className={tableTitleStyles.attributeLabel}>
                    {i18n.t('Default')} : {defaultValue}
                </em>
            </div>
            <div>
                <InputNumber
                    onChange={onChange}
                    keyDownload={row.keyDownload}
                    value={specificSettings[row.keyDownload]}
                    disabled={specificSettings.disableAll}
                />
            </div>
        </TableRow>
        <Divider />
    </>
)

DataSetTableRow.propTypes = {
    row: PropTypes.object,
    periodType: PropTypes.string,
    defaultValue: PropTypes.number,
    specificSettings: PropTypes.object,
    onChange: PropTypes.func,
}

const SpecificSettings = ({ periodType, specificSettings, onChange }) => {
    const [defaultValue, setDefaultValue] = useState()

    useEffect(() => {
        setDefaultValue(getPeriodDefaultValueByType(periodType))
    }, [periodType])

    return (
        <Wrapper fullWidth>
            <div>
                {DataSpecificSetting.map(row => (
                    <DataSetTableRow
                        key={row.option}
                        row={row}
                        periodType={periodType}
                        defaultValue={defaultValue}
                        specificSettings={specificSettings}
                        onChange={onChange}
                    />
                ))}
            </div>
        </Wrapper>
    )
}

SpecificSettings.propTypes = {
    periodType: PropTypes.string,
    specificSettings: PropTypes.object,
    onChange: PropTypes.func,
}

export default SpecificSettings
