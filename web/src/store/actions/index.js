import { config } from '../../firebase'
import { FETCH_FORM_STRUCT, GET_LOCATION } from './types'

function workWithCachedData(dispatch, document) {
  if (localStorage.hasOwnProperty(document)) {
    console.log('cargando preguntas desde localstorage')
    // get the document's value from localStorage
    let value = localStorage.getItem(document)

    // parse the localStorage string and setState
    try {
      value = JSON.parse(value)
      dispatch({
        type: FETCH_FORM_STRUCT,
        payload: value,
        form: document
      })
    } catch (e) {
      // handle empty string
      console.log('Error', e)
    }
  }
  else {
    console.log("no hay datos en el localstorage")
    let struct = [];
    switch (document) {
      case 'farm_form':
        struct = [
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
        ]        
        break;
      case 'crop_form':
        struct = [
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
            type: 'date',
            labelText: 'Fecha inicial',
            id: 'initial_date',
            formControlProps: {
              fullWidth: true
            },
            inputProps: {
              disabled: false,
              shrink: true,
              defaultvalue:'01-01-2019',
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
      default:
        break;
    }
    localStorage.setItem(document, JSON.stringify(struct))
    dispatch({
      type: FETCH_FORM_STRUCT,
      payload: struct,
      form: document
    })
  }
  
}
export const getLocation = () => async (dispatch) => {
  console.log(GET_LOCATION)
  let coords = 'vacio'
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      coords = position.coords;            
    })
  } else { coords = 'ubicación no accesible'; }

  dispatch( {
    type: GET_LOCATION,
    payload: coords      
  });
}
export const fetchFormStruct = document => async dispatch => {
  console.log(FETCH_FORM_STRUCT)
  config
    .doc('version')
    .get()
    .then(version => {
      if (
        version.data()[document + '_version'] !==
        localStorage.getItem(document + '_version')
      ) {
        config
          .doc('forms').collection(document)
          .get()
          .then(snapshot => {
            const struct = [];
            snapshot.forEach(doc => {
              struct.push(doc.data());
            });
            // guarda en el localstorage
            localStorage.setItem(document, JSON.stringify(struct))
            localStorage.setItem(
              document + '_version',
              version.data()[document + '_version']
            )
            // configura la estructura del formulario
            // guarda en el store
            dispatch({
              type: FETCH_FORM_STRUCT,
              payload: struct,
              form: document
            })
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
              
      } else {
        if (localStorage.hasOwnProperty(document)) {
          console.log('cargando preguntas desde localstorage')
          // get the document's value from localStorage
          let value = localStorage.getItem(document)

          // parse the localStorage string and setState
          try {
            let payload = JSON.parse(value)
            dispatch({
              type: FETCH_FORM_STRUCT,
              payload: payload,
              form: document
            })
          } catch (e) {
            // handle empty string
            console.log('Error', e)
          }
        }
      }
    })
    .catch(e => {
      workWithCachedData(dispatch, document)
    })
}
