import React from "react";
import {BaseComponentProps} from "@yostack/sdk-frontend-react";

interface Props extends BaseComponentProps {
    title: string;
    showDetails: boolean;
    level: string;
    myCustomEditorValue: string;
}

export const ExampleComponent: React.FC<Props> = (props) => {

    // props contains the component configuration
    const title = props.title;
    const showDetails = props.showDetails;

    return (
        <div {...props.$extra?.elProps('my-example-component-class')}>
            <h3>{{appName}} example component</h3>
            <h4>{title}</h4>
            {showDetails ? (
                <div className="my-example-details">
                    Showing details
                </div>
            ) : null}
        </div>
    );
}