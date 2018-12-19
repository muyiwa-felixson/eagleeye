import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components';
import { Theme } from '../theme';
import PropTypes from 'prop-types';
import { transparentize, darken } from 'polished';
import { NavLink } from "react-router-dom";


export const BreadCrumbContainer = styled.div`
    display: ${props => props.display};
    font-size: ${Theme.PrimaryFontSize};
    font-weight: normal;
    color: ${props => props.color};

    & ul{
        display: inline-block;
        margin: 0;
        padding:0;
        list-style: none;
        
        & li{
            display: inline-block;
            padding-right: 10px; 
            
            & a{
                color: ${props => props.color};
                text-decoration: none;
                &:hover{
                    text-decoration: underline;
                }
            }
            &.home a{
                font-size: 14px;
            }
            &:after{
                font-family: 'flexisaf';
                content: '\\f105';
                color: ${transparentize(0.6, Theme.PrimaryFontColor)};
                display: inline-block;
                margin-left: 10px;
                font-size: 14px;
            }
        }
        & li:last-child{
                & a{
                    color: ${transparentize(0.4, Theme.PrimaryFontColor)};
                }
                &:after{
                    content: '';
                }
        }

        & span{
            color: ${props => props.color};
            display: inline-block; 
            position: relative;
            height: 26px;
            cursor: pointer;
            letter-spacing: 1px;

            & div{
                border-top:1px solid ${transparentize(0.8, Theme.PrimaryFontColor)};
                letter-spacing: normal;
                display: inline-block;
                background: #fff;
                border-radius: 2px;
                top: 20px;
                left: -20px;
                position: absolute;
                display: none;
                z-index: 1000;
                box-shadow: 4px 6px 6px ${transparentize(0.9, Theme.PrimaryDark)};

                &:before{
                    position: absolute;
                    top: -5px;
                    left: 16px;
                    border-bottom: 5px solid #fff;
                    border-right: 8px solid transparent;
                    border-left: 8px solid transparent;
                    display: block;
                    content: '';
                    z-index: 0;
                }
                &:after{
                    position: absolute;
                    top: -6px;
                    left: 15px;
                    border-bottom: 6px solid ${transparentize(0.8, Theme.PrimaryFontColor)};
                    border-right: 9px solid transparent;
                    border-left: 9px solid transparent;
                    display: block;
                    content: '';
                    z-index: -1;
                }
                &:hover{
                        display: block;
                    }
                & a{
                    display: inline-block;
                    min-width: 120px;
                    padding: 8px 10px;
                    color: ${props => darken(0.1,props.color)};
                    text-decoration: none;
                    border-left:1px solid ${transparentize(0.8, Theme.PrimaryFontColor)};
                    border-right:1px solid ${transparentize(0.8, Theme.PrimaryFontColor)};
                    border-bottom:1px solid ${transparentize(0.9, Theme.PrimaryFontColor)};
                    &:hover{
                        font-weight: bold;
                    }
                }
            }
            &:hover{
                & div{
                    display: block;
                }
            }
        }
        & span+li{
               &:before{
                    font-family: 'flexisaf';
                    content: '\\f105';
                    color: ${transparentize(0.6, Theme.PrimaryFontColor)};
                    display: inline-block;
                    margin:0  10px;
                    font-size: 14px;
                } 
        }
    }
`;

const lister = (data) => {
    const initialListing = data.map(list => <li key={Theme.CreateUUID()}><NavLink to={list.link}>{list.name}</NavLink></li>)
    return initialListing;
}

const alister = (data) => {
    const initialListing = data.map(list => <a key={Theme.CreateUUID()} href={list.link}>{list.name}</a>)
    return initialListing;
}

export class BreadCrumb extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    toggleExpand = () => {
        this.setState({

        })
    }


    render() {
        const max= this.props.list.length;
        const allow = this.props.max;
        const maxallow = max - allow;
        const minallow = 1;
        return (
            <ReactResizeDetector
                handleWidth
                render={({ width }) => (
                    <BreadCrumbContainer display={this.props.display} color={this.props.color}>
                        { width < 360 && max > 1 ? (
                            <ul>
                                <li className="home"><a href={this.props.home}><i className="icon-home" /></a></li>
                                <span>...
                      <div>
                                        { alister(this.props.list.filter((list, index) => index < max )) }
                                    </div>
                                </span>
                                {lister(this.props.list.filter((list, index) => index === max - 1))}
                            </ul>
                        ) : (
                                max  >  allow ? (
                                    <ul>
                                        <li className="home"><NavLink to='/dashboard'><i className="icon-home" /></NavLink></li>
                                        {lister(this.props.list.filter((list, index) => index < minallow))}
                                        <span>...
                                <div>
                                                {alister(this.props.list.filter((list, index) => index >= minallow && index <= maxallow))}
                                            </div>
                                        </span>
                                        {lister(this.props.list.filter((list, index) => index > maxallow))}
                                    </ul>
                                ) : (
                                        <ul>
                                            <li className="home"><NavLink to='/dashboard'><i className="icon-home" /></NavLink></li>
                                            {lister(this.props.list)}
                                        </ul>
                                    )
                            )}

                    </BreadCrumbContainer>
                )} />
        )
    }
}

BreadCrumb.defaultProps = {
    color: Theme.PrimaryColor,
    display: "inline-block",
    max : 3
};

BreadCrumb.propTypes = {
    display: PropTypes.string,
    max: PropTypes.number,
    color: PropTypes.string
};
