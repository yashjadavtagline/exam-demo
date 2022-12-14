import React from "react";
import Input from "./Input";
import Button from "./Button";
import DropDown from "./DropDown";

const ReusableForm = (props) => {
  const {
    field,
    Data,
    error,
    onChange,
    buttonArr,
    currentQuestionIndex,
    onblur,
  } = props;
  return (
    <>
      <form>
        {field?.map((value, index) => {
          switch (value.type) {
            case "text":
            case "password":
            case "email":
              return (
                <div key={value.id}>
                  <Input
                    id={value.id}
                    label={value.label}
                    name={value.name}
                    value={Data[value.name] || Data[0]?.[value.name] || ""}
                    type={value.type}
                    placeholder={value.placeholder}
                    onChange={onChange}
                    error={error || ""}
                    disabled={value.disabled}
                  />
                </div>
              );
            case "radio":
              return (
                <div key={value.id}>
                  {value?.value?.map((v, i) => {
                    if (value.type === "radio" && v.type === "text") {
                      return (
                        <div key={v.id}>
                          <input
                            type="radio"
                            id={v.id}
                            className="form-check-input m-1"
                            name={value.name}
                            value={Data[v.name]}
                            checked={
                              (Data[v.name] && Data[v.name] === Data.answer) ||
                              ""
                            }
                            disabled={Data[v.name] === ""}
                            onChange={onChange}
                          />
                          <input
                            type="text"
                            id={v.id}
                            className="demo"
                            name={v.name}
                            value={Data[v.name] || ""}
                            onChange={onChange}
                            onBlur={onblur}
                            disabled={v.disabled}
                          />
                          {error && error[v.name] && (
                            <span style={{ color: "red" }}>
                              {error[v.name]}
                            </span>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div key={v.id} className="col-1">
                          <input
                            type={value.type}
                            name={value.name}
                            className="form-check-input m-1"
                            value={v.name}
                            checked={v.name === Data[value.name]}
                            onChange={onChange}
                            error={error || ""}
                          />
                          <label>{v.name}</label>
                        </div>
                      );
                    }
                  })}
                  <div key="error">
                    <span>
                      {error && value.name != "answer" && (
                        <span style={{ color: "red" }}>
                          {error[value.name]}
                        </span>
                      )}
                    </span>
                    <span>
                      {error && error.duplicateObject && (
                        <span style={{ color: "red" }}>
                          {error.duplicateObject}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              );
            case "select":
              return (
                <div key={value.id}>
                  <DropDown
                    value={Data?.subjectName}
                    name="subjectName"
                    optionfield={value.subjectNameField}
                    label={value.label}
                    onChange={onChange}
                    error={error}
                    disabled={value.disabled || currentQuestionIndex != 0}
                  />
                </div>
              );
            case "button":
              return buttonArr?.map((v, i) => {
                return (
                  <div key="button">
                    <Button clickHandler={v?.onClick} disabled={v.disabled}>
                      {v.children}
                    </Button>
                  </div>
                );
              });
          }
        })}
      </form>
    </>
  );
};

export default ReusableForm;

// import React from "react";
// import Input from "./Input";
// import Button from "./Button";
// import DropDown from "./DropDown";

// const ReusableForm = (props) => {
//   const { field, Data, error, onChange, buttonArr, index } = props;
//   const obj = Data.questions[index];
//   console.log('12332', obj["answer"])
//   return (
//     <>
//       <form>
//         {field?.map((value, index) => {
//           console.log("1233", value.name);
//           switch (value.type) {
//             case "text":
//             case "password":
//             case "email":
//               return (
//                 <div key={value.id}>
//                   <Input
//                     id={value.id}
//                     label={value.label}
//                     name={value.name || obj[value.name]}
//                     value={Data[value.name] || ""}
//                     type={value.type}
//                     placeholder={value.placeholder}
//                     onChange={onChange}
//                     error={error || ""}
//                     disabled={value.disabled}
//                   />
//                 </div>
//               );
//             case "radio":
//               return (
//                 <div key={value.id}>
//                   {value?.value?.map((v, i) => {
//                     if (value.type === "radio" && v.type === "text") {
//                       return (
//                         <div key={v.id}>
//                           <input
//                             type="radio"
//                             id={v.id}
//                             className="form-check-input m-1"
//                             name={value.name}
//                             value={Data[v.name]}
//                             checked={
//                               (Data[v.name] && Data[v.name] === Data.answer) ||
//                               ""
//                             }
//                             disabled={Data[v.name] === ""}
//                             onChange={onChange}
//                           />
//                           <input
//                             type="text"
//                             id={v.id}
//                             className="demo"
//                             name={v.name}
//                             value={Data[v.name] || ""}
//                             onChange={onChange}
//                             disabled={v.disabled}
//                           />
//                           {error && error[v.name] && (
//                             <span style={{ color: "red" }}>
//                               {error[v.name]}
//                             </span>
//                           )}
//                         </div>
//                       );
//                     } else {
//                       return (
//                         <div key={v.id} className="col-1">
//                           <input
//                             type={value.type}
//                             name={value.name}
//                             className="form-check-input m-1"
//                             value={v.name}
//                             checked={v.name === Data[value.name]}
//                             onChange={onChange}
//                             error={error || ""}
//                           />
//                           <label>{v.name}</label>
//                         </div>
//                       );
//                     }
//                   })}
//                   <div key="error">
//                     {error && value.name != "answer" && (
//                       <span style={{ color: "red" }}>{error[value.name]}</span>
//                     )}
//                   </div>
//                 </div>
//               );
//             case "select":
//               return (
//                 <div key={value.id}>
//                   <DropDown
//                     value={Data?.subjectName}
//                     name="subjectName"
//                     optionfield={value.subjectNameField}
//                     label={value.label}
//                     onChange={onChange}
//                     error={error}
//                     disabled={value.disabled}
//                   />
//                 </div>
//               );
//             case "button":
//               return buttonArr?.map((v, i) => {
//                 return (
//                   <div key="button" className="row">
//                     <Button clickHandler={v?.onClick}>{v.children}</Button>
//                   </div>
//                 );
//               });
//           }
//         })}
//       </form>
//     </>
//   );
// };

// export default ReusableForm;
