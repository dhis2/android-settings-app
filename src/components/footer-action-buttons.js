import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import buttonStyles from '../styles/Button.module.css'
import { Button, ButtonStrip } from '@dhis2/ui'

const FooterActionButtons = ({
    disableSave,
    disableReset,
    clickReset,
    handleSaveDialog,
}) => {
    return (
        <ButtonStrip className={buttonStyles.container__padding}>
            <Button
                primary
                className={buttonStyles.button_marginLeft}
                onClick={handleSaveDialog.open}
                disabled={disableSave}
            >
                {i18n.t('Save')}
            </Button>
            <Button onClick={clickReset} disabled={disableReset}>
                {i18n.t('Reset all values to default')}
            </Button>
        </ButtonStrip>
    )
}

FooterActionButtons.propTypes = {
    disableSave: PropTypes.bool,
    disableReset: PropTypes.bool,
    clickReset: PropTypes.func,
    handleSaveDialog: PropTypes.object.isRequired,
}

export default FooterActionButtons
