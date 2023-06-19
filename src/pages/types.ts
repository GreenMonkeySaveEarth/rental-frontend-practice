export interface ListingType {
    id: string;
    name: string;
    imageUrl: string;
}

export interface RentalListingType {
    id: string;
    attributes: {
        name: string;
    };
    relationships: {
        primary_image: {
            data: {
                id: string;
                included: boolean;
            };
        };
    };
}

export interface ListingResponseType {
    data: RentalListingType[];
    included: { 
        id: string; 
        type: string; 
        attributes: { 
            url: string 
        } 
    }[];
    meta: {
        total: number;
    }
}
