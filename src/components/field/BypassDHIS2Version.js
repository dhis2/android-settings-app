import i18n from '@dhis2/d2-i18n'
import { CheckboxField as UICheckboxField } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import DialogBypass from '../dialog/DialogBypass'
import { FieldSection } from './FieldSection'

const HelpText = ({ helpText, warning, type }) => {
    if (!warning) {
        return helpText
    }

    return (
        <>
            <span>
                {helpText}
                <span
                    className={cx('prefix', {
                        prefixInfo: type === 'info',
                    })}
                >
                    {warning}
                </span>
            </span>

            <style>{`
                .prefix {
                font - family: monospace;
                font-size: 13px;
                color: var(--colors-grey800);
                background: var(--colors-grey300);
                padding: 2px var(--spacers-dp4);
                margin-right: var(--spacers-dp4);
                border-radius: 3px;
            }

                .prefixInfo {
                color: var(--colors-blue800);
                background: var(--colors-blue050);
            }
            `}</style>
        </>
    )
}

HelpText.propTypes = {
    helpText: PropTypes.string,
    warning: PropTypes.string,
    type: PropTypes.string,
}

const CODE = 'bypassDHIS2VersionCheck'

export const defaultBypassDHIS2Version = false

export const BypassDHIS2Version = ({ value, onChange, ...props }) => {
    const [open, setOpen] = useState(false)

    const handleCheckbox = () => {
        setOpen(true)
    }

    const onCloseDialog = () => {
        setOpen(false)
    }

    const handleBypassChange = (checked) => {
        onChange({ ...value, [CODE]: !checked })
        onCloseDialog()
    }

    return (
        <>
            <FieldSection>
                <UICheckboxField
                    label={i18n.t('Skip DHIS2 version validation')}
                    name={CODE}
                    checked={value[CODE]}
                    type="checkbox"
                    onChange={handleCheckbox}
                    helpText={
                        <HelpText
                            helpText={i18n.t(
                                'Bypass the validation process for DHIS2 version compatibility.'
                            )}
                            warning={i18n.t(
                                'Only applicable for users using Android app version 3.0 or later.'
                            )}
                            type="info"
                        />
                    }
                    {...props}
                />
            </FieldSection>

            <DialogBypass
                openDialog={open}
                handleBypass={handleBypassChange}
                onClose={onCloseDialog}
                checked={value[CODE]}
            />
        </>
    )
}

BypassDHIS2Version.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}
