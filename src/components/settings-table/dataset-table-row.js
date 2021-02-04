import React from 'react'

import i18n from '@dhis2/d2-i18n'
import tableTitleStyles from '../../styles/TableTitle.module.css'
import { InputNumber } from '../inputs'
import TableRow from './table-row'
import { Divider } from '@dhis2/ui'

const DataSetTableRow = ({
    dataRow,
    periodType,
    defaultValue,
    states,
    onChange,
}) => (
    <div>
        <TableRow>
            <div>
                <p>
                    {dataRow.option} ({periodType})
                </p>
                <em className={tableTitleStyles.attributeLabel}>
                    {i18n.t('Default')} : {defaultValue}
                </em>
            </div>
            <div>
                <InputNumber
                    onChange={onChange}
                    keyDownload={dataRow.keyDownload}
                    value={states[dataRow.keyDownload]}
                    disabled={states.disableAll}
                />
            </div>
        </TableRow>
        <Divider />
    </div>
)

export default DataSetTableRow
