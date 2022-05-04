import {AppInitContext, AppContext} from "@yostack/sdk-admin-react";
import {ExampleEditor} from "./editors/example.editor";
import {collectionSchemas, getCollectionDetails, getCollections} from "./data-providers/example-data-provider";
import {ExampleService} from "./example.service";
import {exampleDataProviderId} from "../shared/constants";
import {MyAppSettings} from "../shared/settings";
import "./scss/main.scss";


/**
 * The init function gets called after the app was loaded in the admin.
 * It is responsible for initializing and registering everything the app needs.
 *
 * Note that, if you have settings that are marked as required, the init
 * function will not get called until all required settings have been set
 * by the user.
 *
 * @param context The app init context, which provides functions to register
 *                config field editors, data providers, services, etc.
 */
export function init(context: AppInitContext<MyAppSettings>) {

    /**
     * Register a custom component config field editor.
     */
    context.registerConfigFieldEditor(
        '{{appName}}/example-config-field-editor',
        ExampleEditor,
        { allowOverride: false }
    );

    /**
     * Register a service, which will be provided to registered React config field editor
     * components via their React component props. This is useful, if your React config
     * field editor components require access to operations that utilize app settings or
     * other centralized logic. You can only register one service per app.
     */
    context.registerService((appContext: AppContext) => {
        const {accountId, accessToken} = appContext.settings;
        return new ExampleService(accountId, accessToken);
    });

    /**
     * Register a data provider. For the admin, this means providing data schemas
     * that allow for the configuration of data-driven components.
     */
    context.registerDataProvider(exampleDataProviderId, 'My Data Provider', collectionSchemas, {
        // All the below options are optional
        collectionLabel: 'Collections',
        getCollections: getCollections,
        getCollectionDetails: getCollectionDetails
    });

}
