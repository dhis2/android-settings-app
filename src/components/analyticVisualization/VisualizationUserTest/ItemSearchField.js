import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { InputField, Button } from '@dhis2/ui'
import styles from './styles/ItemSearchField.module.css'

const ItemSearchField = ({ value, disabled, onFocus, onChange, onClear }) => (
    <div>
        <InputField
            dense
            name="User item search"
            placeholder={i18n.t('Search by user')}
            type="text"
            onChange={onChange}
            onFocus={onFocus}
            value={value}
            disabled={disabled}
            dataTest="item-search"
            inputWidth="300px"
            className={styles.field}
        />

        <Button small className={styles.field} onClick={onClear}>
            {i18n.t('Clear')}
        </Button>
    </div>
)

ItemSearchField.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
}

export default ItemSearchField
