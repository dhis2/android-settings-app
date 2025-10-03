import React from 'react'
import Wrapper from '../Wrapper.jsx'
import SettingsTableRow from './SettingTableRow.jsx'

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
