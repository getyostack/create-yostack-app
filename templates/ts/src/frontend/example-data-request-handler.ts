import {
    DataRequestHandlerFn,
    AppContext,
    PagedResult,
    DataRequestOptions,
    DataRequestResult
} from '@yostack/sdk-frontend-react';
import {MyExampleProduct} from "../shared/collections/product-collection";

export const ExampleDataRequestHandler: DataRequestHandlerFn = async (collectionId: string,
         options: DataRequestOptions, appContext: AppContext): Promise<DataRequestResult> => {

    // You can use settings and passed in query, sort, page, pageSize to build your API request
    const {accountId, accessToken} = appContext.settings;
    const {query, sort, page, pageSize} = options;

    const isPagedData = false;

    // The data would typically be retrieved from an API and might need to be transformed to
    // match the expected return format. The returned data must match the schema registered
    // in the admin. We can return an array of items or a paged result.
    const items: MyExampleProduct[] = [
        {
            id: 'p1',
            title: 'Product 1',
            price: 49.99,
            mainImage: 'https://cdn.example.com/p1-image.jpg'
        },
        {
            id: 'p2',
            title: 'Product 2',
            price: 99.00,
            mainImage: {
                url: 'https://cdn.example.com/p2-image.jpg',
                //srcset: '', // even better if you can provide srcset and sizes to serve optimal image sizes
                //sizes: '',
                width: 1500,
                height: 2000,
                altText: 'Product 2'
            }
        }
    ];

    if (!isPagedData) {
        return items;
    }

    const pagedResult: PagedResult = {
        results: items,
        // The page info would typically be provided based on info from the API response
        page: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 2,
            pageSize: 20
        }
    };

    return pagedResult;
}