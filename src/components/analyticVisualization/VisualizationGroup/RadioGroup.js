import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import isEmpty from 'lodash/isEmpty'
import reject from 'lodash/reject'
import { FieldGroup } from '@dhis2/ui'
import { NewGroup } from './NewGroup'
import { SelectGroup } from './SelectGroup'

export const RadioGroup = ({
    onChange,
    value,
    groupName,
    changeGroup,
    groups,
    type,
    ...props
}) => {
    const [optionSelection, setOptionSelection] = useState('')
    const [groupOptions, setGroupOptions] = useState()

    useEffect(() => {
        if (value) {
            setOptionSelection({
                [value]: true,
            })
        }
    }, [value])

    useEffect(() => {
        if (groups) {
            const element = Object.keys(groups).find(
                item => item === groupName[type]
            )
            const list = type ? groups[element] : groups
            const updatedList = reject(list, { name: 'default' })
            setGroupOptions(updatedList)
        }
    }, [groups, groupName[type]])

    return (
        <>
            <FieldGroup {...props}>
                <>
                    <NewGroup
                        dense
                        onChange={onChange}
                        name="newGroup"
                        label={i18n.t('Create a new group')}
                        value="newGroup"
                        checked={optionSelection['newGroup']}
                        groupName={groupName}
                        changeGroup={changeGroup}
                    />

                    {!isEmpty(groupOptions) && (
                        <SelectGroup
                            dense
                            onChange={onChange}
                            name="existingGroup"
                            label={i18n.t(
                                'Select a created group visualization'
                            )}
                            value="existingGroup"
                            checked={optionSelection['existingGroup']}
                            groupName={groupName}
                            changeGroup={changeGroup}
                            options={groupOptions}
                            elementType={type}
                        />
                    )}
                </>
            </FieldGroup>
        </>
    )
}

RadioGroup.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    groupName: PropTypes.object,
    changeGroup: PropTypes.func,
    groups: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    type: PropTypes.string,
}
