import styled from 'styled-components';
import { Theme } from '../theme';


const DefaultProps = {
    color: Theme.PrimaryFontColor,
    margin: '10px 0'
}

const FontSizes = {
    small : '0.8rem',
    standard: '1rem',
    medium: '1.2rem',
    large: '1.6rem',
    xlarge: '2rem'
}

export const H1 = styled.h3`
    font-size: ${props => props.size ? FontSizes[props.size] : '3rem'};
    font-weight: lighter;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : DefaultProps.margin };
    padding: 0;
    color: ${props => props.color ? props.color : DefaultProps.color };
    letter-spacing: 0.7;
`;

export const H2 = styled.h3`
    font-size: ${props => props.size ? FontSizes[props.size] : '2rem'};
    font-weight: 600;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : DefaultProps.margin };
    padding: 0;
    color: ${props => props.color ? props.color : DefaultProps.color };
    letter-spacing: 0.5;
`;

export const H3 = styled.h3`
    font-size: ${props => props.size ? FontSizes[props.size] : '1.6rem'};
    font-weight: 600;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : DefaultProps.margin };
    padding: 0;
    color: ${props => props.color ? props.color : DefaultProps.color };
    letter-spacing: 0.4;
`;

export const H4 = styled.h3`
    font-size: ${props => props.size ? FontSizes[props.size] : '1.6rem'};
    font-weight: lighter;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : DefaultProps.margin };
    padding: 0;
    color: ${props => props.color ? props.color : DefaultProps.color};
    letter-spacing: 0.4;
`;

export const H5 = styled.h3`
    font-size: ${props => props.size ? FontSizes[props.size] : '1.2rem'};
    font-weight: 600;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : '5px 0' };
    padding: 0;
    color: ${props => props.color ? props.color : DefaultProps.color};
`;

export const Label = styled.span`
    font-size: ${props => props.size ? FontSizes[props.size] : '0.8rem'};
    font-weight: normal;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : 0 };
    padding: 0;
    color: ${props => props.color ? props.color : Theme.PrimaryGrey};
    letter-spacing: 0.45;
    text-transform: uppercase;
`;



export const P = styled.p`
    font-size: ${props => props.size ? FontSizes[props.size] : Theme.PrimaryFontSize};
    font-weight: normal;
    font-family: ${Theme.PrimaryFont};
    margin: ${props => props.margin ? props.margin : DefaultProps.margin };
    padding:0;
    color: ${props => props.color ? props.color : DefaultProps.color };
    line-height: ${Theme.PrimaryLineHeight};
`;



