import {Category, DataService, EcommerceService, Product} from "@yostack/sdk-app-react";

export class ExampleService implements DataService, EcommerceService {

    private apiBaseUrl = 'https://api.example.com';
    private headers: {[key: string]: string};

    constructor(
        private accountId: string,
        private accessToken: string
    ) {
        this.headers = {
            'X-Auth-Token': accessToken,
            'X-Account-ID': accountId,
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
        };
    }

    /**
     * Finds data from the given data collection using the given query.
     *
     * @param collection The data collection to retrieve data from.
     * @param query The query to use to filter data.
     * @returns The data.
     */
    async findData(collection: string, query: string): Promise<any> {
        return await fetch(`${this.apiBaseUrl}/${collection}?query=${query}`, {headers: this.headers})
            .then(res => res.json())
            .then(res => res.data)
    }

    /**
     * Finds a single product by ID.
     *
     * @param id The product ID.
     * @returns The product.
     */
    async findProductById(id: string): Promise<Product> {
        return await fetch(`${this.apiBaseUrl}/products/${id}`, {headers: this.headers})
            .then(res => res.json())
            .then(res => res.data)
            .then(this.transformProductData);
    }

    /**
     * Searches products using the given search keyword.
     *
     * @param search The search keyword.
     * @returns The products matching the search.
     */
    async searchProducts(search: string): Promise<Product[]> {
        const queryParams = '?limit=100' + (search ? `&search-term=${search}` : '');
        return await fetch(`${this.apiBaseUrl}/products${queryParams}`, { headers: this.headers,})
            .then(res => res.json())
            .then(res => res.products.map(this.transformProductData));
    }

    /**
     * Finds a single category by ID.
     *
     * @param id The category ID.
     * @returns The category.
     */
    async findCategoryById(id: string): Promise<Category> {
        return await fetch(`${this.apiBaseUrl}/categories/${id}`, { headers: this.headers })
            .then(res => res.json())
            .then(res => res.data)
            .then(this.transformCategoryData);
    }

    /**
     * Searches categories using the given search keyword.
     *
     * @param search The search keyword.
     * @returns The categories matching the search.
     */
    async searchCategories(search: string): Promise<Category[]> {
        const queryParams = '?limit=100' + (search ? `&search-term=${search}` : '');
        return await fetch(`${this.apiBaseUrl}/categories${queryParams}`, { headers: this.headers,})
            .then(res => res.json())
            .then(res => res.categories.map(this.transformCategoryData));
    }

    private transformProductData(data: any) {
        // TODO Transform the data returned from your product API to match the expected
        //      return format of the Product interface.
        return data;
    }

    private transformCategoryData(data: any) {
        // TODO Transform the data returned from your category API to match the expected
        //      return format of the Category interface.
        return data;
    }

}