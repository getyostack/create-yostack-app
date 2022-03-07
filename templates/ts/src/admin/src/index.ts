import {App} from "@yostack/sdk-admin-react";
import {ExampleEditor} from "./editors/example.editor";
import {ExampleService} from "./example.service";

export const app: App<Settings> = {
    supports: {
        ecommerce: true,
        data: true
    },
    settings: [
        {
            name: "accountId",
            type: "string",
            label: "Account ID",
            helpText: "Your app integration account ID.",
            required: true,
            public: true
        },
        {
            name: "accessToken",
            type: "string",
            label: "Access Token",
            helpText: "Your private access token for you app integration.",
            required: true,
            public: false
        }
    ],
    setupText: 'Connect your app.',
    serviceProvider: (settings: Settings) => {
        const storeHash = settings.accountId;
        const accessToken = settings.accessToken;
        return new ExampleService(storeHash, accessToken);
    },
    editors: [
        {
            id: '{{appName}}:example-custom-editor',
            component: ExampleEditor,
            options: {
                allowOverride: false
            }
        }
    ]
};

interface Settings {
    accountId: string;
    accessToken: string;
}