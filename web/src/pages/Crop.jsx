import React from 'react';

import CustomForm from '../components/CustomForm/CustomForm';
//import TestForm from '../components/CustomForm/TestForm';
const struct = [
    {
      type: 'checkbox',
      labelText: 'Activo',
      id: 'active',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: true
      }
    },
    {
      type: 'text',
      labelText: 'Cultivo',
      id: 'crop',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'select',
      labelText: 'Tipo',
      id: 'type',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false,
        name: 'type',
        id: 'type'
      },
      options: [{value: 'Permanente', option: 'Permanente'}, {value: 'Transitorio', option: 'Transitorio'}]
    },
    {
      type: 'checkbox',
      labelText: '¿Semilla certificada?',
      id: 'seed_certified',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'date',
      labelText: 'Fecha inicial',
      id: 'initial_date',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'date',
      labelText: 'Fecha finalización',
      id: 'end_date',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Producción Estimada (ton)',
      id: 'production_est',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Producción real (ton)',
      id: 'production',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Área en hectareas',
      id: 'area',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Densidad por hectarea',
      id: 'density_ha',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'inputs',
      labelText: 'Insumos',
      id: 'inputs',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    }
  ]
const values = {
    active: true,
    crop: undefined,
    type: String,
    seed_certified: false,
    initial_date: undefined,
    end_date: undefined,
    production_est: undefined,
    production: undefined,
    area: undefined,
    density_ha: undefined,
    input: undefined,
  }

function Crop ({...props}){
    return (
        <CustomForm
        struct={struct}
        values={values}
        header={{
          title: 'Modificar Cultivo',
          description: 'informacion del cultivo'
        }}
        submitText="Guardar"
        /> 

    )
}

export default Crop;