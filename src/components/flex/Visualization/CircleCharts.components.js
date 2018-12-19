import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import { lighten } from 'polished';
import { Theme } from '../theme';
import PropTypes from 'prop-types';

const loadChart = keyframes`
    from{
        stroke-dasharray: 0 706;
    }
`;

export const CirclePie = styled.div`
    height: ${props => props.size};
    width: ${props => props.size};
    padding: 10px;
    overflow: hidden;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    & span{
        position: relative;
        display: inline-block;
        text-align: center;
        overflow: visible;
        align-self: center;
        text-align: center;
        z-index: 100;
        font-size: 0.8rem;
        ${Theme.Truncate('60%')};
        ${props => props.tooltipVisibility && css`
            visibility: visible;
        `}
        & strong{
            display: block;
        }
    }
    & svg{
        height: 100%;
        width: 100%;
        position: absolute;
        top:0;
        left:0;
        z-index: 1;
        stroke-width: 0;
        & path{
            cursor: pointer;
            transition: all 0.3s ease-out;
            stroke-linecap: round;
            stroke-linejoin:round;
            stroke-miterlimit:3;
            &:hover{
                stroke-width: 10;
            }
        }
    }
`;
export const CircleCage = styled.div`
    height: ${props => props.size};
    width: ${props => props.size};
    overflow: hidden;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    & span{
        position: relative;
        display: inline-block;
        text-align: center;
        overflow: visible;
        align-self: center;
        text-align: center;
        z-index: 100;
        font-size: ${props => props.fontSize};
        color: ${props => props.fontColor};
        font-family: ${Theme.SecondaryFont};
    }
    & svg{
    transform: rotateZ(-90deg);
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 1;
    display: block;

    & .colored_circle{     
        transform-origin: 0px 0px 0px; 
        fill: none;
        stroke: ${props => props.color};
        stroke-width: ${props => props.lineWidth};
        ${props => props.rounding && css`
        stroke-linecap: round;
        stroke-linejoin:round;
        stroke-miterlimit:10;
        `}
        stroke-dasharray: ${props => 706 * props.percentage / 100} 706;
        stroke-dashoffset:0;
        transition: all 0.3s ease-out;
        animation: ${loadChart} 2s ease-out;
        animation-direction: backwards;
        animation-iteration-count: 1;
    }
    & .faded_circle{
        transform-origin: 0px 0px 0px;
        fill: none;
        stroke: ${props => props.secondaryColor};
        stroke-width: ${props => props.lineWidth};
    }
    }
`;


export const CircleLine = (props) => {
    return (
        <CircleCage {...props}>
            <span>{props.displayValue ? props.displayValue : `${props.percentage}%`}</span>
            <svg x="0px" y="0px" viewBox="0 0 256 256">
                <circle className="faded_circle" cx="128" cy="128" r="112.5" />
                <circle className="colored_circle" cx="128" cy="128" r="112.5" />
            </svg>
        </CircleCage>
    )
}


export class PieChart extends React.Component {
    constructor() {
        super();
        this.state = {
            currentView: { visible: false, name: "", value: "" }
        };
    }

    getSectorPath = (x, y, outerDiameter, a1, a2) => {
        const degtorad = Math.PI / 180;
        const halfOuterDiameter = outerDiameter / 2;
        const cr = halfOuterDiameter - 5;
        const cx1 = (Math.cos(degtorad * a2) * cr) + x;
        const cy1 = (-Math.sin(degtorad * a2) * cr) + y;
        const cx2 = (Math.cos(degtorad * a1) * cr) + x;
        const cy2 = (-Math.sin(degtorad * a1) * cr) + y;

        return "M" + x + " " + y + " " + cx1 + " " + cy1 + " A" + cr + " " + cr + " 0 0 1 " + cx2 + " " + cy2 + "Z";
    }
    onMouseIn = (elem) => {
        const inView = { visible: true, name: elem.name, value: elem.value }
        this.setState({
            currentView: inView
        })
    }
    onMouseOut = () => {
        this.setState({
            currentView: { visible: false, name: "", value: "" }
        })
    }
    listSectors = (list, outerDiameter) => {
        let total = 0;
        let totalvalue = 0;

        const range = 0.4 / list.length

        list.map(elem => totalvalue += elem.value)
        
        const lister = list.map((elem, index) => {
            let initlevel = total;
            let initvalue = (360 * elem.value / totalvalue);
            total += initvalue
            let mainColor = elem.color ? elem.color : lighten((range * index), this.props.color)
            return <path key={Theme.CreateUUID()} onMouseEnter={() => this.onMouseIn(elem)} onMouseLeave={() => this.onMouseOut()} d={this.getSectorPath((outerDiameter + 20) / 2, (outerDiameter + 20)  / 2, (outerDiameter - 20) , initlevel, initvalue + initlevel)} fill={mainColor} stroke={mainColor} />
        })
        return lister
    }

    render() {
        const outerDiameter = 500;
        const thickness = outerDiameter * this.props.innerRadius / 100;
        const pad = 20;
        return (
            <CirclePie {...this.props}>
                <span><strong>{this.state.currentView.value}</strong> {this.state.currentView.name}</span>
                <svg width={outerDiameter + pad} height={outerDiameter + pad} viewBox={`0 0 ${outerDiameter + pad} ${outerDiameter + pad}`}>
                    {
                        this.listSectors(this.props.list, outerDiameter)
                    }
                    <circle cx={(outerDiameter + pad) / 2} cy={(outerDiameter + pad) / 2} r={(outerDiameter - thickness) / 2} fill="white"  />
                </svg>
            </CirclePie>

        )
    }
}


CircleLine.defaultProps = {
    percentage: 0,
    size: '100px',
    color: Theme.PrimaryColor,
    secondaryColor: Theme.PrimaryGreyLight,
    fontColor: Theme.PrimaryFontColor,
    fontSize: "1rem",
    displayValue: CircleLine.percentage,
    rounding: true,
    lineWidth: 20
};

CircleLine.propTypes = {
    percentage: PropTypes.number.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    displayValue: PropTypes.string,
    fontSize: PropTypes.string,
    rounding: PropTypes.bool,
    lineWidth: PropTypes.number
};

PieChart.defaultProps = {
    size: '100px',
    fontSize: "1rem",
    innerRadius: 20,
    color: Theme.PrimaryColor
};

PieChart.propTypes = {
    list: PropTypes.array.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    innerRadius: PropTypes.number
};


export const LineChartCage = styled.div`
    width: ${props=> props.size};
    display: inline-block;
    & svg{
        width: 100%;
        & polyline{
            stroke-width: 5;
            stroke: ${props => props.color};
            fill: none;
        }
        & circle{
            fill: ${props => props.color};
        }
        & polygon{
            fill: ${props => props.color};
            opacity: 0;
        }
    }
`;

export const LineChart = (props) => {
    const max = Math.max(...props.list)
    const width = 280
    const height = 200
    const radius = 10
    const topLine = height + radius 
    const rate = width /(props.list.length -1)
    const points = props.list.map((elem, index) => `${radius + (index * rate)},${topLine - (height * elem/max)} `)
    const circles = props.list.map((elem, index) => <circle key={Theme.CreateUUID()} className="" cx={radius + (index * rate)} cy={topLine - (height * elem / max)} r={radius} />)
    return (
        <LineChartCage {...props}>
            <svg x="0px" y="0px" viewBox={`0 0 ${width + (2 * radius)} ${height + (2 * radius)}`}>
                <polygon points={`${radius},${height} ${points} ${width},${height}`} />
                <polyline points={points} />
                { circles }
            </svg>
        </LineChartCage>
    )
}

LineChart.defaultProps = {
    size: '100px',
    color: Theme.PrimaryColor
};

LineChart.propTypes = {
    list: PropTypes.array.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
};
