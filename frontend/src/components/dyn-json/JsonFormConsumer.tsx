import JsonForm from "./JsonForm";
import { h, createEffect, createState } from "@vdom-lib";
import { loadUI } from "./utils";
// import "./form.css";
import { ANY, intentToJsonfie } from "../../utils/state";

type JFC = {
  key: string;
  currentIntent: string;
  id: number;
};

export const JsonFormConsumer = ({ key, currentIntent, id }: JFC) => {
  const [uiJson, setUiJson] = createState(null);
  // const [usecaseChanged, setUsecaseChanged] = createState(false);

  // vv imp func: this is all business logic
  const onFormChange = (formData: any, currrentValue: ANY) => {
    // if (currrentValue?.name === "selectUsecase") {
    //   setUsecaseChanged(true);
    //   // modify the form json based on the selected use case
    //   setUiJson((prevUiJson) => {
    //     return {
    //       ...prevUiJson,
    //       form: {
    //         ...prevUiJson.form,
    //         children: prevUiJson.form.children // .filter((field, idx) => idx === 0)
    //           .filter((field) => field.name === "selectUsecase")
    //           .concat(prevUiJson.more[currrentValue.value]?.children || []),
    //         // id: "configForm" + Date.now(), // update form id to force re-render
    //       },
    //     };
    //   });
    // } else {
    //   setUsecaseChanged(false);
    // }
  };

  const onFormSubmit = ({ formState }: { formState: any }) => {
    // console.log("submitted form state", formState);
  };

  const jsonFile = intentToJsonfie.get(currentIntent) || "default.json";

  console.log();

  createEffect(() => {
    console.log("onMount");
    loadUI(`/${jsonFile}?t=` + Date.now())
      .then((data) => {
        console.log("UI JSON loaded successfully", data);
        setUiJson(data);
      })
      .catch((error) => {
        console.error("Error loading UI JSON:", error);
      });

    return () => {
      console.log("onCleanup jsonform");
    };
  }, []);

  return (
    <JsonForm
      instanceId={id}
      setIsFormValid={() => {}}
      uiJson={uiJson}
      onFormChange={onFormChange}
      onSubmit={onFormSubmit}
      usecaseChanged={false}
    />
  );
};
