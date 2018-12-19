import styled, { css } from 'styled-components';
import React from 'react';
import { Theme } from '../theme';
import PropTypes from 'prop-types';

import Placeholder from './assets/placeholder.png';
import { transparentize } from 'polished';

export const CardProfile = styled.div`
    padding: 10px;
    text-align: center;

    & .cardCage{
        display: flex;
        justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    }

    & .picture{
        height: ${props=>props.size};
        width: ${props => props.size};
        border-radius: 50%;
        display: flex;
        align-items: center;
        background-image: url(${props=>props.img});
        background-position: center;
        background-size: cover;
        position: relative;
        transition: ${Theme.PrimaryTransition};

        ${props=> props.indicator && css`
            &:after{
                content: '';
                width: 20%;
                height: 20%;
                border-radius: 50%;
                background-color: ${props => props.indicator};
                position: absolute;
                display: block;
                bottom: 5%;
                right: 5%;
                border: 2px solid #fff;
            }
        `}
    }
    & span{
        display: block;
        margin: 10px 0;
        font-size: 1rem;
    }
    & em{
        display: block;
        margin: -10px 0 10px 0;
        font-size: 0.8rem;
        opacity: 0.6;
        font-style: normal;
    }
`;

export const ProfileCard = (props) => {
    return ( 
        <CardProfile {...props} className="cardprofile">
        <div className="cardCage">
            <div className="picture" />
            {props.name && <span>{props.name}</span>}
            {props.label && <em>{props.label}</em>}
        </div>
        </CardProfile>
          )
}


ProfileCard.defaultProps = {
    label: "positions held",
    name: "User Name",
    img: Placeholder,
    size: "80px"
};

ProfileCard.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.any,
    size: PropTypes.string
};


export const DashCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;
    
    min-height: 160px;
    box-shadow: 0 2px 10px ${Theme.Shadow};
    border-radius: ${Theme.SecondaryRadius};
    color: ${Theme.PrimaryFontColor};
    font-size: ${Theme.PrimaryFontSize};
    background: ${props=> props.background};
    
    & .title{
        grid-column: 1;
        opacity: 0.6;
        padding: 10px 20px;
        display: grid;
        align-items: center;
    }
    & .value{
        grid-column: 1;
        grid-row: 2;
        padding: 10px 20px;
        align-items: baseline;
        display: grid;
        & strong{
            font-size: 1.6rem;
            display: block;
            font-family: ${Theme.SecondaryFontFamily};
        }
    }
    & .chart{
        grid-column: 2;
        grid-row: 1/3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
export const DashCard = (props) => {
    return (
        <DashCardGrid {...props}>
            <div className="title">{props.title}</div>
            <div className="value">
            <strong>{props.value}</strong>
            <div>{props.subValue}</div>
            </div>
            <div className="chart">{props.children}</div>
        </DashCardGrid> 
    )
}

DashCard.defaultProps = {
    background: "#fff",
    value: 0
};


export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto 20px);
    padding: 15px;
    margin-top: 20px;
    
    min-height: 60px;
    box-shadow: 0 2px 10px ${Theme.Shadow};
    border-radius: ${Theme.PrimaryRadius};
    color: ${Theme.PrimaryFontColor};
    font-size: ${Theme.PrimaryFontSize};
    background: ${props => props.background};
    
    & .cardTitle{
        opacity: 0.6;
        display: grid;
        align-items: center;
        text-align: center;
    }
    & .cardValue{
        padding: 0 10px 10px 10px;
        align-items: center;
        text-align: center;
        display: grid;
        & strong{
            font-size: 1.6rem;
            display: block;
            font-family: ${Theme.SecondaryFontFamily};
            color: ${props => props.color}
        }
    }
    & .cardIcon{
        grid-column: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.2rem;
        position: relative;
        & i{
            display: flex;
            width: 40px;
            height: 40px;
            border-radius: ${Theme.PrimaryRadius};
            background: ${props => props.color};
            text-align: center;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -30px;
            right: 0px;
            box-shadow: 0 1px 5px ${props=> transparentize(0.6, props.color)};
        }
    }
`;

export const Card = (props) => {
    return (
        <CardGrid {...props}>
            <div>
            <div className="cardValue">
                <strong>{props.value}</strong>
            </div>
            <div className="cardTitle">{props.title}</div>
            </div>
            {
                props.icon && <div className="cardIcon"><i className={props.icon} /></div>
            }
        </CardGrid>
    )
}

export const PlainCard = (props) => {
    return (
        <CardGrid {...props}>
            <div>
                <div className="cardValue">
                    <strong>{props.value}</strong>
                </div>
                <div className="cardTitle">{props.title}</div>
            </div>
            {
                props.icon && <div className="cardIcon"><i className={props.icon} /></div>
            }
            {props.children}
        </CardGrid>
    )
}

Card.defaultProps = {
    background: "#fff",
    color: Theme.PrimaryColor
};

PlainCard.defaultProps = {
    background: "#fff",
    color: Theme.PrimaryColor
};