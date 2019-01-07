import styled, { css, keyframes } from 'styled-components';
import { Theme } from '../theme';
import PropTypes from 'prop-types';
import { darken, lighten, desaturate } from 'polished';

export const Button = styled.button`
    display: inline-block;
    height: 44px;
    padding: 12px 22px;
    font-size: ${Theme.PrimaryFontSize};
    line-height: 20px;
    background-color: ${props => props.color ? props.color : Theme.PrimaryColor};
    border-radius:  ${props => props.rounded ? "22px" : Theme.PrimaryRadius};
    color: #fff;
    border: none;
    text-align:center;
    cursor: pointer;
    transition: ${Theme.PrimaryTransition};

    &+button{
        margin-left: 10px;
    }

    & svg, i{
        display:inline-block;
        margin: 0;
        padding: 0;
    }

    ${props => props.icon && css`
        padding: 12px 12px;
        min-width: 44px;
    `} 
    ${props => props.iconLeft && css`
            & i{
                margin-left: -8px;
                padding-right: 10px;
            }
        `}
    ${props => props.iconRight && css`
            & i{
                padding-left: 10px;
                margin-right: -8px;
            }
    `}
    ${props => props.margin && css`
        margin: ${props => props.margin};
    `} 
    ${props => props.width && css`
        min-width: ${props => props.width};
    `} 

    &:hover{
        background-color: ${props => props.color ? darken(0.1, props.color) : darken(0.1, Theme.PrimaryColor)};
    }
    &:active{
            outline: none;
    }
    &:focus{
        outline: none;
    }
    ${props => props.disabled && css`
        color: ${props => props.color ? desaturate(0.9, lighten(0.1, props.color)) : desaturate(0.9, lighten(0.1, Theme.PrimaryColor))};
        background-color: ${props => props.color ? desaturate(0.7, lighten(0.35, props.color)) : desaturate(0.7, lighten(0.35, Theme.PrimaryColor))};
        &:hover{
        color: ${props => props.color ? desaturate(0.9, lighten(0.1, props.color)) : desaturate(0.9, lighten(0.1, Theme.PrimaryColor))};
        background-color: ${props => props.color ? desaturate(0.7, lighten(0.35, props.color)) : desaturate(0.7, lighten(0.35, Theme.PrimaryColor))}; 
        }
    `}
    ${props => props.progress && css`
        position: relative;
        overflow: hidden;
        background:  none;
        z-index: 1;
        &:after{
            content: '';
            display: block;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            right: 0;
            background-color: ${props => props.color ? darken(0.07, props.color) : darken(0.07, Theme.PrimaryColor)};
            animation: ${InProgress} 1.2s ease-in-out alternate both infinite;
            z-index: -1;
        }
        &:before{
            content: '';
            display: block;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            right: 0;
            background-color: ${props => props.color ? props.color : Theme.PrimaryColor};
            z-index: -2;
        }
        &:hover{
            background: none;
        }
    `}
`;

const InProgress = keyframes`
  to {
    width: 0%;
  }
`;

export const PaleButton = styled.button`
    display: inline-block;
    box-sizing: border-box;
    height: 44px;
    padding: 11px 22px;
    font-size: ${Theme.PrimaryFontSize};
    line-height: 20px;
    border-radius:  ${props => props.rounded ? "22px" : Theme.PrimaryRadius};
    text-align:center;
    cursor: pointer;
    transition: ${Theme.PrimaryTransition};
    background: none;
    border: 1px solid ${props => props.color ? props.color : Theme.PrimaryColor};
    color: ${props => props.color ? props.color : Theme.PrimaryColor};

    &+button{
        margin-left: 10px;
    }
    
    ${props => props.margin && css`
        margin: ${props => props.margin};
    `} 
    ${props => props.width && css`
        min-width: ${props => props.width};
    `} 
    ${props => props.small && css`
        height: 30px;
        padding: 6px 14px;
        line-height: 16px;
    `} 

    ${props => props.icon && css`
        padding: 11px 11px;
        min-width: 44px;
    `} 
    ${props => props.iconLeft && css`
            & i{
                margin-left: -8px;
                margin-right: 10px;
            }
        `}
    ${props => props.iconRight && css`
            & i{
                margin-left: 10px;
                margin-right: -8px;
            }
    `}

    &:hover{
        background-color: ${props => props.color ? lighten(0.4, props.color) : lighten(0.4, Theme.PrimaryColor)};
    }
    &:active{
            outline: none;
    }
    &:focus{
        outline: none;
    }
    ${props => props.disabled && css`
        color: ${props => props.color ? desaturate(0.9, lighten(0.1, props.color)) : desaturate(0.9, lighten(0.1, Theme.PrimaryColor))};
        border-color: ${props => props.color ? desaturate(0.7, lighten(0.35, props.color)) : desaturate(0.7, lighten(0.35, Theme.PrimaryColor))};
        &:hover{
        color: ${props => props.color ? desaturate(0.9, lighten(0.1, props.color)) : desaturate(0.9, lighten(0.1, Theme.PrimaryColor))};
        border-color: ${props => props.color ? desaturate(0.7, lighten(0.35, props.color)) : desaturate(0.7, lighten(0.35, Theme.PrimaryColor))}; 
        background:none;
        }
    `}
    ${props => props.progress && css`
        position: relative;
        overflow: hidden;
        &:after{
            content: '';
            display: block;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            right: 0;
            background-color: ${props => props.color ? lighten(0.47, props.color) : lighten(0.47, Theme.PrimaryColor)};
            animation: ${InProgress} 1.2s ease-in-out alternate both infinite;
            z-index: -1;
        }
        
        &:hover{
            background: none;
        }
    `}
`;

Button.propTypes = {
    icon: PropTypes.bool
};