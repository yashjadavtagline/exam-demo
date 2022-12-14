import React from "react";
import Input from "./Input";
import Radio from "./Radio";

const Form = ({ field, Data, error, handleChange }) => {
  return (
    <>
      {field?.map(
        ({ name, label, placeholder, type, id, value, errorShow }, i) => {
          switch (type) {
            case "text":
            case "password":
            case "email":
              return (
                <div key={id} className="row">
                  <Input
                    id={id}
                    label={label}
                    name={name}
                    value={Data[name]}
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange}
                    error={error || ""}
                  />
                </div>
              );
            case "radio":
              return (
                <React.Fragment key={id}>
                  {value.map((v, i) => {
                    return (
                      <React.Fragment key={v.name}>
                        <Radio
                          id={value.name}
                          name={name}
                          value={v.name}
                          checked={v.name === Data[name]}
                          type={type}
                          onChange={handleChange}
                          label={v.name}
                          error={error || ""}
                          errorShow={errorShow || ""}
                        />
                      </React.Fragment>
                    );
                  })}
                  <div>
                    {error && (
                      <span style={{ color: "red" }}>{error[name]}</span>
                    )}
                  </div>
                </React.Fragment>
              );
          }
        }
      )}
    </>
  );
};

export default Form;
