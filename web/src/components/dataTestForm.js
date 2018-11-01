import { testFormRef } from '../../../firebase'





export const Form = t.Form;
let model ={};
let modelForm = {};

testFormRef
  .get()
  .then(function(doc) {
    if (doc.exists) {
        
      let questions = doc.data()
      
      Object.keys(questions).map((key, index) => {
        let type = t[questions[key]]
        if (type) model[key] = type
        
      })
      console.log("model:",model)
      modelForm = t.struct(model)
      console.log("modelForm: ",modelForm)


      
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  })
  .catch(function(error) {
    console.log('Error getting document:', error)
  })

  const mapStateToProps = ({ data }) => {
    return {
      data,
    };
  };



export default modelForm;
