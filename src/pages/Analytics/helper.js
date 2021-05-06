export const WHO_NUTRITION = 'WHO_NUTRITION'

export const createInitialValues = initialValues => ({
    uid: initialValues.uid || '',
    program: initialValues.program || '',
    programStage: initialValues.programStage || '',
    name: initialValues.name || '',
    shortName: initialValues.shortName || '',
    type: initialValues.type || '',
    period: initialValues.period || '',
    data: initialValues.data || '',
    element: initialValues.element || '',
    elementValue: initialValues.elementValue || '',
    chartType: initialValues.chartType || '',
    attribute: initialValues.attribute || '',
    female: initialValues.female || '',
    male: initialValues.male || '',
    elementX: initialValues.elementX || '',
    elementValueX: initialValues.elementValueX || '',
    elementY: initialValues.elementValueY || '',
    elementValueY: initialValues.elementValueY || '',
})

export const updateList = (newEntry, list) => {
    const updatedList = list.filter(element => element.uid !== newEntry.uid)
    updatedList.push(newEntry)
    return updatedList
}

export const removeSettingsFromList = (setting, settingList) => {
    return settingList.filter(program => program.uid !== setting.uid)
}

const createWHOValues = values => ({
    x: {
        [values.elementX]: `${values.programStage}.${values.elementValueX}`,
    },
    y: {
        [values.elementY]: `${values.programStage}.${values.elementValueY}`,
    },
    gender: {
        values: {
            male: values.male,
            female: values.female,
        },
        attribute: values.attribute,
    },
    chartType: values.chartType,
})

const createVisualizationValues = values => ({
    data: {
        [values.element]: [
            values.element === 'attributes'
                ? `${values.elementValue}`
                : `${values.programStage}.${values.elementValue}`,
        ],
    },
    period: values.period || 'None',
})

export const createTEIValues = (values, id) => {
    let teiValues = {
        name: values.name,
        shortName: values.shortName,
        program: values.program,
        programStage: values.programStage,
        type: values.type,
        uid: id,
    }

    values.type !== WHO_NUTRITION
        ? (teiValues = {
              ...teiValues,
              ...createVisualizationValues(values),
          })
        : (teiValues.WHONutrition = createWHOValues(values))

    return teiValues
}

const VALID_VALUE_TYPE = [
    'NUMBER',
    'INTEGER',
    'INTEGER_ZERO_OR_POSITIVE',
    'INTEGER_POSITIVE',
]

export const updateDataElementsList = (programId, refetch, updateList) => {
    if (programId)
        refetch({ programId }).then(result => {
            const dataElements =
                result.programStages.programStageDataElements || []
            const options = []

            dataElements.map(dataElement => {
                if (
                    VALID_VALUE_TYPE.includes(dataElement.dataElement.valueType)
                ) {
                    options.push({
                        label: dataElement.dataElement.name,
                        id: dataElement.dataElement.id,
                        valueType: dataElement.dataElement.valueType,
                    })
                }
            })
            updateList(options)
        })
}

export const updateAttributesList = ({
    programId,
    refetch,
    updateList,
    isWHO,
}) => {
    if (programId)
        refetch({ programId }).then(result => {
            const attributes =
                result.programs.programTrackedEntityAttributes || []
            const options = []

            attributes.map(attribute => {
                if (isWHO) {
                    options.push({
                        label: attribute.trackedEntityAttribute.name,
                        id: attribute.trackedEntityAttribute.id,
                        valueType: attribute.trackedEntityAttribute.valueType,
                    })
                } else if (
                    VALID_VALUE_TYPE.includes(
                        attribute.trackedEntityAttribute.valueType
                    )
                ) {
                    options.push({
                        label: attribute.trackedEntityAttribute.name,
                        id: attribute.trackedEntityAttribute.id,
                        valueType: attribute.trackedEntityAttribute.valueType,
                    })
                }
            })
            updateList(options)
        })
}

export const updateProgramIndicatorsList = (programId, refetch, updateList) => {
    if (programId)
        refetch({ programId }).then(result => {
            const programIndicators = result.programs.programIndicators || []
            const options = programIndicators.map(program => ({
                label: program.name,
                id: program.id,
            }))
            updateList(options)
        })
}
