const admin = require('firebase-admin');
var serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const farm_form =  [
    {
      type: 'text',
      labelText: 'Ubicación (Desabilitado)',
      id: 'location',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: true
      }
    },
    {
      type: 'select',
      labelText: 'Departamento',
      id: 'state',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      },
      options: [{value: 50, option: 'Meta'}]
    },
    {
      type: 'text',
      labelText: 'Ciudad',
      id: 'city',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'text',
      labelText: 'Nombre Propietario',
      id: 'owner_name',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'text',
      labelText: 'Telefono',
      id: 'phone',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Área Total',
      id: 'area',
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        disabled: false,
        step: 0.1,
      }
    }
  ];

const crop_form = [
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
        fullWidth: false
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'text',
      labelText: 'Nombre de la semilla',
      id: 'seed_name',
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
        disabled: false,
      },
      labelProps: {
        shrink: true,
      },
    },
    {
      type: 'date',
      labelText: 'Fecha finalización',
      id: 'end_date',
      formControlProps: {
        fullWidth: true,
      },
      labelProps: {
        shrink: true,
      },
      inputProps: {
        disabled: false,
      }
    },
    {
      type: 'number',
      labelText: 'Producción Estimada',
      endAdornment: 'Toneladas',
      id: 'production_est',
      formControlProps: {
        fullWidth: false
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Producción real',
      endAdornment: 'Toneladas',
      id: 'production',
      formControlProps: {
        fullWidth: false
      },
      inputProps: {
        disabled: false
      }
    },
    {
      type: 'number',
      labelText: 'Área sembrada',
      endAdornment: 'Hectareas',
      id: 'area',
      formControlProps: {
        fullWidth: false
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
        fullWidth: false
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

const db = admin.firestore();
/* farm_form.map((s) => {
    db.collection('config').doc('forms').collection('farm_form').doc(s.id).set(s)

}) */

crop_form.map((s) => {
    db.collection('config').doc('forms').collection('crop_form').doc(s.id).set(s)

})
