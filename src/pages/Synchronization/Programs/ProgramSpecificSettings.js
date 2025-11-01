import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/page/PageHeader'
import {
    filterListByReadAccess,
    filterUnusedElements,
} from '../../../utils/utils'
import { prepareSpecificSettingsList } from './helper'
import NewProgramSpecific from './NewProgramSpecific'
import { useProgramFilters } from './ProgramQueries'
import SpecificTableAction from './SpecificTableAction'

const ProgramSpecificSettings = ({
    specificSettings,
    changeSpecificSettings,
    disabled,
}) => {
    const { programFilterList, loading } = useProgramFilters()
    const [programList, setProgramList] = useState([])
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [listName, setListName] = useState()
    const [loadSpecific, setLoad] = useState(false)

    useEffect(() => {
        if (specificSettings && loading) {
            const list = filterListByReadAccess(programFilterList)
            const rowList = prepareSpecificSettingsList(specificSettings, list)
            setProgramList(list)
            setInitialRows(rowList)
            setRows(rowList)
            setListName(filterUnusedElements(list, rowList))
            setLoad(true)
        }
    }, [specificSettings, programFilterList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            changeSpecificSettings(keyBy(rows, 'id'))
        }
    }, [rows])

    return (
        <>
            <PageHeader
                title={i18n.t('Programs specific download sync settings')}
                desc={i18n.t(
                    'Applies only to the assigned program. Program specific settings will overwrite the global settings above.'
                )}
            />
            {loadSpecific && (
                <>
                    {rows && (
                        <SpecificTableAction
                            rows={rows}
                            changeRows={setRows}
                            programList={programList}
                            disableAll={disabled}
                        />
                    )}

                    <NewProgramSpecific
                        programList={listName}
                        rows={rows}
                        handleRows={setRows}
                        disabled={disabled}
                    />
                </>
            )}
        </>
    )
}

ProgramSpecificSettings.propTypes = {
    specificSettings: PropTypes.object,
    changeSpecificSettings: PropTypes.func,
    disabled: PropTypes.bool,
}

export default ProgramSpecificSettings
