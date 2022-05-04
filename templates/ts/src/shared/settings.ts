import {AppSettings} from "@yostack/sdk-admin-react";

/**
 * A simple interface defining the settings your app uses.
 */
export interface MyAppSettings {
    accountId: string;
    accessToken: string;
}

/**
 * Settings metadata that is used to show the app settings admin interface to
 * the admin user.
 */
export const settings: AppSettings[] = [
    {
        name: "accountId",
        type: "string",
        label: "Account ID",
        helpText: "Example of an account ID setting.",
        required: true,
        public: true
    },
    {
        name: "accessToken",
        type: "string",
        label: "Access Token",
        helpText: "Example of an access token setting.",
        required: true,
        public: true
    },
];