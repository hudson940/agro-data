import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, NavLink} from 'react-router-dom';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";


// core components
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import Danger from "../components/Typography/Danger.jsx";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardIcon from "../components/Card/CardIcon.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import Button from '../components/CustomButtons/Button.jsx'

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Crop from '../components/Crop/Crop.js';

const crops = [
  { id: 1,
    active: true,
    crop: 'Cultivo 1',
    initial_date: '01/01/10',
    production_est: '950',
    production: '800',
    area: '5'
  },
  { id: 2,
    active: true,
    crop: 'Cultivo 2',
    initial_date: '01/01/10',
    production_est: '950',
    production: '800',
    area: '5'
  },
  { id: 3,
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
        {
      crops.map((s, key )=> {
        return (

          <GridItem xs={12} sm={6} md={3} key={key}>
            <Card key={key}>
              <CardHeader color={s.active?'success':'warning'} stats icon>
                <p className={classes.cardCategory}>{s.active?'Activo':'No activo'}</p>
                
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>{s.crop}</h4>
                <p className={classes.cardCategory}>
                Producción: {" "}
                  <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> {s.production} 
                  </span>
                </p>
                <p className={classes.cardCategory}>
                Fecha inicial: {" "}
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
            to={'/crop/'+s.id}
            
            activeClassName="active"
            key={key}
          > <Button color="primary" round>Editar</Button></NavLink>
                
                </div>
              </CardFooter>
            </Card>
          </GridItem>
     
        )
      })
    }
        </GridContainer>

      </div>
    )
  }
}

Crops.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(dashboardStyle)(Crops);