/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Course } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CourseCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    summary: "",
    instructor: "",
    minGrade: "",
    totalHours: "",
    appOpen: false,
    desc: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [summary, setSummary] = React.useState(initialValues.summary);
  const [instructor, setInstructor] = React.useState(initialValues.instructor);
  const [minGrade, setMinGrade] = React.useState(initialValues.minGrade);
  const [totalHours, setTotalHours] = React.useState(initialValues.totalHours);
  const [appOpen, setAppOpen] = React.useState(initialValues.appOpen);
  const [desc, setDesc] = React.useState(initialValues.desc);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setSummary(initialValues.summary);
    setInstructor(initialValues.instructor);
    setMinGrade(initialValues.minGrade);
    setTotalHours(initialValues.totalHours);
    setAppOpen(initialValues.appOpen);
    setDesc(initialValues.desc);
    setErrors({});
  };
  const validations = {
    name: [],
    summary: [],
    instructor: [],
    minGrade: [],
    totalHours: [],
    appOpen: [],
    desc: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          summary,
          instructor,
          minGrade,
          totalHours,
          appOpen,
          desc,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new Course(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CourseCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              summary,
              instructor,
              minGrade,
              totalHours,
              appOpen,
              desc,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Summary"
        isRequired={false}
        isReadOnly={false}
        value={summary}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              summary: value,
              instructor,
              minGrade,
              totalHours,
              appOpen,
              desc,
            };
            const result = onChange(modelFields);
            value = result?.summary ?? value;
          }
          if (errors.summary?.hasError) {
            runValidationTasks("summary", value);
          }
          setSummary(value);
        }}
        onBlur={() => runValidationTasks("summary", summary)}
        errorMessage={errors.summary?.errorMessage}
        hasError={errors.summary?.hasError}
        {...getOverrideProps(overrides, "summary")}
      ></TextField>
      <TextField
        label="Instructor"
        isRequired={false}
        isReadOnly={false}
        value={instructor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              summary,
              instructor: value,
              minGrade,
              totalHours,
              appOpen,
              desc,
            };
            const result = onChange(modelFields);
            value = result?.instructor ?? value;
          }
          if (errors.instructor?.hasError) {
            runValidationTasks("instructor", value);
          }
          setInstructor(value);
        }}
        onBlur={() => runValidationTasks("instructor", instructor)}
        errorMessage={errors.instructor?.errorMessage}
        hasError={errors.instructor?.hasError}
        {...getOverrideProps(overrides, "instructor")}
      ></TextField>
      <TextField
        label="Min grade"
        isRequired={false}
        isReadOnly={false}
        value={minGrade}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              summary,
              instructor,
              minGrade: value,
              totalHours,
              appOpen,
              desc,
            };
            const result = onChange(modelFields);
            value = result?.minGrade ?? value;
          }
          if (errors.minGrade?.hasError) {
            runValidationTasks("minGrade", value);
          }
          setMinGrade(value);
        }}
        onBlur={() => runValidationTasks("minGrade", minGrade)}
        errorMessage={errors.minGrade?.errorMessage}
        hasError={errors.minGrade?.hasError}
        {...getOverrideProps(overrides, "minGrade")}
      ></TextField>
      <TextField
        label="Total hours"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalHours}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              summary,
              instructor,
              minGrade,
              totalHours: value,
              appOpen,
              desc,
            };
            const result = onChange(modelFields);
            value = result?.totalHours ?? value;
          }
          if (errors.totalHours?.hasError) {
            runValidationTasks("totalHours", value);
          }
          setTotalHours(value);
        }}
        onBlur={() => runValidationTasks("totalHours", totalHours)}
        errorMessage={errors.totalHours?.errorMessage}
        hasError={errors.totalHours?.hasError}
        {...getOverrideProps(overrides, "totalHours")}
      ></TextField>
      <SwitchField
        label="App open"
        defaultChecked={false}
        isDisabled={false}
        isChecked={appOpen}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              summary,
              instructor,
              minGrade,
              totalHours,
              appOpen: value,
              desc,
            };
            const result = onChange(modelFields);
            value = result?.appOpen ?? value;
          }
          if (errors.appOpen?.hasError) {
            runValidationTasks("appOpen", value);
          }
          setAppOpen(value);
        }}
        onBlur={() => runValidationTasks("appOpen", appOpen)}
        errorMessage={errors.appOpen?.errorMessage}
        hasError={errors.appOpen?.hasError}
        {...getOverrideProps(overrides, "appOpen")}
      ></SwitchField>
      <TextField
        label="Desc"
        isRequired={false}
        isReadOnly={false}
        value={desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              summary,
              instructor,
              minGrade,
              totalHours,
              appOpen,
              desc: value,
            };
            const result = onChange(modelFields);
            value = result?.desc ?? value;
          }
          if (errors.desc?.hasError) {
            runValidationTasks("desc", value);
          }
          setDesc(value);
        }}
        onBlur={() => runValidationTasks("desc", desc)}
        errorMessage={errors.desc?.errorMessage}
        hasError={errors.desc?.hasError}
        {...getOverrideProps(overrides, "desc")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
