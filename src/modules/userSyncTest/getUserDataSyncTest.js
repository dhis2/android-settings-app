import React from 'react'
import { useOrganisationUnitCapture } from '../query/useOrganisationUnit'
import fetchAttributes from '../../utils/fetchAttributes'

const getUserDataSyncTest = (userSelected, baseUrl) => {
    const organisationUnits = userSelected.organisationUnits
    const organisationUnitSearch = userSelected.teiSearchOrganisationUnits

    const organisationUnitList = []
    const organisationUnitSearchList = []
    const promisesOrganisationUnitsSearch = []
    const organisationUnitSearchCollection = []
    const promisesOrganisationUnits = []

    organisationUnits.forEach(orgUnit => {
        organisationUnitList.push(orgUnit.id)
    })

    organisationUnitSearch.forEach((value, key) => {
        organisationUnitSearchList.push(key)
    })

    console.log({
        organisationUnits,
        organisationUnitSearch,
        organisationUnitList,
        organisationUnitSearchList,
    })
    if (organisationUnitSearchList.length > 0) {
        organisationUnitSearchList.forEach(orgUnitSearch => {
            /*promisesOrganisationUnitsSearch.push(
                this.props.d2.models.organisationUnits.list({
                    paging: false,
                    filter: `path:like:${orgUnitSearch}`,
                })
            )*/
            console.log({ orgUnitSearch })

            const orgUnitSearchRequest = {
                attribute: 'organisationUnits',
                url: `${baseUrl}/api/organisationUnits`,
                field: '',
                filter: `path:like:${orgUnitSearch}`,
            }

            promisesOrganisationUnits.push(
                fetchAttributes(orgUnitSearchRequest)
            )
        })

        /*await Promise.all(promisesOrganisationUnitsSearch).then(data => {
            if (data.length > 0) {
                data.forEach(orgUnitData => {
                    orgUnitData.toArray().forEach(ouSearch => {
                        organisationUnitSearchCollection.push(ouSearch)
                    })
                })
                this.organisationUnitSearchNumber =
                    organisationUnitSearchCollection.length
            }
        })*/
    }

    if (organisationUnitList.length > 0) {
        organisationUnitList.forEach(orgUnit => {
            const orgUnitCapture = {
                attribute: 'organisationUnits',
                url: `${baseUrl}/api/organisationUnits`,
                field:
                    'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,parent[id],programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]],dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
                filter: `path:like:${orgUnit}`,
            }

            promisesOrganisationUnits.push(fetchAttributes(orgUnitCapture))
        })

        Promise.all(promisesOrganisationUnits).then(result => {
            console.log({ result })
            if (result.length > 0) {
                result.forEach(orgUnitData => {
                    console.log({ orgUnitData })
                })
            }
        })
    }
}

export default getUserDataSyncTest
