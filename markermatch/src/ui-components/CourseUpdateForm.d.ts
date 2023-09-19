/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Course } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseUpdateFormInputValues = {
    coordinatorDetails?: string;
    directorDetails?: string;
    courseCode?: string;
    yearSemester?: string;
    desc?: string;
    preAssignment?: boolean;
    markersRequired?: boolean;
    estNumStudents?: number;
    currEnrolled?: number;
    summary?: string;
    minGrade?: string;
    totalHours?: number;
    appOpen?: boolean;
};
export declare type CourseUpdateFormValidationValues = {
    coordinatorDetails?: ValidationFunction<string>;
    directorDetails?: ValidationFunction<string>;
    courseCode?: ValidationFunction<string>;
    yearSemester?: ValidationFunction<string>;
    desc?: ValidationFunction<string>;
    preAssignment?: ValidationFunction<boolean>;
    markersRequired?: ValidationFunction<boolean>;
    estNumStudents?: ValidationFunction<number>;
    currEnrolled?: ValidationFunction<number>;
    summary?: ValidationFunction<string>;
    minGrade?: ValidationFunction<string>;
    totalHours?: ValidationFunction<number>;
    appOpen?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseUpdateFormOverridesProps = {
    CourseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    coordinatorDetails?: PrimitiveOverrideProps<TextFieldProps>;
    directorDetails?: PrimitiveOverrideProps<TextFieldProps>;
    courseCode?: PrimitiveOverrideProps<TextFieldProps>;
    yearSemester?: PrimitiveOverrideProps<TextFieldProps>;
    desc?: PrimitiveOverrideProps<TextFieldProps>;
    preAssignment?: PrimitiveOverrideProps<SwitchFieldProps>;
    markersRequired?: PrimitiveOverrideProps<SwitchFieldProps>;
    estNumStudents?: PrimitiveOverrideProps<TextFieldProps>;
    currEnrolled?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
    minGrade?: PrimitiveOverrideProps<TextFieldProps>;
    totalHours?: PrimitiveOverrideProps<TextFieldProps>;
    appOpen?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CourseUpdateFormProps = React.PropsWithChildren<{
    overrides?: CourseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    course?: Course;
    onSubmit?: (fields: CourseUpdateFormInputValues) => CourseUpdateFormInputValues;
    onSuccess?: (fields: CourseUpdateFormInputValues) => void;
    onError?: (fields: CourseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseUpdateFormInputValues) => CourseUpdateFormInputValues;
    onValidate?: CourseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CourseUpdateForm(props: CourseUpdateFormProps): React.ReactElement;
