import React, { useState, useEffect } from "react";
import RentalListing from "./RentalListing";
import { Pagination, SearchBar } from "../components";
import { ListingType, ListingResponseType, RentalListingType } from "./types";
import { useQueryContext } from "../hooks/queryContext/context";

const SearchPage: React.FC = () => {
    const [listings, setListings] = useState<ListingType[]>([]);
    const [showPagination, setShowPagination] = useState<boolean>(false);
    const { keyword, limit, offset, setTotal } = useQueryContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://search.outdoorsy.com/rentals?filter[keywords]=${keyword}&page[limit]=${limit}&page[offset]=${offset}`
                );
                const data: ListingResponseType = await response.json();
                const listings = data.data.map((listing: RentalListingType) => ({
                    id: listing.id,
                    name: listing.attributes.name,
                    imageUrl: getImageUrl(listing.relationships.primary_image.data.id, data.included),
                }));
                setTotal(data.meta.total)
                setListings(listings);
                setShowPagination(true);
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        fetchData();
    }, [keyword, limit, offset]);

    const getImageUrl = (id: string, included: ListingResponseType["included"]) => {
        const image = included.find((item) => item.id === id && item.type === "images");
        return image?.attributes.url || "";
    };


    return (
        <>
            <h2 className="text-4xl font-extrabold px-4 py-8">Outdoorsy Homework Assignment</h2>
            <SearchBar />
            <RentalListing listings={listings} />
            <Pagination show={showPagination} />
            
        </>
    );
};

export default SearchPage;



