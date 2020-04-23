export const prepareMetadataRequest = data => {
    let dataSetList = [],
        programsList = [],
        programsValuesList = [],
        trackedEntityTypeListId = [],
        optionSetListId = [],
        dataSetValuesList = [],
        dataElementListId = [],
        indicatorListId = [],
        indicatorTypeListId = [],
        categoryComboListId = [],
        categoryListId = []
    const organisationUnitCapture = []
    const organisationUnitIDList = []
    const indicatorValuesList = []

    data.forEach(orgUnitData => {
        orgUnitData.toArray().forEach(ouCapture => {
            organisationUnitCapture.push(ouCapture)
            organisationUnitIDList.push(ouCapture.id)
            if (ouCapture.programs.valuesContainerMap.size > 0) {
                ouCapture.programs.valuesContainerMap.forEach((value, key) => {
                    if (programsList.length >= 1) {
                        programsList = programsList.filter(
                            program => program !== key
                        )
                        programsList.push(key)
                        programsValuesList = programsValuesList.filter(
                            program => program.id !== key
                        )
                        programsValuesList.push(value)
                    } else {
                        programsList.push(key)
                        programsValuesList.push(value)
                    }
                })
            }

            if (ouCapture.dataSets.valuesContainerMap.size > 0) {
                ouCapture.dataSets.valuesContainerMap.forEach((value, key) => {
                    if (dataSetList.length >= 1) {
                        dataSetList = dataSetList.filter(
                            dataset => dataset !== key
                        )
                        dataSetList.push(key)
                        dataSetValuesList = dataSetValuesList.filter(
                            dataset => dataset.id !== key
                        )
                        dataSetValuesList.push(value)
                    } else {
                        dataSetList.push(key)
                        dataSetValuesList.push(value)
                    }
                })
            }
            if (dataSetValuesList.length > 0) {
                dataSetValuesList.forEach(value => {
                    const dataSetElement = value.dataSetElements
                    if (
                        dataSetElement !== undefined &&
                        dataSetElement.length > 0
                    ) {
                        dataSetElement.forEach(value => {
                            if (Object.keys(value.dataElement).length !== 0) {
                                if (dataElementListId.length >= 1) {
                                    dataElementListId = dataElementListId.filter(
                                        dataElement =>
                                            dataElement !== value.dataElement.id
                                    )
                                    dataElementListId.push(value.dataElement.id)
                                } else {
                                    dataElementListId.push(value.dataElement.id)
                                }
                            }
                        })
                    }
                    const indicators = value.indicators.valuesContainerMap
                    if (indicators.size > 0) {
                        value.indicators.valuesContainerMap.forEach(
                            (value, key) => {
                                if (indicatorListId.length >= 1) {
                                    indicatorListId = indicatorListId.filter(
                                        indicator => indicator !== key
                                    )
                                    indicatorListId.push(key)
                                    indicatorValuesList.push(value)
                                } else {
                                    indicatorListId.push(key)
                                    indicatorValuesList.push(value)
                                }
                            }
                        )
                    }
                    const categoryCombos = value.categoryCombo
                    if (categoryCombos !== undefined) {
                        if (categoryComboListId.length >= 1) {
                            categoryComboListId = categoryComboListId.filter(
                                categoryCombo =>
                                    categoryCombo !== categoryCombos.id
                            )
                            categoryComboListId.push(categoryCombos.id)
                        } else {
                            categoryComboListId.push(categoryCombos.id)
                        }

                        if (value.categoryCombo.categories.length > 0) {
                            value.categoryCombo.categories.forEach(
                                categoryValue => {
                                    if (categoryListId.length >= 1) {
                                        categoryListId = categoryListId.filter(
                                            category =>
                                                category !== categoryValue.id
                                        )
                                        categoryListId.push(categoryValue.id)
                                    } else {
                                        categoryListId.push(categoryValue.id)
                                    }
                                }
                            )
                        }

                        if (indicatorValuesList.length > 0) {
                            indicatorValuesList.forEach(value => {
                                if (
                                    Object.keys(value.indicatorType).length !==
                                    0
                                ) {
                                    if (indicatorTypeListId.length >= 1) {
                                        indicatorTypeListId = indicatorTypeListId.filter(
                                            indicatorT =>
                                                indicatorT !==
                                                value.indicatorType.id
                                        )
                                        indicatorTypeListId.push(
                                            value.indicatorType.id
                                        )
                                    } else {
                                        indicatorTypeListId.push(
                                            value.indicatorType.id
                                        )
                                    }
                                }
                            })
                        }
                    }
                })
            }
            if (programsValuesList.length > 0) {
                programsValuesList.forEach((value, key) => {
                    const trackedEntityT = value.trackedEntityType
                    if (trackedEntityT !== undefined) {
                        if (trackedEntityTypeListId.length >= 1) {
                            trackedEntityTypeListId = trackedEntityTypeListId.filter(
                                trackedEntity =>
                                    trackedEntity !== trackedEntityT.id
                            )
                            trackedEntityTypeListId.push(trackedEntityT.id)
                        } else {
                            trackedEntityTypeListId.push(trackedEntityT.id)
                        }
                    }

                    const programTEA = value.programTrackedEntityAttributes
                    if (programTEA !== undefined && programTEA.length > 0) {
                        programTEA.forEach(value => {
                            if (
                                Object.keys(value.trackedEntityAttribute)
                                    .length !== 0
                            ) {
                                if (optionSetListId.length >= 1) {
                                    optionSetListId = optionSetListId.filter(
                                        optionSet =>
                                            optionSet !==
                                            value.trackedEntityAttribute
                                                .optionSet.id
                                    )
                                    optionSetListId.push(
                                        value.trackedEntityAttribute.optionSet
                                            .id
                                    )
                                } else {
                                    optionSetListId.push(
                                        value.trackedEntityAttribute.optionSet
                                            .id
                                    )
                                }
                            }
                        })
                    }
                })
            }
        })
    })

    return {
        datasetIdList: dataSetList,
        programIdList: programsList,
        programDataList: programsValuesList,
        trackedEntityTypeIdList: trackedEntityTypeListId,
        optionSetIdList: optionSetListId,
        datasetDataList: dataSetValuesList,
        dataElementIdList: dataElementListId,
        indicatorIdList: indicatorListId,
        indicatorTypeIdList: indicatorTypeListId,
        categoryComboIdList: categoryComboListId,
        categoryIdList: categoryListId,
        orgUnitCaptureDataList: organisationUnitCapture,
        orgUnitCaptureIdList: organisationUnitIDList,
        indicatorDataList: indicatorValuesList,
    }
}
