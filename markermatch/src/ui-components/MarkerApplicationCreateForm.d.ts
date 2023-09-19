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
export declare type MarkerApplicationCreateFormInputValues = {
    userId?: string;
    auid?: string;
    upi?: string;
    preferredEmail?: string;
    overseas?: boolean;
    validNzWorkPermit?: boolean;
    degree?: string;
    yearsOfStudy?: string;
    underPostGrad?: string;
    currentTutor?: boolean;
    maxHours?: number;
    transcriptId?: string;
    cvId?: string;
    prefRating?: string;
};
export declare type MarkerApplicationCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    auid?: ValidationFunction<string>;
    upi?: ValidationFunction<string>;
    preferredEmail?: ValidationFunction<string>;
    overseas?: ValidationFunction<boolean>;
    validNzWorkPermit?: ValidationFunction<boolean>;
    degree?: ValidationFunction<string>;
    yearsOfStudy?: ValidationFunction<string>;
    underPostGrad?: ValidationFunction<string>;
    currentTutor?: ValidationFunction<boolean>;
    maxHours?: ValidationFunction<number>;
    transcriptId?: ValidationFunction<string>;
    cvId?: ValidationFunction<string>;
    prefRating?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MarkerApplicationCreateFormOverridesProps = {
    MarkerApplicationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    auid?: PrimitiveOverrideProps<TextFieldProps>;
    upi?: PrimitiveOverrideProps<TextFieldProps>;
    preferredEmail?: PrimitiveOverrideProps<TextFieldProps>;
    overseas?: PrimitiveOverrideProps<SwitchFieldProps>;
    validNzWorkPermit?: PrimitiveOverrideProps<SwitchFieldProps>;
    degree?: PrimitiveOverrideProps<TextFieldProps>;
    yearsOfStudy?: PrimitiveOverrideProps<TextFieldProps>;
    underPostGrad?: PrimitiveOverrideProps<TextFieldProps>;
    currentTutor?: PrimitiveOverrideProps<SwitchFieldProps>;
    maxHours?: PrimitiveOverrideProps<TextFieldProps>;
    transcriptId?: PrimitiveOverrideProps<TextFieldProps>;
    cvId?: PrimitiveOverrideProps<TextFieldProps>;
    prefRating?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MarkerApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: MarkerApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MarkerApplicationCreateFormInputValues) => MarkerApplicationCreateFormInputValues;
    onSuccess?: (fields: MarkerApplicationCreateFormInputValues) => void;
    onError?: (fields: MarkerApplicationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MarkerApplicationCreateFormInputValues) => MarkerApplicationCreateFormInputValues;
    onValidate?: MarkerApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function MarkerApplicationCreateForm(props: MarkerApplicationCreateFormProps): React.ReactElement;
