import React, { createRef, useEffect, useState } from 'react'
import { Popover, FlyoutMenu } from '@dhis2/ui'
import { useDataEngine } from '@dhis2/app-runtime'
import ItemSearchField from './ItemSearchField'
import ContentMenuGroup from './ContentMenuGroup'
import { getUserQuery } from './userQuery'
import useDebounce from '../../../utils/useDebounce'
import styles from './styles/ItemSelector.module.css'

const ItemSelector = ({ selection }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(null)
    const [disableField, setDisable] = useState(false)
    const dataEngine = useDataEngine()
    const debouncedFilterText = useDebounce(filter, 350)

    useEffect(() => {
        const query = getUserQuery(debouncedFilterText)
        dataEngine.query({ items: query }).then(res => {
            setItems(res.items.users)
        })
    }, [debouncedFilterText])

    const closeMenu = () => {
        setIsOpen(false)
        setFilter('')
        selection('')
    }

    const openMenu = () => setIsOpen(true)

    const addItem = item => () => {
        setDisable(true)
        closeMenu()
        setFilter(item.name)
        selection(item)
    }

    const clearField = () => {
        closeMenu()
        setDisable(false)
    }

    const getMenus = () => {
        const displayItems = items.slice(0, 5)
        return <ContentMenuGroup items={displayItems} addItem={addItem} />
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
                    disabled={disableField}
                />
            </span>
            {isOpen && (
                <Popover
                    reference={inputRef}
                    placement="bottom-start"
                    onClickOutside={closeMenu}
                    arrow={false}
                    maxWidth={300}
                >
                    <div className={styles.popover}>
                        <FlyoutMenu
                            className={styles.menu}
                            dataTest="item-menu"
                            maxWidth="300px"
                            maxHeight="120px"
                        >
                            {getMenus()}
                        </FlyoutMenu>
                    </div>
                </Popover>
            )}
        </>
    )
}

export default ItemSelector
