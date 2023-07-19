import React from 'react'
import Wrapper from '../Wrapper'
import SettingsTableRow from './SettingTableRow'

const SettingsTable = ({ data, states, onChange }) => (
    <Wrapper>
        <div>
            {data.map((row) => (
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
