import { ListingType } from './types';
import { InformationMessage } from '../components';

interface RentalListingProps {
    listings: ListingType[];
}


function RentalListing(props: RentalListingProps): JSX.Element {
    const { listings } = props;
    if (listings.length === 0) {
        return (<div className="flex justify-center items-center">
            <InformationMessage
                title="No results found"
                message='Try searching for "Trailer" or "Camper"'
            /></div>);
    }

    return <div className="flex justify-center items-center">
        <ul className="max-w-md divide-y divide-gray-200">
            {listings.map((listing) => (
                <li key={listing.id} className="flex items-center py-4">
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