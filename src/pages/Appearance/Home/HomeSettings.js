import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import Wrapper from '../../../components/wrapper'
import { TableHeader, TableRowWrapper } from '../../../components/table'
import { CheckboxField } from '../../../components/field'
import { homeScreenRowSettings } from '../../../constants/home-appearance'

const HomeSettings = ({ states, onChange, disable }) => {
    const handleChange = e => {
        onChange({
            ...states,
            [e.name]: {
                filter: e.checked,
                sort: e.checked,
            },
        })
    }

    return (
        <Wrapper>
            <div>
                <TableHeader title={i18n.t('Show Filter')} />
                {homeScreenRowSettings.map(row => (
                    <TableRowWrapper row={row} disable={disable} key={row.key}>
                        <CheckboxField
                            name={row.key}
                            onChange={handleChange}
                            disabled={disable}
                            checked={states[row.key].filter}
                        />
                    </TableRowWrapper>
                ))}
            </div>
        </Wrapper>
    )
}

HomeSettings.propTypes = {
    states: PropTypes.object,
    onChange: PropTypes.func,
    disable: PropTypes.bool,
}

export default HomeSettings
