import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import { NavLink } from "react-router-dom";
// core components
import footerStyle from '../../assets/jss/material-dashboard-react/components/footerStyle.jsx'


function Footer({ ...props }) {
  const { classes, routes } = props

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {routes.map((prop, key) => {
              if (prop.redirect) return null
              else return(
              <ListItem className={classes.inlineBlock} key = {key}>
                  <NavLink
            to={prop.path}
            key={key}
          >{prop.sidebarName}</NavLink>
                </ListItem>)
            })}
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
              Creative Tim    
          </span>
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(footerStyle)(Footer)
