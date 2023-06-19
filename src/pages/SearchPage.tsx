import React, { useState, useEffect, useRef } from "react";
import RentalListing from "./RentalListing";
import {Pagination} from "../components";
import { ListingType, ListingResponseType, RentalListingType } from "./types";
import  { useQueryContext } from "../hooks/queryContext/context";


const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

const SearchPage: React.FC = () => {
    const [keyword, setKeyword] = useState("");
    const [listings, setListings] = useState<ListingType[]>([]);
    const { limit, offset, setOffset, setTotal } = useQueryContext();
    const [keywordChange, setKeywordChange] = useState(false);
    
    useEffect(() => {
        if (keywordChange) {
            setOffset(0);
            setKeywordChange(false);
        }
    }, [keywordChange])
    
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
            <div className="flex justify-center items-center">
                <div className="max-w-lg  py-16 w-full">
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="text"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                            setKeywordChange(true)
                        }}
                        placeholder="Enter keywords"
                    />
                </div>
            </div>
            <RentalListing listings={listings} />
            <Pagination />
        </>
    );
};

export default SearchPage;


