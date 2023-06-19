import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PAGINATION_BASE } from '../../constants';
interface QueryContextProps {
    limit: number;
    offset: number;
    total: number;
    keyword: string;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

type ChildrenProps = {
    children: ReactNode
}

export const QueryContext = createContext<QueryContextProps | null>(null);

export const QueryProvider: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const [limit, setLimit] = useState(PAGINATION_BASE);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState("");

    return (
        <QueryContext.Provider value={{ limit: limit, offset: offset, total: total, keyword: keyword, setLimit: setLimit, setOffset: setOffset, setTotal: setTotal, setKeyword: setKeyword }}>
            {children}
        </QueryContext.Provider>
    );
};

export const useQueryContext = (): QueryContextProps => {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useQuery must be used within a QeuryProvider");
    }
    return context
};


