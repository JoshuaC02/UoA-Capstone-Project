import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerApplicationStatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ApplicationStatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly appliedCourses?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyApplicationStatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ApplicationStatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly appliedCourses?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ApplicationStatus = LazyLoading extends LazyLoadingDisabled ? EagerApplicationStatus : LazyApplicationStatus

export declare const ApplicationStatus: (new (init: ModelInit<ApplicationStatus>) => ApplicationStatus) & {
  copyOf(source: ApplicationStatus, mutator: (draft: MutableModel<ApplicationStatus>) => MutableModel<ApplicationStatus> | void): ApplicationStatus;
}

type EagerCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly selectedCourses?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly selectedCourses?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Cart = LazyLoading extends LazyLoadingDisabled ? EagerCart : LazyCart

export declare const Cart: (new (init: ModelInit<Cart>) => Cart) & {
  copyOf(source: Cart, mutator: (draft: MutableModel<Cart>) => MutableModel<Cart> | void): Cart;
}

type EagerCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly coordinatorName?: string | null;
  readonly coordinatorEmail?: string | null;
  readonly courseCode?: string | null;
  readonly yearSemester?: string | null;
  readonly faculty?: string | null;
  readonly preassignMarkers?: boolean | null;
  readonly requireMarkers?: boolean | null;
  readonly estimatedStudents?: string | null;
  readonly enrolledStudents?: string | null;
  readonly summary?: string | null;
  readonly minGrade?: string | null;
  readonly totalHours?: string | null;
  readonly appOpen?: boolean | null;
  readonly description?: string | null;
  readonly directorName?: string | null;
  readonly directorEmail?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly coordinatorName?: string | null;
  readonly coordinatorEmail?: string | null;
  readonly courseCode?: string | null;
  readonly yearSemester?: string | null;
  readonly faculty?: string | null;
  readonly preassignMarkers?: boolean | null;
  readonly requireMarkers?: boolean | null;
  readonly estimatedStudents?: string | null;
  readonly enrolledStudents?: string | null;
  readonly summary?: string | null;
  readonly minGrade?: string | null;
  readonly totalHours?: string | null;
  readonly appOpen?: boolean | null;
  readonly description?: string | null;
  readonly directorName?: string | null;
  readonly directorEmail?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Course = LazyLoading extends LazyLoadingDisabled ? EagerCourse : LazyCourse

export declare const Course: (new (init: ModelInit<Course>) => Course) & {
  copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}

type EagerMarkerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MarkerApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly auid?: string | null;
  readonly upi?: string | null;
  readonly preferredEmail?: string | null;
  readonly overseas?: boolean | null;
  readonly validNzWorkPermit?: boolean | null;
  readonly degree?: string | null;
  readonly yearsOfStudy?: string | null;
  readonly underPostGrad?: boolean | null;
  readonly currentTutor?: string | null;
  readonly maxHours?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMarkerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MarkerApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly auid?: string | null;
  readonly upi?: string | null;
  readonly preferredEmail?: string | null;
  readonly overseas?: boolean | null;
  readonly validNzWorkPermit?: boolean | null;
  readonly degree?: string | null;
  readonly yearsOfStudy?: string | null;
  readonly underPostGrad?: boolean | null;
  readonly currentTutor?: string | null;
  readonly maxHours?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MarkerApplication = LazyLoading extends LazyLoadingDisabled ? EagerMarkerApplication : LazyMarkerApplication

export declare const MarkerApplication: (new (init: ModelInit<MarkerApplication>) => MarkerApplication) & {
  copyOf(source: MarkerApplication, mutator: (draft: MutableModel<MarkerApplication>) => MutableModel<MarkerApplication> | void): MarkerApplication;
}