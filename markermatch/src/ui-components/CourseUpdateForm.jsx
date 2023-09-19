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
export default function CourseUpdateForm(props) {
  const {
    id: idProp,
    course: courseModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    coordinatorDetails: "",
    directorDetails: "",
    courseCode: "",
    yearSemester: "",
    desc: "",
    preAssignment: false,
    markersRequired: false,
    estNumStudents: "",
    currEnrolled: "",
    summary: "",
    minGrade: "",
    totalHours: "",
    appOpen: false,
  };
  const [coordinatorDetails, setCoordinatorDetails] = React.useState(
    initialValues.coordinatorDetails
  );
  const [directorDetails, setDirectorDetails] = React.useState(
    initialValues.directorDetails
  );
  const [courseCode, setCourseCode] = React.useState(initialValues.courseCode);
  const [yearSemester, setYearSemester] = React.useState(
    initialValues.yearSemester
  );
  const [desc, setDesc] = React.useState(initialValues.desc);
  const [preAssignment, setPreAssignment] = React.useState(
    initialValues.preAssignment
  );
  const [markersRequired, setMarkersRequired] = React.useState(
    initialValues.markersRequired
  );
  const [estNumStudents, setEstNumStudents] = React.useState(
    initialValues.estNumStudents
  );
  const [currEnrolled, setCurrEnrolled] = React.useState(
    initialValues.currEnrolled
  );
  const [summary, setSummary] = React.useState(initialValues.summary);
  const [minGrade, setMinGrade] = React.useState(initialValues.minGrade);
  const [totalHours, setTotalHours] = React.useState(initialValues.totalHours);
  const [appOpen, setAppOpen] = React.useState(initialValues.appOpen);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = courseRecord
      ? { ...initialValues, ...courseRecord }
      : initialValues;
    setCoordinatorDetails(cleanValues.coordinatorDetails);
    setDirectorDetails(cleanValues.directorDetails);
    setCourseCode(cleanValues.courseCode);
    setYearSemester(cleanValues.yearSemester);
    setDesc(cleanValues.desc);
    setPreAssignment(cleanValues.preAssignment);
    setMarkersRequired(cleanValues.markersRequired);
    setEstNumStudents(cleanValues.estNumStudents);
    setCurrEnrolled(cleanValues.currEnrolled);
    setSummary(cleanValues.summary);
    setMinGrade(cleanValues.minGrade);
    setTotalHours(cleanValues.totalHours);
    setAppOpen(cleanValues.appOpen);
    setErrors({});
  };
  const [courseRecord, setCourseRecord] = React.useState(courseModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Course, idProp)
        : courseModelProp;
      setCourseRecord(record);
    };
    queryData();
  }, [idProp, courseModelProp]);
  React.useEffect(resetStateValues, [courseRecord]);
  const validations = {
    coordinatorDetails: [],
    directorDetails: [],
    courseCode: [],
    yearSemester: [],
    desc: [],
    preAssignment: [],
    markersRequired: [],
    estNumStudents: [],
    currEnrolled: [],
    summary: [],
    minGrade: [],
    totalHours: [],
    appOpen: [],
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
          coordinatorDetails,
          directorDetails,
          courseCode,
          yearSemester,
          desc,
          preAssignment,
          markersRequired,
          estNumStudents,
          currEnrolled,
          summary,
          minGrade,
          totalHours,
          appOpen,
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
          await DataStore.save(
            Course.copyOf(courseRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CourseUpdateForm")}
      {...rest}
    >
      <TextField
        label="Coordinator details"
        isRequired={false}
        isReadOnly={false}
        value={coordinatorDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorDetails: value,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.coordinatorDetails ?? value;
          }
          if (errors.coordinatorDetails?.hasError) {
            runValidationTasks("coordinatorDetails", value);
          }
          setCoordinatorDetails(value);
        }}
        onBlur={() =>
          runValidationTasks("coordinatorDetails", coordinatorDetails)
        }
        errorMessage={errors.coordinatorDetails?.errorMessage}
        hasError={errors.coordinatorDetails?.hasError}
        {...getOverrideProps(overrides, "coordinatorDetails")}
      ></TextField>
      <TextField
        label="Director details"
        isRequired={false}
        isReadOnly={false}
        value={directorDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails: value,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.directorDetails ?? value;
          }
          if (errors.directorDetails?.hasError) {
            runValidationTasks("directorDetails", value);
          }
          setDirectorDetails(value);
        }}
        onBlur={() => runValidationTasks("directorDetails", directorDetails)}
        errorMessage={errors.directorDetails?.errorMessage}
        hasError={errors.directorDetails?.hasError}
        {...getOverrideProps(overrides, "directorDetails")}
      ></TextField>
      <TextField
        label="Course code"
        isRequired={false}
        isReadOnly={false}
        value={courseCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode: value,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.courseCode ?? value;
          }
          if (errors.courseCode?.hasError) {
            runValidationTasks("courseCode", value);
          }
          setCourseCode(value);
        }}
        onBlur={() => runValidationTasks("courseCode", courseCode)}
        errorMessage={errors.courseCode?.errorMessage}
        hasError={errors.courseCode?.hasError}
        {...getOverrideProps(overrides, "courseCode")}
      ></TextField>
      <TextField
        label="Year semester"
        isRequired={false}
        isReadOnly={false}
        value={yearSemester}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester: value,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.yearSemester ?? value;
          }
          if (errors.yearSemester?.hasError) {
            runValidationTasks("yearSemester", value);
          }
          setYearSemester(value);
        }}
        onBlur={() => runValidationTasks("yearSemester", yearSemester)}
        errorMessage={errors.yearSemester?.errorMessage}
        hasError={errors.yearSemester?.hasError}
        {...getOverrideProps(overrides, "yearSemester")}
      ></TextField>
      <TextField
        label="Desc"
        isRequired={false}
        isReadOnly={false}
        value={desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc: value,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
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
      <SwitchField
        label="Pre assignment"
        defaultChecked={false}
        isDisabled={false}
        isChecked={preAssignment}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment: value,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.preAssignment ?? value;
          }
          if (errors.preAssignment?.hasError) {
            runValidationTasks("preAssignment", value);
          }
          setPreAssignment(value);
        }}
        onBlur={() => runValidationTasks("preAssignment", preAssignment)}
        errorMessage={errors.preAssignment?.errorMessage}
        hasError={errors.preAssignment?.hasError}
        {...getOverrideProps(overrides, "preAssignment")}
      ></SwitchField>
      <SwitchField
        label="Markers required"
        defaultChecked={false}
        isDisabled={false}
        isChecked={markersRequired}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired: value,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.markersRequired ?? value;
          }
          if (errors.markersRequired?.hasError) {
            runValidationTasks("markersRequired", value);
          }
          setMarkersRequired(value);
        }}
        onBlur={() => runValidationTasks("markersRequired", markersRequired)}
        errorMessage={errors.markersRequired?.errorMessage}
        hasError={errors.markersRequired?.hasError}
        {...getOverrideProps(overrides, "markersRequired")}
      ></SwitchField>
      <TextField
        label="Est num students"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estNumStudents}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents: value,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.estNumStudents ?? value;
          }
          if (errors.estNumStudents?.hasError) {
            runValidationTasks("estNumStudents", value);
          }
          setEstNumStudents(value);
        }}
        onBlur={() => runValidationTasks("estNumStudents", estNumStudents)}
        errorMessage={errors.estNumStudents?.errorMessage}
        hasError={errors.estNumStudents?.hasError}
        {...getOverrideProps(overrides, "estNumStudents")}
      ></TextField>
      <TextField
        label="Curr enrolled"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={currEnrolled}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled: value,
              summary,
              minGrade,
              totalHours,
              appOpen,
            };
            const result = onChange(modelFields);
            value = result?.currEnrolled ?? value;
          }
          if (errors.currEnrolled?.hasError) {
            runValidationTasks("currEnrolled", value);
          }
          setCurrEnrolled(value);
        }}
        onBlur={() => runValidationTasks("currEnrolled", currEnrolled)}
        errorMessage={errors.currEnrolled?.errorMessage}
        hasError={errors.currEnrolled?.hasError}
        {...getOverrideProps(overrides, "currEnrolled")}
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
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary: value,
              minGrade,
              totalHours,
              appOpen,
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
        label="Min grade"
        isRequired={false}
        isReadOnly={false}
        value={minGrade}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade: value,
              totalHours,
              appOpen,
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
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours: value,
              appOpen,
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
              coordinatorDetails,
              directorDetails,
              courseCode,
              yearSemester,
              desc,
              preAssignment,
              markersRequired,
              estNumStudents,
              currEnrolled,
              summary,
              minGrade,
              totalHours,
              appOpen: value,
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
          isDisabled={!(idProp || courseModelProp)}
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
              !(idProp || courseModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
