import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly number?: string | null;
  readonly coordinator?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly number?: string | null;
  readonly coordinator?: string | null;
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
  readonly upi?: string | null;
  readonly auid?: string | null;
  readonly maxHours?: number | null;
  readonly preferredEmail?: string | null;
  readonly overseas?: boolean | null;
  readonly validNzWorkPermit?: boolean | null;
  readonly degree?: string | null;
  readonly yearsOfStudy?: string | null;
  readonly underPostGrad?: boolean | null;
  readonly currentTutor?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMarkerApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MarkerApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly upi?: string | null;
  readonly auid?: string | null;
  readonly maxHours?: number | null;
  readonly preferredEmail?: string | null;
  readonly overseas?: boolean | null;
  readonly validNzWorkPermit?: boolean | null;
  readonly degree?: string | null;
  readonly yearsOfStudy?: string | null;
  readonly underPostGrad?: boolean | null;
  readonly currentTutor?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MarkerApplication = LazyLoading extends LazyLoadingDisabled ? EagerMarkerApplication : LazyMarkerApplication

export declare const MarkerApplication: (new (init: ModelInit<MarkerApplication>) => MarkerApplication) & {
  copyOf(source: MarkerApplication, mutator: (draft: MutableModel<MarkerApplication>) => MutableModel<MarkerApplication> | void): MarkerApplication;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly MarkerApplications?: (MarkerApplication | null)[] | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly MarkerApplications: AsyncCollection<MarkerApplication>;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}