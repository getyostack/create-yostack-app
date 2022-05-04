import React from "react";
import {BaseComponentProps} from "@yostack/sdk-frontend-react";

interface Props extends BaseComponentProps {
    title: string;
    showDetails: boolean;
    level: string;
    myCustomEditorValue: string;
}

export const ExampleComponent: React.FC<Props> = (props) => {
    const {title, showDetails} = props;

    // The outer tag should always apply the extra element props, as shown below.
    // This will add attributes, such as [data-cid], which are important for the
    // admin content editor and other functionality.
    return (
        <div {...props.$extra?.elProps('my-example-component-class')}>
            <h3>{{appName}} example component</h3>
            <h4>{title}</h4>
            {showDetails &&
                <div className="my-example-details">
                    Showing details
                </div>
            }
        </div>
    );
}