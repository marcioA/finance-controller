import styled from "styled-components";

export const Overlay = styled.div`
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    textalign: center;
    fontsize: 1.2em;
    color: #fff;
    background: rgba(0,0,0,0.7);
    z-index: 800;
    transition: opacity 2s;
    opacity: 1;
`; 