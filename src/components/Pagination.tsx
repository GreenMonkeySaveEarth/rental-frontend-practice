import { useQueryContext } from "../hooks/queryContext/context";
import { PAGINATION_BASE } from "../constants";
import { useEffect, useState } from "react";
interface PaginationProps {
    show: boolean;
}

function Pagination(props: PaginationProps): JSX.Element {
    const BASE_COUNT = 1;
    const { show } = props;
    const { limit, offset, total, setOffset } = useQueryContext();
    const [start, setStart] = useState(BASE_COUNT);
    const [end, setEnd] = useState(PAGINATION_BASE);

    useEffect(() => {
        setStart(offset + BASE_COUNT);
        setEnd(Math.min(offset+limit, total));
    }, [offset, total, limit]);

    useEffect(() => {
        if (total === 0) {
            setStart(total);
        }
    }  , [total])

    const handleForwardClick = () => {
        const newValue = offset + PAGINATION_BASE;
        if (newValue < total) {
            setOffset(newValue)
        }
    }
    const handleBackwardClick = () => {
        const newValue = offset - PAGINATION_BASE;
        if (newValue > 0) {
            setOffset(newValue)
            setStart(newValue)
        }
        if (newValue <= 0) {
            setStart(BASE_COUNT)
        }
    }
    if (!show) {
        return <></>;
    }
    return (        
        <div className="flex flex-col items-center py-20">
            <span className="text-sm text-gray-700">
                Showing <span className="font-semibold text-gray-900 ">{start}</span> to <span className="font-semibold text-gray-900">{end}</span> of <span className="font-semibold text-gray-900">{total}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    type="button"
                    tabIndex={0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={handleBackwardClick}
                    disabled={start === BASE_COUNT}
                >
                    Prev
                </button>
                <button
                    type="button"
                    tabIndex={0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={handleForwardClick}
                    disabled={offset + limit > total}
                >
                    Next
                </button>
            </div>
        </div>

    )

}

export default Pagination;