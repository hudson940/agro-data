import t from "tcomb-form";

export const parseDataToTcombForm = (data) => {
    let model = {};
    Object.documents(data).map((document, index) => {
      let type = t[data[document]]
      if (type) model[document] = type 
    })
    return t.struct(model);
  }
