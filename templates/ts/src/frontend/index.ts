import {AppSetupContext} from "@yostack/sdk-frontend-react";
import {ExampleComponent} from "./components/example.component";
import {ExampleDataRequestHandler} from "./example-data-request-handler";
import {exampleDataProviderId} from "../shared/constants";
import {exampleAudienceCriteriaEvaluator} from "./audiences/example-audience-criteria-evaluator";
import "./scss/main.scss";

export function init(context: AppSetupContext) {

    // Register the React component for the component type matching the type ID
    context.registerComponent(
        '{{appName}}/example-component',
        ExampleComponent
    );

    // Register the data request handler for the data provider matching the ID
    context.registerDataRequestHandler(
        exampleDataProviderId,
        ExampleDataRequestHandler
    );

    // Register the audience criteria evaluator for the audience criteria matching the ID
    context.registerAudienceCriteriaEvaluator(
        '{{appName}}/example-audience-criteria',
        exampleAudienceCriteriaEvaluator
    );

}