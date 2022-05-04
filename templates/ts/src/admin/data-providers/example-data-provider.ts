import {AppContext, DataCollectionSchema} from "@yostack/sdk-admin-react";
import {MyExampleProductCollectionSchema} from "../../shared/collections/product-collection";

/**
 * An array of collection schemas. Can be an empty array, if all schemas are provided
 * dynamically via the `getCollections` function.
 *
 * A schema defines the collection id and name, as well as, the structure and format
 * of the data that is returned by the data API.
 */
export const collectionSchemas: DataCollectionSchema[] = [
    MyExampleProductCollectionSchema
];

/**
 * An example of a `getCollections` function, which can optionally be provided with the
 * `registerDataProvider` options. When provided, this function is called when the data
 * provider is being registers and allows for dynamically retrieving and providing collection
 * schemas. Typically, this function is used, if the schema itself is dynamic and inferred
 * from some metadata provided by an API.
 *
 * @param appContext The app context that includes app settings and other relevant information.
 * @returns An array of data collection schemas.
 */
export async function getCollections(appContext: AppContext): Promise<DataCollectionSchema[]> {
    // Typically, you would make an API request here.
    return [];
}

/**
 * An example of a `getCollectionDetails` function, which can optionally be provided with the
 * `registerDataProvider` options. When provided, this function is called when the data
 * provider is being registers and allows for dynamically retrieving and providing details for
 * the given schema. Typically, this function is used, if parts of the schema are static but
 * additional details need to be added dynamically, e.g. based on some metadata retrieved from
 * an API.
 *
 * @param schema The schema for which details may be provided.
 * @param appContext The app context that includes app settings and other relevant information.
 * @returns The full data collection schema.
 */
export async function getCollectionDetails(schema: DataCollectionSchema, appContext: AppContext): Promise<DataCollectionSchema> {
    // Simply returning the given schema for this example. Typically, you would make an API request here
    // and return an updated schema.
    return schema;
}