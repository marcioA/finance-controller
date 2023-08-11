import React, { useState } from 'react';
import { Page } from './styles';

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1 ) / 2;

interface PageConfig {
    limit: number,
    total: number,
    offset: number,
    setOffset: (pg: number) => void
}

type page = number;
type current = number;
type first = number;

const Pagination = ( {limit, total, offset, setOffset}: PageConfig ) =>{
    const current = offset ? (offset / limit) + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - MAX_LEFT, 1);

    function onPageChange(page: number) {
        setOffset((page - 1) * limit);
    }

    return (
        <Page>
            <ul className="pagination">
                <li>
                    <button
                    onClick={() => onPageChange(current - 1)}
                    // disabled={current === 1}
                    >
                    Anterior
                    </button>
                </li>
                {Array.from({ length: Math.min(MAX_ITEMS, pages) })
                    .map((_, index) => index + first)
                    .map((page) => (
                    <li key={page}>
                        <button
                        onClick={() => onPageChange(page)}
                        className={
                            page === current
                            ? 'pagination__item--active'
                            : ''
                        }
                        >
                        {page}
                        </button>
                    </li>
                    ))}
                <li>
                    <button
                    // onClick={() => onPageChange(current + 1)}
                    // disabled={current === pages}
                    >
                    Próxima
                    </button>
                </li>
                </ul>
        </Page>
    )    
}

export default Pagination;