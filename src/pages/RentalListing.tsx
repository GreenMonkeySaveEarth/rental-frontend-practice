import { ListingType } from './types';
import { InformationMessage } from '../components';

interface RentalListingProps {
    listings: ListingType[];
    loading: boolean;
}


function RentalListing(props: RentalListingProps): JSX.Element {
    const { listings, loading } = props;

    if (!loading && listings.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <InformationMessage
                    title="No results found"
                    message='Try searching for "Trailer" or "Camper"'
                />
            </div>
        );
    }

    return <div className="flex justify-center items-center px-4" aria-label="Search result of rental listing">
        <ul className="max-w-lg divide-y divide-gray-200">
            {listings.map((listing) => (
                <li key={listing.id} className="flex items-center py-4" aria-label={listing.name} tabIndex={0}>
                    <div className="flex items-center space-x-6">
                        <img src={listing.imageUrl} alt={listing.name} className="w-24 h-24 rounded-md" />
                        <span className="ml-4 text-left">{listing.name}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>;
}

export default RentalListing;