import { h, createState, createEffect } from "@vdom-lib";
import { isFormValid, validate } from "./utils";
import { ANY } from "../../utils/state";
import "./form.css";

let nextJsonFormInstanceId = 0;

const ErrorMessage = ({
  id,
  error,
}: {
  id: string;
  error: string | undefined;
}) => {
  return (
    <div>
      <div className="col-sm-2"></div>
      <p id={id} className="message-invalid danger col-sm-10">
        {/* {error ? (
<Icon name="exclamation-triangle" className="sl-icon_color_error" />
) : null}
{" " + (error || "")} */}
        {error}
      </p>
    </div>
  );
};

const Field = (props: {
  field: any;
  state: { value: ANY; error: string };
  formInstanceId: number;
  onBlur: Function;
  key: string;
}) => {
  // console.log("field", field);
  let control;
  const { field, state, formInstanceId, onBlur } = props;
  const fieldId = `${formInstanceId}-${field.id || field.name}`;
  const errorId = `${fieldId}-error`;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      control = (
        <div>
          <label htmlFor={fieldId} className="form-label">
            {field.label}
          </label>
          <input
            type={field.type}
            className={"col-sm-10 " + field.className}
            id={fieldId}
            name={field.name}
            aria-describedby={errorId}
            placeholder={field.placeholder || ""}
            required={field.required}
            value={state?.value ?? field.value ?? field.defaultValue ?? ""}
            onBlur={onBlur}
          />
        </div>
      );
      break;
    case "select":
      control = (
        <div>
          <label htmlFor={fieldId} className="form-label">
            {field.label}
          </label>
          <select
            aria-label={field.label}
            className={"col-sm-101 " + field.className}
            id={fieldId}
            name={field.name}
            aria-describedby={errorId}
            onBlur={onBlur}
            // required={field.required}
            // defaultValue={field.value || state?.value}
            value={state?.value ?? field.value ?? field.defaultValue ?? ""}
          >
            {field.children.map((option: { label: string; value: ANY }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case "checkbox":
      control = (
        <div>
          <input
            type="checkbox"
            className={field.className}
            id={fieldId}
            name={field.name}
            aria-describedby={errorId}
            required={field.required}
            // defaultValue={state?.value}
            checked={state?.value ?? field.value ?? field.defaultValue ?? false}
            onBlur={onBlur}
          />
          <label className="form-check-label" htmlFor={fieldId}>
            {field.label}
          </label>
        </div>
      );
      break;
    case "textarea":
      control = (
        <div>
          <label htmlFor={fieldId} className="form-label">
            {field.label}
          </label>
          <textarea
            className={"col-sm-10 " + field.className}
            id={fieldId}
            name={field.name}
            aria-describedby={errorId}
            placeholder={field.placeholder || ""}
            required={field.required}
            rows={field.rows}
            cols={field.cols}
            value={state?.value ?? field.value ?? field.defaultValue ?? ""}
            onBlur={onBlur}
          ></textarea>
        </div>
      );
      break;
    default:
      control = null;
  }

  return control ? (
    <div className="mb-3">
      {control}
      <ErrorMessage
        id={errorId}
        // error={formState()?.[field.name]?.error}
        error={state?.error}
      />
    </div>
  ) : null;
};

const getInitialFieldValue = (field: { value?: ANY; defaultValue?: ANY }) => {
  return field.value ?? field.defaultValue ?? "";
};

const JsonForm = ({
  // setIsFormValid,
  // setRequestObj,
  uiJson,
  onFormChange,
  onSubmit,
  usecaseChanged,
  instanceId,
}: {
  setIsFormValid: Function;
  uiJson: any;
  onFormChange: Function;
  onSubmit: Function;
  usecaseChanged: boolean;
  instanceId: number;
}) => {
  // const [uiJson, setUiJson] = createState(null);

  // const [uiJsonRef] = createState({ current: uiJson });
  const [formState, setFormState] = createState<null | {}>(null);
  const [formValid, setFormValid] = createState(false);
  const formInstanceId = instanceId;

  // uiJsonRef.current = uiJson;
  // const getLatestUiJson = () => uiJsonRef.current;

  let formRef;

  createEffect(() => {
    console.log("uiJson changed");
    if (uiJson) {
      const newState = uiJson.form?.children.reduce(
        (acc: any, field: { value: ANY; error: string }) => {
          const existingField: any = formState?.[field.name];
          acc[field.name] = {
            value: existingField
              ? existingField.value
              : getInitialFieldValue(field),
            error: existingField?.error ?? field.error ?? "",
          };
          return acc;
        },
        {},
      );

      setFormState((prevState) =>
        usecaseChanged ? { ...newState } : { ...prevState, ...newState },
      );
      // setFormValid(isFormValid(initialState));
    }
  }, [uiJson]);

  createEffect(() => {
    if (!formState || !uiJson) {
      return;
    }

    setFormValid(isFormValid(uiJson, formState));
  }, [uiJson, formState]);

  const validateForm = () => {
    // console.log("validateForm", formState);
    // const errors = {};
    let isValid = true;
    const nextState = {};

    for (const fieldName in formState) {
      const field = formState[fieldName];
      const { value } = field;
      const error = validate(uiJson, fieldName, value);
      if (error) {
        // errors[fieldName] = error;
        isValid = false;
      }

      nextState[fieldName] = {
        value,
        error,
      };
    }

    // console.log("errors", errors);

    setFormState(nextState);
    setFormValid(isValid);

    // return { isValid, errors };
    return isValid;
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    // console.log("formState()", formState());
    // validateForm();
    const isValid = validateForm();
    // console.log("isValid", isValid);
    if (isValid) {
      console.log("Form submitted successfully");
      onSubmit?.({
        formState,
        // uiJson,  // dont think we need this
      });
    } else {
      console.log("Form submission failed");
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldVal = type === "checkbox" ? checked : value;

    setFormState((prevState) => {
      // const currentUiJson = getLatestUiJson();
      const err = validate(uiJson, name, fieldVal);
      const newState = {
        ...prevState,
        [name]: {
          value: fieldVal,
          error: err,
        },
      };

      setTimeout(() => {
        // setIsFormValid(isFormValid(newState));
        onFormChange?.(newState, { name, value: fieldVal, error: err });

        // const isValid = isFormValid(newState);
        // setFormValid(isValid);
      }, 0);

      return newState;
    });
  };

  const onBlur = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "submit") {
      // return when submit button is blurred to avoid validating form on submit button click
      return;
    }

    if (type === "checkbox") {
      setError(name, validate(uiJson, name, checked));
    } else {
      setError(name, validate(uiJson, name, value));
    }
  };

  const setError = (id: string, error: string) => {
    let newState;

    setFormState((prevState) => {
      newState = {
        ...prevState,
        [id]: {
          value: prevState[id].value,
          error,
        },
      };

      // setTimeout(() => {
      //   // setIsFormValid(isFormValid(newState));
      //   console.log(isFormValid(newState));
      // }, 0);

      return newState;
    });
  };

  return (
    <div>
      {uiJson && formState && (
        <form
          id={`${formInstanceId}-${uiJson.form.id || "form"}`}
          noValidate
          // ref={(el) => {
          //   formRef = el;

          //   // console.log("el", el);
          //   el = null;
          // }}
          className={uiJson.form.className}
          onBlur={onBlur}
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          {uiJson.form.children.map((field: { name: string }) => (
            <Field
              key={`${formInstanceId}-${field.name}`}
              field={field}
              state={formState[field.name]}
              formInstanceId={formInstanceId}
              onBlur={onBlur}
              // handleChange={handleChange}
            />
          ))}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      )}
      {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
    </div>
  );
};

export default JsonForm;
