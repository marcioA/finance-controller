import styled from "styled-components";

export const Container = styled.div`
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    strong {
        display: block;
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: normal;
        line-height: 3rem;
    }

    &.highlight-background {
        background: var(--green);
        color: #FFF;
    }
`;