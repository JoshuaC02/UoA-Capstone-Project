/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { ApplicationStatus } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ApplicationStatusUpdateForm(props) {
  const {
    id: idProp,
    applicationStatus: applicationStatusModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    appliedCourses: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [appliedCourses, setAppliedCourses] = React.useState(
    initialValues.appliedCourses
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = applicationStatusRecord
      ? { ...initialValues, ...applicationStatusRecord }
      : initialValues;
    setUserId(cleanValues.userId);
    setAppliedCourses(cleanValues.appliedCourses);
    setErrors({});
  };
  const [applicationStatusRecord, setApplicationStatusRecord] = React.useState(
    applicationStatusModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(ApplicationStatus, idProp)
        : applicationStatusModelProp;
      setApplicationStatusRecord(record);
    };
    queryData();
  }, [idProp, applicationStatusModelProp]);
  React.useEffect(resetStateValues, [applicationStatusRecord]);
  const validations = {
    userId: [],
    appliedCourses: [],
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
          userId,
          appliedCourses,
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
<<<<<<< HEAD
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
=======
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
>>>>>>> origin/application-form
            }
          });
          await DataStore.save(
            ApplicationStatus.copyOf(applicationStatusRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationStatusUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              appliedCourses,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Applied courses"
        isRequired={false}
        isReadOnly={false}
        value={appliedCourses}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              appliedCourses: value,
            };
            const result = onChange(modelFields);
            value = result?.appliedCourses ?? value;
          }
          if (errors.appliedCourses?.hasError) {
            runValidationTasks("appliedCourses", value);
          }
          setAppliedCourses(value);
        }}
        onBlur={() => runValidationTasks("appliedCourses", appliedCourses)}
        errorMessage={errors.appliedCourses?.errorMessage}
        hasError={errors.appliedCourses?.hasError}
        {...getOverrideProps(overrides, "appliedCourses")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || applicationStatusModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || applicationStatusModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
