import { useState, useEffect } from "react";
import { useQueryContext } from "../hooks/queryContext/context";

function SearchInput() {
    const { keyword, setOffset, setKeyword } = useQueryContext();
    const [keywordChange, setKeywordChange] = useState(false);

    useEffect(() => {
        if (keywordChange) {
            setOffset(0);
            setKeywordChange(false);
        }
    }, [keywordChange])

    return <div className="flex justify-center items-center">
        <div className="max-w-lg  py-16 w-full">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                    setKeywordChange(true);
                }}
                placeholder="Enter keywords" />
        </div>
    </div>;
}

export default SearchInput;