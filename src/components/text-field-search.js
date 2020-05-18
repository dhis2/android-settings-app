import React from 'react'
import Downshift from 'downshift'
import deburr from 'lodash/deburr'
import i18n from '@dhis2/d2-i18n'
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
        this.suggestions = []
        this.d2 = this.props.d2
    }

    state = {
        suggestionSelected: undefined,
        suggestionsList: [],
    }

    handleChangeSelect = selection => {
        if (selection !== null) {
            this.props.checkUsername(selection)
            this.setState({
                suggestionSelected: selection,
            })
        }
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

    handleFilter = (event, clearSelection) => {
        this.props.clearFields()
        if (event.target.value === '') {
            clearSelection()
        } else {
            this.d2.models.users
                .list({
                    paging: false,
                    level: 1,
                    fields: 'id,name',
                    query: `${event.target.value}`,
                })
                .then(users => {
                    const usersOptions = users.toArray()
                    this.suggestions = usersOptions
                    this.setState({
                        suggestionsList: usersOptions,
                    })
                })
        }
    }

    getSuggestions = (value, { showEmpty = false } = {}) => {
        const inputValue = deburr(value.trim()).toLowerCase()
        const inputLength = inputValue.length
        let count = 0

        return inputLength === 0 && !showEmpty
            ? []
            : this.suggestions.filter(suggestion => {
                  const keep = count < 5 && suggestion

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
                            placeholder: i18n.t('Search for a user'),
                            onChange: event => {
                                this.handleFilter(event, clearSelection)
                            },
                        })

                        return (
                            <div style={classes.container}>
                                {this.renderInput({
                                    fullWidth: true,
                                    label: i18n.t('User'),
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
