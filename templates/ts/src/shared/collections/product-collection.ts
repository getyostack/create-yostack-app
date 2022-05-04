import {ImageAssetConfig} from "@yostack/sdk-frontend-react";
import {DataCollectionSchema} from "@yostack/sdk-admin-react";

export interface MyExampleProduct {
    id: string;
    title: string;
    price: number;
    mainImage: string | ImageAssetConfig | ImageAssetConfig[];
}

export const MyExampleProductCollectionSchema: DataCollectionSchema = {
    $id: 'products',
    title: 'Products',
    type: 'array',
    items: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        mainImage: {
            type: 'image'
        }
    }
};