import styled from "styled-components";

export const Page = styled.div`
    border: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .pagination {
            display: flex;
            list-style: none;
        }

        .pagination li + li {
            margin-left: 1rem;
        }

        .pagination__item--active {
            background: none;
            font-weight: bold;
            border: none;
            color: purple;
        }

        .pagination__item--active:focus {
            outline: none;
            color: orange;
        }

        button {
            background-color: transparent;
            border: 0;
            font-size: 16px;
        }
`; 