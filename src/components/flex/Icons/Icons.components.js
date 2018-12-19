import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Theme } from '../theme'; 

export const Icon = (props) => {
    return <i className={`icon-${props.name}`} />;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired
};

export const HamClose = styled.svg`
    width: ${props => props.fontSize };
    display: inline-block;

    & .liner{
        fill: none;
        stroke: ${props => props.color};
        stroke-width: 30;
        stroke-linecap: round;
        stroke-linejoin:round;
        stroke-miterlimit:10;
        stroke-dasharray: 240 1000;
        stroke-dashoffset: -292;
        transition: all ${props => props.timing + 0.1}s ease-in ${props => props.delay}s;
    }
    & .line{
        fill: none;
        stroke: ${props => props.color};
        stroke-width: 30;
        stroke-linecap: round;
        stroke-linejoin:round;
        stroke-miterlimit:15;
        stroke-dasharray: 216 217;
        stroke-dashoffset: 0;
        transition: all ${props => props.timing}s ease-in ${props => props.delay + 0.1}s;
    }

    ${ props=> props.open && css`
        & .liner{
            stroke-dasharray: 230 1000;
            stroke-dashoffset: -30;
        }
        & .line{
            stroke-dasharray: 0 217;
            stroke-dashoffset: -110;
        }
    `}
`;


export const HamburgerClose = (props) => { 
    return (
        <HamClose x="0px" y="0px" viewBox="0 0 256 256" {...props}>
            <polyline className="liner" points="235.57,227 19.03,31 235.57,31 " />
            <polyline className="liner" points="235.57,34 19.03,230 235.57,230 " />
            <line className="line" x1="19.03" y1="131.37" x2="233.04" y2="131.37" />
          </HamClose>  
    )
}


HamburgerClose.defaultProps = {
    color: Theme.PrimaryFontColor,
    fontSize: '20px',
    open: false,
    timing: 0.2,
    delay: 0
};

HamburgerClose.propTypes = {
    fontSize: PropTypes.string,
    color: PropTypes.string,
    open: PropTypes.bool,
    timing: PropTypes.number,
    delay: PropTypes.number
};

