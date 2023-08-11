import styled from "styled-components";

export const Loading = styled.div`
    border: 4px solid #F2F2F2;
    border-top: 4px, solid #B2B2B2;
    border-radius: 50%;
    width: 30px;
    height:30px;
    animation: spin 2s linear infinite;
    display: flex;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

`