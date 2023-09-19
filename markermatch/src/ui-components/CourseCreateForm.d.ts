/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseCreateFormInputValues = {
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
export declare type CourseCreateFormValidationValues = {
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
export declare type CourseCreateFormOverridesProps = {
    CourseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type CourseCreateFormProps = React.PropsWithChildren<{
    overrides?: CourseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CourseCreateFormInputValues) => CourseCreateFormInputValues;
    onSuccess?: (fields: CourseCreateFormInputValues) => void;
    onError?: (fields: CourseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseCreateFormInputValues) => CourseCreateFormInputValues;
    onValidate?: CourseCreateFormValidationValues;
} & React.CSSProperties>;
export default function CourseCreateForm(props: CourseCreateFormProps): React.ReactElement;
