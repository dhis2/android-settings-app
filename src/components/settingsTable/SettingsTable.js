import React from 'react'
import SettingsTableRow from './SettingTableRow'
import Wrapper from '../Wrapper'

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
