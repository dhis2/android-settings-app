import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import NewDatasetSpecific from './NewDatasetSpecific'
import SpecificTableAction from './SpecificTableAction'
import PageHeader from '../../../components/page/PageHeader'
import { useReadDataset } from './datasetQueries'
import { filterUnusedElements, prepareSpecificSettingsList } from './helper'

const DatasetSpecificSettings = () => {
    const { datasetList } = useReadDataset()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [listName, setListName] = useState()
    const [specificSettings, setSpecificSettings] = useState({})

    useEffect(() => {
        if (datasetList && specificSettings) {
            const rowList = prepareSpecificSettingsList(
                specificSettings,
                datasetList
            )
            setRows(rowList)
            setInitialRows(rowList)
            setListName(filterUnusedElements(datasetList, rowList))
        }
    }, [specificSettings, datasetList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            setSpecificSettings(keyBy(rows, 'id'))
        }
    }, [rows])

    return (
        <>
            <PageHeader
                title={i18n.t('Data sets specific download sync settings')}
                desc={i18n.t(
                    'Applies only to the assigned data set. Data set specific settings will overwrite the global settings above.'
                )}
            />

            {rows && (
                <SpecificTableAction
                    rows={rows}
                    specificSettingList={specificSettings}
                    changeRows={setRows}
                    datasetList={datasetList}
                />
            )}

            <NewDatasetSpecific
                datasetList={listName}
                rows={rows}
                handleRows={setRows}
            />
        </>
    )
}

export default DatasetSpecificSettings
