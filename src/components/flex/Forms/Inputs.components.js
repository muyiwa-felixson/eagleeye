import styled, { css } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Theme } from '../theme';
import { lighten, transparentize, darken } from 'polished';
import { Label } from '../Typography/Typography.components';


import "react-datepicker/dist/react-datepicker.css";

// const SearchInput = styled.input.attrs({
//     type: "password"
// })`

// `;

export const InputWrapper = styled.div`
    display: inline-block;
    width: 100%;
    font-size: ${Theme.PrimaryFontSize};
    background: #fff;
    position: relative;
    transition: ${Theme.PrimaryTransition};
    ${props => props.forminput && css`
        margin-bottom: 15px;
        margin-top: 10px;
    `}
    &:after{
        display:none;
    }
    ${props => props.required && css`
        &:after{
            font-family: 'flexisaf';
            content: '\\e822';
            display:block;
            position: absolute;
            top: -5px;
            left: -5px;
            height: 10px;
            width: 10px;
            color: ${Theme.PrimaryRed};
            z-index: 2;
            font-size: 10px;
        }
    `}

    & textarea{
        box-sizing: border-box;
        border:none;
        height: 80px;
        background: none;
        padding: 10px;
        line-height: 22px;
        display: block;
        width: 100%;
        position: relative;
        border-radius: ${Theme.PrimaryRadius};
        border: 1px solid ${lighten(0.6, Theme.PrimaryFontColor)};
        z-index:2;
        font-size: ${Theme.PrimaryFontSize};
        transition: ${Theme.PrimaryTransition};
        ${props => (props.type === 'number' || props.type === 'phone') && css`
            -moz-appearance: textfield;
            appearance: textfield;
            margin: 0;
            &::-webkit-inner-spin-button {
            opacity: 0;
            display: none;
            }
        `}
        &:disabled{
            border: 1px solid ${lighten(0.67, Theme.PrimaryFontColor)};
            background: ${lighten(0.7, Theme.PrimaryFontColor)};
            color: ${lighten(0.5, Theme.PrimaryFontColor)};
        }
        &:disabled::placeholder{
            color: ${lighten(0.5, Theme.PrimaryFontColor)};
        }
        &:focus{
            outline: none;
            border: 1px solid ${Theme.PrimaryBlue};
            box-shadow: none;
        }
        &:focus:hover{
            border-width: 2px;
            box-shadow: none;
            padding: 9px;
        }
        ${props => props.error && css`
            border: 1px solid ${lighten(0.15, Theme.PrimaryRed)};
        `}
    }

    & input{
        box-sizing: border-box;
        border:none;
        height: 44px;
        background: none;
        padding: 10px;
        line-height: 22px;
        display: block;
        width: 100%;
        position: relative;
        border-radius: ${Theme.PrimaryRadius};
        border: 1px solid ${lighten(0.6, Theme.PrimaryFontColor)};
        z-index:2;
        font-size: ${Theme.PrimaryFontSize};
        transition: ${Theme.PrimaryTransition};
        ${props => (props.type === 'number' || props.type === 'phone') && css`
            -moz-appearance: textfield;
            appearance: textfield;
            margin: 0;
            &::-webkit-inner-spin-button {
            opacity: 0;
            display: none;
            }
        `}
        &:disabled{
            border: 1px solid ${lighten(0.67, Theme.PrimaryFontColor)};
            background: ${lighten(0.7, Theme.PrimaryFontColor)};
            color: ${lighten(0.5, Theme.PrimaryFontColor)};
        }
        &:disabled::placeholder{
            color: ${lighten(0.5, Theme.PrimaryFontColor)};
        }
        &:focus{
            outline: none;
            border: 1px solid ${Theme.PrimaryBlue};
            box-shadow: none;
        }
        &:focus:hover{
            border-width: 2px;
            box-shadow: none;
            padding: 9px;
        }
        ${props => props.error && css`
            border: 1px solid ${lighten(0.15, Theme.PrimaryRed)};
        `}
    }
    & em{
        display: inline-block;
        position: absolute;
        bottom: -15px;
        right: 0;
        font-style: italic;
        font-size: 0.8em;
    }
    &:before{
        font-family: 'flexisaf';
        ${props => props.type === 'search' && css`
            content: '\\e803';
        `}
        ${props => props.type === 'phone' && css`
            content: '\\e820';
        `}
        ${props => props.type === 'password' && css`
            content: '\\f13e';
        `}
        ${props => props.type === 'number' && css`
            content: '\\e81e';
        `}
        ${props => props.type === 'text' && css`
            content: '\\e81f';
        `}
        ${props => props.type === 'email' && css`
            content: '\\f2b7';
        `}
        
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        top: 0px;
        right: 0px;
        height: 44px;
        position: absolute;
        z-index: 1;
        width: 36px;
        color: ${lighten(0.3, Theme.PrimaryFontColor)};
    }
    & span{
        position: absolute;
        top: -15px;
        left:2px;
        color: ${transparentize(0.3, Theme.PrimaryFontColor)};
        font-size: 0.8em;
        font-weight: bold;
        letter-spacing: 1px;
    }
    & .flexisaf__control{
        border: none;
        height: 44px;
        border-radius: ${Theme.PrimaryRadius};
        border: 1px solid ${lighten(0.6, Theme.PrimaryFontColor)};
        font-size: ${Theme.PrimaryFontSize};
        ${props => props.error && css`
            border: 1px solid ${lighten(0.15, Theme.PrimaryRed)};
        `}
    }
    & .flexisaf__indicators{
        & span{
            display: none;
        }
    }
    & .flexisaf__menu{
        overflow: hidden;
        background: ${darken(0.1, Theme.PrimaryGreyDark)};
        border-radius: ${Theme.PrimaryRadius};
        color: #fff;
        border: none;
        z-index: 500;

        & .flexisaf__menu-list{
            margin:0;
            padding:0;
            & .flexisaf__option{
                &:hover{
                    background: ${Theme.PrimaryGreyDark};
                }
                &.flexisaf__option--is-focused{
                    background: ${transparentize(0.6, Theme.PrimaryGreyDark)};
                }
                &.flexisaf__option--is-selected{
                    background: ${darken(0.2, Theme.PrimaryColor)};
                }   
            }
        }
    }
    & .react-datepicker-wrapper{
        display: block;
    }
    & .react-datepicker__input-container{
        display: block;
    }
    & .react-datepicker-popper{
        z-index: 2000;
    }
`;

export class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <InputWrapper {...this.props}>
                {this.props.label && <Label>{this.props.label}</Label>}
                <input
                    {...this.props}
                    type={this.props.type === 'phone' ? 'number' : this.props.type}
                    forminput={undefined}
                />
                {this.props.error && <em>{this.props.error}</em>}
            </InputWrapper>
        )
    }
}

Input.defaultProps = {
    forminput: false,
};

Input.propTypes = {
    forminput: PropTypes.bool
};

export class TextArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <InputWrapper {...this.props}>
                {this.props.label && <Label>{this.props.label}</Label>}
                <textarea
                    {...this.props}
                />
                {this.props.error && <em>{this.props.error}</em>}
            </InputWrapper>
        )
    }
}

TextArea.defaultProps = {
    forminput: false,
};

TextArea.propTypes = {
    forminput: PropTypes.bool
};


