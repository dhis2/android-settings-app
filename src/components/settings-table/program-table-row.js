import React from 'react'
import i18n from '@dhis2/d2-i18n'
import tableTitleStyles from '../../styles/TableTitle.module.css'
import {
    specificSettingsDefault,
    TEI_DOWNLOAD,
} from '../../constants/program-settings'
import { InputNumber, SelectSettings } from '../inputs'
import TableRow from './table-row'
import { Divider } from '@dhis2/ui'

const ProgramTableRow = ({ dataRow, states, onChange }) => (
    <div>
        <TableRow>
            <div>
                <p> {dataRow.option} </p>
                {dataRow.maxValue ? (
                    <em className={tableTitleStyles.attributeLabel}>
                        {i18n.t('Default:')}
                        {dataRow.keyDownload === TEI_DOWNLOAD
                            ? specificSettingsDefault.teiDownload
                            : specificSettingsDefault.eventsDownload}
                    </em>
                ) : (
                    false
                )}
            </div>
            <div>
                {Array.isArray(dataRow.download) === true ? (
                    <SelectSettings
                        key={dataRow.keyDownload}
                        onChange={onChange}
                        keyDownload={dataRow.keyDownload}
                        value={states[dataRow.keyDownload]}
                        disabled={states.disableAll}
                        options={dataRow.download}
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
            </div>
        </TableRow>
        <Divider />
    </div>
)

export default ProgramTableRow
