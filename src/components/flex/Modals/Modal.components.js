import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken, transparentize, lighten } from 'polished';
import { Theme, media } from '../theme';
import { Button, PaleButton } from '../';


let DefaultProps = {
    backDropOpacity: 0.8,
    position: "fixed",
    backDropColor: Theme.PrimaryDark,
    color: Theme.PrimaryColor,
    width: '600px'
}
export const ModalContainer = styled.div`
    position: ${DefaultProps.position};
    top:0;
    left:0;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    display: none;
    -webkit-font-smoothing: antialiased;
    color: ${Theme.PrimaryFontColor};
    overflow: scroll;
    ${props => props.open && css`
        display: block;
    `}
    background: ${props => transparentize(props.backDropOpacity ? props.backDropOpacity : DefaultProps.backDropOpacity, darken(0.3, props.backDropColor ? props.backDropColor : DefaultProps.backDropColor))};

    & >div{
    min-height: 100%;
    width: 100%;
    resize: vertical;
    /* flex-wrap: wrap; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    }
`;

export const ModalBody = styled.div`
    width: ${props => props.width ? props.width : DefaultProps.width};
    ${media.phone` width: 90%;`}
    background: #fff;
    box-shadow: 0 10px 35px ${transparentize(0.9, Theme.PrimaryDark)};
    position: relative;
    margin:3vh;
    border-radius: ${Theme.PrimaryRadius};
    /* transition: all 0.1s ease-out; */

    /* ${props => props.error && css`
        border-top: 3px solid ${Theme.PrimaryRed};
    `}
    ${props => props.information && css`
        border-top: 3px solid ${Theme.PrimaryGreen};
    `} */
    /* border-top: 3px solid ${props => props.color ? props.color : DefaultProps.color}; */
    ${props => props.fluid && css`
        width: 95%;
        min-height: 94vh;
        padding-bottom: 80px;

        ${ModalFooter}{
            position: absolute;
            width: 100%;
            bottom: 0;
            left:0;
        }
    `}
    ${props => props.expand && css`
        width: 100%;
        min-height: 100vh;
        padding-bottom: 80px;
        margin:0;

        ${ModalFooter}{
            position: absolute;
            width: 100%;
            bottom: 0;
            left:0;
        }
    `}
`;

const ModalExpand = styled.div`
    position: absolute;
    height: 30px;
    width: 30px;
    top: 5px;
    right: 45px;
    text-align: center;
    padding: 8px;
    font-size: 14px;
    line-height: 14px;
    border-radius: 2px;
    transition: ${Theme.PrimaryTransition};
    cursor:pointer;
    color: ${transparentize(0.2, Theme.PrimaryColor)};
    &:after{
        font-family: 'flexisaf';
        content: '\\e80e';
        ${props => props.expanded && css`
            content: '\\e80d';
        `}
    }
    &:hover{
        color: ${Theme.PrimaryFontColor};
    }
`;
export const ModalClose = styled.div`
    position: absolute;
    height: 30px;
    width: 30px;
    top: 5px;
    right: 10px;
    text-align: center;
    padding: 9px;
    font-size: 18px;
    font-weight: lighter;
    line-height: 12px;
    border-radius: 2px;
    transition: ${Theme.PrimaryTransition};
    cursor:pointer;
    color: ${transparentize(0.6, Theme.PrimaryFontColor)};
    &:after{
        font-family: 'flexisaf';
        content: '\\e80c';
    }
    &:hover{
        color: ${Theme.PrimaryFontColor};
    }
`;

export const ModalTitle = styled.div`
    padding: 0;
    font-family: ${Theme.SecondaryFont};
    font-size:  20px;
    margin: 30px 30px 0 30px;
    position: relative;
    font-weight: bold;

    ${props => props.subTitle && css`
        &:before{
            content: '${props => props.subTitle}';
            display: block;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: normal;
            opacity: 0.6;
        }
    `}
`;

export const ModalContent = styled.div`
    /* font-family: ${Theme.PrimaryFont}; */
    /* font-size: ${Theme.PrimaryFontSize}; */
    margin: 20px 30px 30px 30px;
`;

export const ModalFooter = styled.div`
    padding: 20px 30px;
    /* background: ${transparentize(0.9, Theme.PrimaryDark)}; */
    background: ${props => transparentize(0.9, darken(0.3, props.color ? props.color : Theme.PrimaryColor))};
    text-align: right;
    text-transform: uppercase;

    ${Button}{
        text-transform: uppercase;
        margin-left: 5px;
        ${props => props.color && css`
            background-color: ${props => props.color};
        `}
    }
    ${PaleButton}{
        text-transform: uppercase;
        margin-left: 5px;
        ${props => props.color && css`
            color: ${props => props.color};
            border-color: ${props => props.color};
        `}
        &:hover{
        background-color: ${props => props.color && lighten(0.46, props.color)};
        }
    }
    
`;


export const Modal = (props) => {
    return (
        <ModalContainer backDropColor={props.backDropColor} backDropOpacity={props.backDropOpacity} position={props.position} open={props.open}>
            <div>
                {props.children}
            </div>
        </ModalContainer>
    )
}


export class ModalComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            expand: false
        };
    }

    toggleExpand = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    render() {
        return (
            <Modal backDropColor={this.props.backDropColor} backDropOpacity={this.props.backDropOpacity} position={this.props.position} open={this.props.open}>

                <ModalBody width={this.props.width} color={this.props.color} information={this.props.information} error={this.props.error} fluid={this.props.fluid} expand={this.state.expand}>
                    {this.props.onClose && (
                        <ModalClose onClick={this.props.onClose}></ModalClose>
                    )}
                    {this.props.expandable && (
                        <ModalExpand onClick={() => this.toggleExpand()} expanded={this.state.expand}></ModalExpand>
                    )}
                    {this.props.title && (
                        <ModalTitle subTitle={this.props.subTitle}>{this.props.title}</ModalTitle>
                    )}
                    {this.props.children && (
                        <ModalContent>
                            {this.props.children}
                        </ModalContent>
                    )}
                    {this.props.footer && (
                        <ModalFooter color={this.props.color}>
                            {this.props.footer}
                        </ModalFooter>
                    )}
                </ModalBody>

            </Modal>
        )
    }
}

ModalComponent.propTypes = {
    backDropOpacity: PropTypes.number,
    backDropColor: PropTypes.string,
    position: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    color: PropTypes.string,
    subTitle: PropTypes.string,
    error: PropTypes.bool,
    information: PropTypes.bool,
    fluid: PropTypes.bool,
    width: PropTypes.string,
    footer: PropTypes.object
};