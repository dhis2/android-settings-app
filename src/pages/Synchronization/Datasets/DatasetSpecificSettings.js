import i18n from '@dhis2/d2-i18n'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/page/PageHeader'
import { filterUnusedElements } from '../../../utils/utils'
import { useReadDataset } from './datasetQueries'
import { prepareSpecificSettingsList } from './helper'
import NewDatasetSpecific from './NewDatasetSpecific'
import SpecificTableAction from './SpecificTableAction'

const DatasetSpecificSettings = ({
    specificSettings,
    handleSpecificSettings,
    disabled,
}) => {
    const { datasetList } = useReadDataset()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [listName, setListName] = useState()
    const [loadSpecific, setLoad] = useState(false)

    useEffect(() => {
        if (datasetList && specificSettings) {
            const rowList = prepareSpecificSettingsList(
                specificSettings,
                datasetList
            )
            setRows(rowList)
            setInitialRows(rowList)
            setListName(filterUnusedElements(datasetList, rowList))
            setLoad(true)
        }
    }, [specificSettings, datasetList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleSpecificSettings(keyBy(rows, 'id'))
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
            {loadSpecific && (
                <>
                    {rows && (
                        <SpecificTableAction
                            rows={rows}
                            changeRows={setRows}
                            datasetList={datasetList}
                            disableAll={disabled}
                        />
                    )}

                    <NewDatasetSpecific
                        datasetList={listName}
                        rows={rows}
                        handleRows={setRows}
                        disabled={disabled}
                    />
                </>
            )}
        </>
    )
}

DatasetSpecificSettings.propTypes = {
    specificSettings: PropTypes.object,
    handleSpecificSettings: PropTypes.func,
    disabled: PropTypes.bool,
}

export default DatasetSpecificSettings
