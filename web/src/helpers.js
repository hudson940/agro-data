import { config } from './firebase'


function workWithCachedData(document){
  if (localStorage.hasOwnProperty(document)) {
    console.log('cargando preguntas desde localstorage')
    // get the document's value from localStorage
    let value = localStorage.getItem(document)

    // parse the localStorage string and setState
    try {
      value = JSON.parse(value)
      return value;
    } catch (e) {
      // handle empty string
      console.log('Error', e);
      return {}
    }
  }
  // si la variable no esta en el localstorage retorna objeto vacio
  else return {}
}

export const fetchFormStruct = async document  =>{
     config
    .doc('version')
    .get()
    .then(version => {
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
              
              
              // guarda en el localstorage
              localStorage.setItem(document, JSON.stringify(data))
              localStorage.setItem(
                document + '_version',
                version.data()[document + '_version']
              )
              // devuelve los datos
              return data;
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!')
              return {};
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error)
            return {}
          })
      } else {
       return workWithCachedData(document)
      }
    }).catch(e =>{
      return workWithCachedData(document)
    })

}
 