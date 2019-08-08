import React from 'react'
import Downshift from 'downshift'
import deburr from 'lodash/deburr'

import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

const classes = {
    root: {
        flexGrow: 1,
        height: 60,
        marginTop: '25px',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
}

export default class TextFieldSearch extends React.Component {
    constructor(props) {
        super(props)
        this.suggestions = this.props.suggestions
    }

    state = {
        suggestionSelected: undefined,
    }

    handleChangeSelect = selection => {
        this.props.checkUsername(selection)
        this.setState({
            suggestionSelected: selection,
        })
    }

    renderInput = inputProps => {
        const { InputProps, style, ref, ...other } = inputProps

        return (
            <TextField
                InputProps={{
                    inputRef: ref,
                    style: {
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    },
                    ...InputProps,
                }}
                {...other}
            />
        )
    }

    renderSuggestion = suggestionProps => {
        const {
            suggestion,
            index,
            itemProps,
            highlightedIndex,
            selectedItem,
        } = suggestionProps
        const isHighlighted = highlightedIndex === index
        const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.id}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {suggestion.name}
            </MenuItem>
        )
    }

    getSuggestions = (value, { showEmpty = false } = {}) => {
        const inputValue = deburr(value.trim()).toLowerCase()
        const inputLength = inputValue.length
        let count = 0

        return inputLength === 0 && !showEmpty
            ? []
            : this.suggestions.filter(suggestion => {
                  const keep =
                      count < 5 &&
                      suggestion.name.slice(0, inputLength).toLowerCase() ===
                          inputValue

                  if (keep) {
                      count += 1
                  }

                  return keep
              })
    }

    render() {
        return (
            <div style={classes.root}>
                <Downshift
                    id="downshift-simple"
                    onChange={this.handleChangeSelect}
                    itemToString={item => (item ? item : '')}
                    initialInputValue={this.props.suggestionPreSelected}
                >
                    {({
                        clearSelection,
                        getInputProps,
                        getItemProps,
                        getLabelProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen,
                        selectedItem,
                    }) => {
                        const {
                            onBlur,
                            onFocus,
                            onChange,
                            ...inputProps
                        } = getInputProps({
                            placeholder: 'Search for a user',
                            onChange: event => {
                                this.props.clearFields()
                                if (event.target.value === '') {
                                    clearSelection()
                                }
                            },
                        })

                        return (
                            <div style={classes.container}>
                                {this.renderInput({
                                    fullWidth: true,
                                    label: 'User',
                                    InputLabelProps: getLabelProps({
                                        shrink: true,
                                    }),
                                    InputProps: { onBlur, onFocus, onChange },
                                    inputProps,
                                })}

                                <div {...getMenuProps()}>
                                    {isOpen ? (
                                        <Paper style={classes.paper} square>
                                            {this.getSuggestions(inputValue, {
                                                showEmpty: true,
                                            }).map((suggestion, index) =>
                                                this.renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({
                                                        item: suggestion.name,
                                                    }),
                                                    highlightedIndex,
                                                    selectedItem,
                                                })
                                            )}
                                        </Paper>
                                    ) : null}
                                </div>
                            </div>
                        )
                    }}
                </Downshift>
            </div>
        )
    }
}
