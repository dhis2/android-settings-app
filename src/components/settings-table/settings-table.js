import React from 'react'
import SettingsTableRow from './setting-table-row'
import Wrapper from '../wrapper'

const SettingsTable = ({ data, states, onChange }) => (
    <Wrapper>
        <div>
            {data.map(row => (
                <SettingsTableRow
                    key={row.option}
                    dataRow={row}
                    states={states}
                    onChange={onChange}
                />
            ))}
        </div>
    </Wrapper>
)

export default SettingsTable
