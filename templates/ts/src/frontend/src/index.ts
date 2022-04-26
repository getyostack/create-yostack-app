import {AppSetupContext} from "@yostack/sdk-frontend-react";
import {ExampleComponent} from "./components/example.component";
import "./scss/main.scss";

export function init(context: AppSetupContext) {
    context.registerComponent('{{appName}}:example-component', ExampleComponent);
}