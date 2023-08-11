import styled from "styled-components";

export const Container = styled.div`
    margin-top: 4rem;
    table{ 
        width: 100%;
        border-spacing: 0 0.5rem;
       
        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;
       
            &::first-child {
                color: var(--text-title);
            }
    
            &.deposit {
                color: var(--green);
            }
    
            &.withdraw {
                color: var(--red);
            }

            button {
                background-color: transparent;
                border: none;

                img{
                    filter: invert(20%) sepia(50%) saturate(30000%) hue-rotate(5deg) brightness(100%) contrast(100%);
                }
            }
        }

    }

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .searchTransaction {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        width: 100%;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        color: '#CDD2D7';
        background: '#B2BAC2';
        border: 1px solid '#2D3843';
        border-radius: 8px;
        padding: 12px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    
        &:hover {
        background: '#E7EBF0';
        border-color: '#3E5060';
        }
    
        &:focus {
        outline: 3px solid '#6F7E8C';
        }
    }
`; 