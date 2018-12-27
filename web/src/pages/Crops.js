import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {farms} from '../firebase';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Fab from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress'
// @material-ui/icons
import Warning from '@material-ui/icons/Warning'
import DateRange from '@material-ui/icons/DateRange'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AddIcon from '@material-ui/icons/Add'

// core components
import GridItem from '../components/Grid/GridItem.jsx'
import GridContainer from '../components/Grid/GridContainer.jsx'
import Danger from '../components/Typography/Danger.jsx'
import Card from '../components/Card/Card.jsx'
import CardHeader from '../components/Card/CardHeader.jsx'

//import CardIcon from "../components/Card/CardIcon.jsx";
import CardBody from '../components/Card/CardBody.jsx'
import CardFooter from '../components/Card/CardFooter.jsx'
import Button from '../components/CustomButtons/Button.jsx'

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: '16px',
    height: '16px'
  },
  stats: {
    color: '#999999',
    display: 'inline-flex',
    fontSize: '12px',
    lineHeight: '22px',
    '& svg': {
      top: '4px',
      width: '16px',
      height: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      top: '4px',
      fontSize: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px'
    }
  },
  cardCategory: {
    color: '#999999',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0'
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitle: {
    color: '#3C4858',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
})

const crops = [
  {
    id: 1,
    active: true,
    crop: 'Cultivo 1',
    initial_date: '01/01/10',
    production_est: '950',
    production: '800',
    area: '5'
  },
  {
    id: 2,
    active: true,
    crop: 'Cultivo 2',
    initial_date: '01/01/10',
    production_est: '950',
    production: '800',
    area: '5'
  },
  {
    id: 3,
    active: false,
    crop: 'Cultivo 3',
    initial_date: '01/01/10',
    production_est: '950',
    production: '800',
    area: '5'
  }
]

class Crops extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer>
          {crops.map((s, key) => {
            return (
              <GridItem xs={12} sm={6} md={3} key={key}>
                <Card key={key}>
                  <CardHeader
                    color={s.active ? 'success' : 'warning'}
                    stats
                    icon
                  >
                    <p className={classes.cardCategory}>
                      {s.active ? 'Activo' : 'No activo'}
                    </p>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{s.crop}</h4>
                    <p className={classes.cardCategory}>
                      Producción:{' '}
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} />{' '}
                        {s.production}
                      </span>
                    </p>
                    <p className={classes.cardCategory}>
                      Fecha inicial:{' '}
                      <span className={classes.successText}>
                        <DateRange /> {s.initial_date}
                      </span>
                    </p>
                  </CardBody>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <NavLink
                        to={'/crop/' + s.id}
                        activeClassName="active"
                        key={key}
                      >
                        {' '}
                        <Button color="primary" round>
                          Editar
                        </Button>
                      </NavLink>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            )
          })}
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </GridContainer>
      </div>
    )
  }
}

Crops.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Crops)
