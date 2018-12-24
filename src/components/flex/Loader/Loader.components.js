import styled, { css } from 'styled-components';
import React from 'react';
import { Theme } from '../theme';


export const Spinner = styled.div`
    width: 66px;
    height: 66px;
    margin: 10% auto;
    -webkit-animation: contanim 2s linear infinite;
        animation: contanim 2s linear infinite;

    ${props => props.absolute && css`
        position: fixed;
        left: calc(50% - 33px);
        top: calc(50% - 33px);
        z-index: 2000;
    `}
`;

export const Svg = styled.svg`
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    -webkit-transform: rotate(-90deg);
            transform: rotate(-90deg);

    &:nth-child(1) circle {
        stroke: ${Theme.PrimaryMint};
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
        -webkit-animation: strokeanim 3s calc(.2s * (1)) ease infinite;
                animation: strokeanim 3s calc(.2s * (1)) ease infinite;
        -webkit-transform-origin: center center;
                transform-origin: center center;
    }

    &:nth-child(2) circle {
        stroke: ${Theme.PrimaryBlue};
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
        -webkit-animation: strokeanim 3s calc(.2s * (2)) ease infinite;
                animation: strokeanim 3s calc(.2s * (2)) ease infinite;
        -webkit-transform-origin: center center;
                transform-origin: center center;
    }

    &:nth-child(3) circle {
        stroke: ${Theme.PrimaryOrange};
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
        -webkit-animation: strokeanim 3s calc(.2s * (3)) ease infinite;
                animation: strokeanim 3s calc(.2s * (3)) ease infinite;
        -webkit-transform-origin: center center;
                transform-origin: center center;
    }

    &:nth-child(4) circle {
        stroke: ${Theme.PrimaryFontColor};
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
        -webkit-animation: strokeanim 3s calc(.2s * (4)) ease infinite;
                animation: strokeanim 3s calc(.2s * (4)) ease infinite;
        -webkit-transform-origin: center center;
                transform-origin: center center;
    }

    @-webkit-keyframes strokeanim {
        0% {
            stroke-dasharray: 1, 300;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -58.548324585;
        }
        100% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -175.6449737549;
        }
    }

    @keyframes strokeanim {
        0% {
            stroke-dasharray: 1, 300;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -58.548324585;
        }
        100% {
            stroke-dasharray: 120, 300;
            stroke-dashoffset: -175.6449737549;
        }
    }
    @-webkit-keyframes contanim {
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }
    @keyframes contanim {
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }
`;

export class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Spinner>
                <Svg viewBox="0 0 66 66">
                    <circle class="length" fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>
                </Svg>
                <Svg viewBox="0 0 66 66">
                    <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>
                </Svg>
                <Svg viewBox="0 0 66 66">
                    <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>
                </Svg>
                <Svg viewBox="0 0 66 66">
                    <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>
                </Svg>
            </Spinner>
        )
    }
}