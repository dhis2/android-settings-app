export const dataSetQuery = {
    paging: false,
    level: 1,
    fields: 'id,name',
    filter: 'access.data.write:eq:true',
}

export const programQuery = {
    paging: false,
    level: 1,
    fields: 'id,name',
    filter: 'access.data.write:eq:true',
}

export const organisationUnitQuery = {}

export const testAndroidQuery = {
    user: {
        order: 'name:asc',
        paging: false,
        level: 1,
        fields: 'id,name,userCredentials,userGroups,organisationUnits',
    },
    organisationUnitsSearch: orgUnitSearch => {
        const query = {
            paging: false,
            filter: `path:like:${orgUnitSearch}`,
        }
        return query
    },
    organisationUnits: orgUnit => {
        const query = {
            paging: false,
            filter: `path:like:${orgUnit}`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,parent[id],programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]],dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
        }
        return query
    },
    dataElement: dataElement => {
        const query = {
            paging: false,
            filter: `id:in:[${dataElement}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]',
        }
        return query
    },
}
