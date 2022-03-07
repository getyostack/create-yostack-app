import React from "react";
import {EditorProps} from "@yostack/sdk-admin-react";
import {ExampleService} from "../example.service";

/**
 * This is an example of a custom component configuration editor. Component configuration editors are rendered
 * in the admin when a component is being edited. The editor is responsible for allowing the user to configure
 * one or more values for the component being edited.
 *
 * Examples of simple, built-in, component configuration editors are:
 *  - String input editor that renders a text input field and sets a string value.
 *  - Textarea editor that renders a textarea field and sets a string value.
 *  - Select editor that renders a select/dropdown field and sets a predefined option value.
 *  - Checkbox editor that renders a checkbox field and sets a boolean value.
 *
 * Examples of more advanced component configuration editors are:
 *  - Image select editor, which opens a modal dialog to allow the user to select an image and then sets
 *    multiple image-specific configuration values (e.g. url/filename, aspect ratio, alt text).
 *  - Heading editor, which renders multiple buttons (h1, h2, h3, h4, h5, h6) and sets a string value
 *    representing the chosen heading level.
 *  - Layout grid editor, which renders a custom UI to allow for grid specific configuration options to be set.
 *
 * @param props Every editor gets the following props:
 *  - value {any}:              The value currently configured for the configuration field for which this editor
 *                              is being used.
 *  - config {object}:          The full configuration object of the component that is currently being edited.
 *  - updateValue {function}:   A function that accepts a new value as parameter.
 *  - updateConfig {function}:  A function that accepts a configuration object as parameter and, thus, can be
 *                              used to update multiple configuration fields at once.
 *  - service {object}:         An instance of the app's service, if the app provides one. This allows the editor to
 *                              take advantage of app-specific functionality, such as the ability to fetch data from
 *                              an API.
 */
export function ExampleEditor(props: EditorProps<ExampleService>) {

    const value = props.value;
    const config = props.config;
    const updateValue = props.updateValue;
    const updateConfig = props.updateConfig;
    const service = props.appService;

    const onClick = () => {
        updateValue('some value');
    }

    return (
        <div className="my-example-editor">
            <div className="current value">{value}</div>
            <button onClick={onClick}>Click me</button>
        </div>
    );
}