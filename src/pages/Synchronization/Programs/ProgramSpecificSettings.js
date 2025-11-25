import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/page/PageHeader'
import { filterUnusedElements } from '../../../utils/utils'
import { prepareSpecificSettingsList } from './helper'
import NewProgramSpecific from './NewProgramSpecific'
import { useProgramFilters } from './ProgramQueries'
import SpecificTableAction from './SpecificTableAction'

const ProgramSpecificSettings = ({
    specificSettings,
    changeSpecificSettings,
    disabled,
}) => {
    const { programFilterList, loaded } = useProgramFilters()
    const [programList, setProgramList] = useState([])
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [listName, setListName] = useState()
    const [loadSpecific, setLoad] = useState(false)

    /**
     * This effect initializes and synchronizes the local state when both
     * specificSettings (the saved configuration) and the program filters list are available.
     * It depends on specificSettings, loaded, and programFilterList
     * because any change in these values means we need to rebuild the
     * initial rows and related state values.
     * */

    useEffect(() => {
        if (specificSettings && loaded) {
            const rowList = prepareSpecificSettingsList(
                specificSettings,
                programFilterList
            )
            setProgramList(programFilterList)
            setInitialRows(rowList)
            setRows(rowList)
            setListName(filterUnusedElements(programFilterList, rowList))
            setLoad(true)
        }
    }, [specificSettings, programFilterList, loaded])

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
