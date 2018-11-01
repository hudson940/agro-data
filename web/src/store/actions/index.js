import { config } from '../../firebase'
import { FETCH_FORM_STRUCT } from './types'


export const fetchFormStruct = document => async dispatch =>{
     config
    .doc('version')
    .get()
    .then(version => {
        console.log(version.data())
      if (
        version.data()[document + '_version'] !==
        localStorage.getItem(document + '_version')
      ) {
        config
          .doc(document)
          .get()
          .then(function(doc) {
            if (doc.exists) {
               let data = doc.data();
              // configura la estructura del formulario
              // guarda en el store
              dispatch({
                type: FETCH_FORM_STRUCT,
                payload: data,
              })
              // guarda en el localstorage
              localStorage.setItem(document, JSON.stringify(data))
              localStorage.setItem(
                document + '_version',
                version.data()[document + '_version']
              )
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!')
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error)
          })
      } else {
        if (localStorage.hasOwnProperty(document)) {
          console.log('cargando preguntas desde localstorage')
          // get the document's value from localStorage
          let value = localStorage.getItem(document)

          // parse the localStorage string and setState
          try {
            value = JSON.parse(value)
            dispatch({
              type: FETCH_FORM_STRUCT,
              payload: value
            })
          } catch (e) {
            // handle empty string
            console.log('Error', e)
          }
        }
      }
    })

}
 