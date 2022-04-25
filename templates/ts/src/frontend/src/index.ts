import {AppSetupContext} from "@yostack/sdk-frontend-react";
import {ExampleComponent} from "./components/example.component";

export function init(context: AppSetupContext) {
    context.registerComponent('{{appName}}:example-component', ExampleComponent);
}