import { Tooltip } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export const HelpText = ({ helpText, warning, type, version }) => {
    if (!warning) {
        return helpText
    }

    return (
        <>
            <span>
                {helpText}
                <Tooltip placement="right" content={warning}>
                    <span
                        className={cx('prefix', {
                            prefixInfo: type === 'info',
                        })}
                    >
                        {version}
                    </span>
                </Tooltip>
            </span>

            <style>{`
                .prefix {
                font - family: monospace;
                font-size: 13px;
                color: var(--colors-grey800);
                background: var(--colors-grey300);
                padding: 2px var(--spacers-dp4);
                margin-right: var(--spacers-dp4);
                margin-left: var(--spacers-dp8);
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
    version: PropTypes.string,
}
