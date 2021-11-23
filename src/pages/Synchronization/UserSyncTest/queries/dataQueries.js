const trackedEntityInstancesQuery = ({ ou, program, pageSize = 500 }) => ({
    resource: 'trackedEntityInstances',
    params: {
        ou,
        ouMode: 'DESCENDANTS',
        program,
        fields:
            'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,geometry,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,completedDate,followup,status,deleted,trackedEntityInstance,coordinate,geometry,events[event,enrollment,created,lastUpdated,status,coordinate,geometry,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,assignedUser,notes[note,value,storedBy,storedDate],relationships[relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate],relationships[relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative]]',
        pageSize,
    },
})

export const apiFetchTrackedEntityInstances = async ({
    dataEngine,
    ou,
    program,
    pageSize,
}) => {
    try {
        const teiData = await dataEngine.query({
            tei: trackedEntityInstancesQuery({ ou, program, pageSize }),
        })
        return teiData.tei.trackedEntityInstances
    } catch (error) {
        console.log('Error: ', error)
    }
}

const eventsQuery = ({ ou, program, pageSize = 500 }) => ({
    resource: 'events',
    params: {
        ou,
        ouMode: 'DESCENDANTS',
        program,
        pageSize,
    },
})

export const apiFetchEvents = async ({ dataEngine, ou, program, pageSize }) => {
    try {
        const eventsData = await dataEngine.query({
            event: eventsQuery({ ou, program, pageSize }),
        })
        return eventsData.event.events
    } catch (error) {
        console.log('Error: ', error)
    }
}
