import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import { Popover, FlyoutMenu } from '@dhis2/ui'
import { useDataEngine } from '@dhis2/app-runtime'
import { ContentMenuGroup } from './ContentMenuGroup'
import { ItemSearchField } from './ItemSearchField'
import { getVisualizationsQuery } from './visualizationQuery'
import { validateAndroidVisualization } from './helper'
import useDebounce from '../../../utils/useDebounce'
import styles from './styles/ItemSelector.module.css'

export const ItemSelector = ({ setSelection, clearSelection }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(null)
    const [maxOptions, setMaxOptions] = useState(false)
    const [disableFields, setDisable] = useState(false)
    const dataEngine = useDataEngine()
    const debouncedFilterText = useDebounce(filter, 350)

    useEffect(() => {
        const text =
            debouncedFilterText.length >= 3 ? debouncedFilterText : null
        const query = getVisualizationsQuery(text)

        dataEngine.query({ items: query }).then(res => {
            validateAndroidVisualization(res.items.visualizations)
            const validItem = res.items.visualizations.filter(
                item => item.valid === true
            )
            setItems(validItem)
        })
    }, [debouncedFilterText])

    const closeMenu = () => {
        setIsOpen(false)
        setFilter('')
        clearSelection()
        setMaxOptions(false)
    }

    const openMenu = () => setIsOpen(true)

    const addItem = item => () => {
        setDisable(true)
        closeMenu()
        setFilter(item.name || item.displayName)
        setSelection(item)
    }

    const clearField = () => {
        closeMenu()
        setDisable(false)
    }

    const getMenus = () => {
        const hasMore = items.length > 5
        const displayItems = maxOptions ? items : items.slice(0, 5)

        return (
            <ContentMenuGroup
                items={displayItems}
                hasMore={hasMore}
                onChangeItemsLimit={setMaxOptions}
                addItem={addItem}
            />
        )
    }

    const updateFilter = ({ value }) => setFilter(value)

    const inputRef = createRef()

    return (
        <>
            <span ref={inputRef}>
                <ItemSearchField
                    value={filter}
                    onChange={updateFilter}
                    onFocus={openMenu}
                    onClear={clearField}
                    disabled={disableFields}
                />
            </span>
            {isOpen && (
                <Popover
                    reference={inputRef}
                    placement="bottom-start"
                    onClickOutside={closeMenu}
                    arrow={false}
                    maxWidth={700}
                >
                    <div className={styles.popover}>
                        <FlyoutMenu
                            className={styles.menu}
                            dataTest="item-menu"
                            maxWidth="700px"
                            maxHeight="250px"
                        >
                            {getMenus()}
                        </FlyoutMenu>
                    </div>
                </Popover>
            )}
        </>
    )
}

ItemSelector.propTypes = {
    setSelection: PropTypes.func,
    clearSelection: PropTypes.func,
}
