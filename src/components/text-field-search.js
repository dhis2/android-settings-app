import React, { useState } from 'react'
/*import Downshift from 'downshift'
import deburr from 'lodash/deburr'*/
import i18n from '@dhis2/d2-i18n'
/*import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'*/
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'

/*const classes = {
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
}*/

const TextFieldSearch = props => {
    //console.log({props})
    const d2 = props.d2
    const [suggestionSelected, setSelection] = useState(undefined)
    const [suggestionsList, setSuggestionsList] = useState([])

    const handleChangeSelect = selection => {
        if (selection !== null) {
            props.checkUsername(selection.selected)
            setSelection(selection.selected)
        }
        console.log({ selection: selection.selected, props })
    }

    const handleFilter = (event, clearSelection) => {
        console.log({ event, clearSelection })
        /*props.clearFields()
        if (event.target.value === '') {
            clearSelection()
            setSuggestionsList([])
        } else {
            d2.models.users
                .list({
                    paging: false,
                    level: 1,
                    fields: 'id,name',
                    query: `${event.target.value}`,
                })
                .then(users => {
                    const usersOptions = users.toArray()
                    console.log({usersOptions})
                    setSuggestionsList(usersOptions)
                })
        }*/
    }
    return (
        <div>
            <SingleSelectField
                className="select"
                clearable
                label={i18n.t('User')}
                filterable
                inputWidth="250px"
                placeholder={i18n.t('Search for a user')}
                onChange={handleChangeSelect}
                selected={suggestionSelected}
            >
                {props.options.map(user => (
                    <SingleSelectOption
                        key={user.id}
                        label={user.name}
                        value={user.name}
                    />
                ))}
            </SingleSelectField>
        </div>
    )
}

export default TextFieldSearch
/*export default class TextFieldSearch extends React.Component {
    constructor(props) {
        super(props)
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
            this.setState({
                suggestionsList: [],
            })
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
            : this.state.suggestionsList.filter(suggestion => {
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
}*/
