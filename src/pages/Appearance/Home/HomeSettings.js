import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import Wrapper from '../../../components/Wrapper'
import { TableHeader, TableRowWrapper } from '../../../components/table'
import { CheckboxField } from '../../../components/field'

const homeScreenRowSettings = [
    {
        key: 'date',
        label: i18n.t('Date'),
    },
    {
        key: 'organisationUnit',
        label: i18n.t('Organisation Unit'),
    },
    {
        key: 'syncStatus',
        label: i18n.t('Sync status'),
    },
    {
        key: 'assignedToMe',
        label: i18n.t('Assigned to me'),
    },
]

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
                {homeScreenRowSettings.map(({ key, label }) => (
                    <TableRowWrapper label={label} disable={disable} key={key}>
                        <CheckboxField
                            name={key}
                            onChange={handleChange}
                            disabled={disable}
                            checked={states[key].filter}
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
