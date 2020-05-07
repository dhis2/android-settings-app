import { global, ORG_UNIT, perOuProgram, program } from './settingType'

const teiFields =
    'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]'

export const getDataPerProgramSettingType = ({
    props,
    settingType,
    orgUnitList,
    programList,
}) => {
    // after checking setting type, get promise data
    const teiPromises = []
    const _tei = (parseInt(settingType.sizeTEI) / 50).toFixed()
    const _event = (parseInt(settingType.sizeEvent) / 50).toFixed()
    const _teiProgram = (parseInt(settingType.sizeTEI) / 25).toFixed()
    const _eventProgram = (parseInt(settingType.sizeEvent) / 25).toFixed()

    switch (settingType.type) {
        case undefined:
            // if it's global or doesn't have specific settings
            // with ou Parents and "DESCENDENT"

            orgUnitList.orgUnitParents.forEach(orgUnit => {
                for (let i = 1; i <= _tei; i++) {
                    teiPromises.push(
                        props.d2.Api.getApi().get('trackedEntityInstances', {
                            page: `${i}`,
                            pageSize: 50,
                            ou: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            fields: teiFields,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        })
                    )
                }

                for (let j = 1; j <= _event; j++) {
                    teiPromises.push(
                        props.d2.Api.getApi().get('events', {
                            page: `${j}`,
                            pageSize: 50,
                            orgUnit: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            includeAllAttributes: true,
                            includeDeleted: true,
                        })
                    )
                }
            })

            break
        case global:
            // if it's global or doesn't have specific settings
            // with ou Parents and "DESCENDENT"

            orgUnitList.orgUnitParents.forEach(orgUnit => {
                for (let i = 1; i <= _tei; i++) {
                    teiPromises.push(
                        props.d2.Api.getApi().get('trackedEntityInstances', {
                            page: `${i}`,
                            pageSize: 50,
                            ou: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            fields: teiFields,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        })
                    )
                }

                for (let j = 1; j <= _event; j++) {
                    teiPromises.push(
                        props.d2.Api.getApi().get('events', {
                            page: `${j}`,
                            pageSize: 50,
                            orgUnit: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            includeAllAttributes: true,
                            includeDeleted: true,
                        })
                    )
                }
            })

            break
        case ORG_UNIT:
            // per ou
            // should put every single ou capture by itself with no ouMode

            orgUnitList.orgUnit.forEach(orgUnit => {
                for (let i = 1; i <= _tei; i++) {
                    teiPromises.push(
                        props.d2.Api.getApi().get('trackedEntityInstances', {
                            page: `${i}`,
                            pageSize: 50,
                            ou: `${orgUnit}`,
                            fields: teiFields,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        })
                    )
                }

                for (let j = 1; j <= _event; j++) {
                    teiPromises.push(
                        props.d2.Api.getApi().get('events', {
                            page: `${j}`,
                            pageSize: 50,
                            orgUnit: `${orgUnit}`,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        })
                    )
                }
            })

            break
        case program:
            // per program
            // I should get programTEI also if OUPrograms have specificSettings
            // should add a for programs

            programList.forEach(program => {
                orgUnitList.orgUnitParents.forEach(orgUnit => {
                    for (let i = 1; i <= _teiProgram; i++) {
                        teiPromises.push(
                            props.d2.Api.getApi().get(
                                'trackedEntityInstances',
                                {
                                    page: `${i}`,
                                    pageSize: 25,
                                    ou: `${orgUnit}`,
                                    ouMode: 'DESCENDANTS',
                                    programs: `${program}`,
                                    fields: teiFields,
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                }
                            )
                        )
                    }

                    for (let j = 1; j <= _eventProgram; j++) {
                        teiPromises.push(
                            props.d2.Api.getApi().get('events', {
                                page: `${j}`,
                                pageSize: 25,
                                orgUnit: `${orgUnit}`,
                                ouMode: 'DESCENDANTS',
                                programs: `${program}`,
                                includeAllAttributes: true,
                                includeDeleted: true,
                            })
                        )
                    }
                })
            })
            break
        case perOuProgram:
            // per program & per ou

            orgUnitList.orgUnit.forEach(orgUnit => {
                programList.forEach(program => {
                    for (let i = 1; i <= _tei; i++) {
                        teiPromises.push(
                            props.d2.Api.getApi().get(
                                'trackedEntityInstances',
                                {
                                    page: `${i}`,
                                    pageSize: 25,
                                    ou: `${orgUnit}`,
                                    programs: `${program}`,
                                    fields: teiFields,
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                }
                            )
                        )
                    }

                    for (let j = 1; j <= _event; j++) {
                        teiPromises.push(
                            props.d2.Api.getApi().get('events', {
                                page: `${j}`,
                                pageSize: 25,
                                orgUnit: `${orgUnit}`,
                                programs: `${program}`,
                                includeAllAttributes: true,
                                includeDeleted: true,
                            })
                        )
                    }
                })
            })

            break
        default:
            break
    }

    return teiPromises
}
