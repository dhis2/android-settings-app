import React, { createRef, useEffect, useState } from 'react'
import { Popover, FlyoutMenu } from '@dhis2/ui'
import { useDataEngine } from '@dhis2/app-runtime'
import ItemSearchField from './ItemSearchField'
import ContentMenuItem from './ContentMenuItem'
import { getUserQuery } from '../userSyncQueries'
import useDebounce from '../../../../utils/useDebounce'
import classes from './styles/ItemSelector.module.css'

const ItemSelector = ({ selection }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(null)
    const [maxOptions, setMaxOptions] = useState(new Set())
    const [disableField, setDisable] = useState(false)
    const dataEngine = useDataEngine()
    const debouncedFilterText = useDebounce(filter, 350)

    useEffect(() => {
        const query = getUserQuery(debouncedFilterText, Array.from(maxOptions))

        dataEngine.query({ items: query }).then(res => {
            setItems(res.items.users)
        })
    }, [debouncedFilterText, maxOptions])

    const closeMenu = () => {
        setIsOpen(false)
        setFilter('')
        selection('')
        setMaxOptions(new Set())
    }

    const openMenu = () => setIsOpen(true)

    const addItem = item => () => {
        setDisable(true)
        closeMenu()
        setFilter(item.name)
        selection(item.id)
    }

    const clearField = () => {
        closeMenu()
        setDisable(false)
    }

    const getMenus = () => {
        const displayItems = items.slice(0, 5)
        return displayItems.map(item => (
            <ContentMenuItem
                key={item.id || item.key}
                name={item.displayName || item.name}
                onInsert={addItem(item)}
                type={item.type}
                valid={item.valid}
            />
        ))
    }

    const getItems = () => getMenus()

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
                    disabled={disableField}
                />
            </span>
            {isOpen && (
                <Popover
                    reference={inputRef}
                    placement="bottom-start"
                    onClickOutside={closeMenu}
                    arrow={false}
                    maxWidth={400}
                >
                    <div className={classes.popover}>
                        <FlyoutMenu
                            className={classes.menu}
                            dataTest="item-menu"
                            maxWidth="400px"
                        >
                            {getItems()}
                        </FlyoutMenu>
                    </div>
                </Popover>
            )}
        </>
    )
}

export default ItemSelector
