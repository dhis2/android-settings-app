import { CircularLoader } from '@dhis2/ui'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import TableActions from '../../components/TableActions'
import NewIntent from './NewIntent'

// TODO: create function to model the data that will be save in Datastore, get Data elements and attributes
const CustomIntentsList = ({ settings, handleSettings, disable }) => {
    const loading = false
    const rows = settings
    const initialRows = useMemo(() => {
        return settings
    }, [settings])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleSettings(rows)
        }
    }, [rows])

    return (
        <>
            {loading && <CircularLoader />}
            {rows.length > 0 && <RowList rows={rows} disable={disable} />}

            <NewIntent disable={disable} />
        </>
    )
}

CustomIntentsList.propTypes = {
    settings: PropTypes.array.isRequired,
    handleSettings: PropTypes.func.isRequired,
    disable: PropTypes.bool.isRequired,
}

// TODO: create actions functions (delete and edit)
const RowList = ({ rows, disable }) => {
    const menuActions = {}

    return (
        <TableActions rows={rows} menuActions={menuActions} states={disable} />
    )
}

RowList.propTypes = {
    rows: PropTypes.array,
    disable: PropTypes.bool,
}

export default CustomIntentsList
