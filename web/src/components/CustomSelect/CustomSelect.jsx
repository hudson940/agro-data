import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
// @material-ui/icons
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
// core components
import customSelectStyle from '../../assets/jss/material-dashboard-react/components/customSelectStyle.jsx'

function CustomSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    options,
    value
  } = props

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error
  })
  
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  })
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + ' ' + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        classes={{
        root: marginTop,
        disabled: classes.disabled,
      }}
      id={id}
      value={value}
        {...inputProps}
      > 
        {options.map((i, key) => (
          <MenuItem value={i.value} key = {key}>
            {i.option}
          </MenuItem>
        ))}
      </Select>
     
      {error ? (
        <Clear className={classes.feedback + ' ' + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  options: PropTypes.array,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
}

export default withStyles(customSelectStyle)(CustomSelect)
