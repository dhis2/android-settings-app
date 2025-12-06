import { useAlert, useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { CircularLoader, ComponentCover } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { WorkflowContext } from './WorkflowContext'

const query = {
    programs: {
        resource: 'programs',
        params: {
            fields: [
                'id',
                'name',
                'programType',
                'categoryCombo[id,name]',
                'access',
            ],
            paging: 'false',
        },
    },
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: [
                'id',
                'name',
                'periodType',
                'categoryCombo[id,name]',
                'access',
            ],
            paging: 'false',
        },
    },
}

const WorkflowProvider = ({ children }) => {
    const { fetching, error, data, called } = useDataQuery(query)
    const { show } = useAlert(i18n.t('Failed to get data'), { critical: true })

    if (fetching || !called) {
        return (
            <ComponentCover dataTest="app-screen-cover">
                <CircularLoader dataTest="app-loader" />
            </ComponentCover>
        )
    }

    if (error) {
        return <>{show()}</>
    }

    const programs = data?.programs?.programs
    const dataSets = data?.dataSets?.dataSets

    const providerValue = { programs, dataSets }

    return (
        <WorkflowContext.Provider value={providerValue}>
            {children}
        </WorkflowContext.Provider>
    )
}

WorkflowProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { WorkflowProvider }
