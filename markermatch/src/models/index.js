// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Cart, Course, MarkerApplication } = initSchema(schema);

export {
  Cart,
  Course,
  MarkerApplication
};