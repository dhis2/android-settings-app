import PropTypes from 'prop-types'
import React from 'react'
import { TextField } from '../../components/field/TextField'

const ResponseForm = ({ data = {}, onChange }) => {
    return (
        <div style={{ display: 'grid', gap: '8px' }}>
            <TextField
                label="Argument"
                value={data.argument || ''}
                onChange={(e) => onChange('response.data.argument', e.value)}
                required
            />

            <TextField
                label="Path"
                value={data.path || ''}
                onChange={(e) => onChange('response.data.path', e.value)}
                required
            />
        </div>
    )
}

ResponseForm.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
}

export default ResponseForm
