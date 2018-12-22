import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Theme, media } from '../theme';



export const Panel = styled.div`
    font-family: ${ Theme.PrimaryFontFamily};
    font-size: ${ Theme.PrimaryFontSize};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    width: 100%;
    max-width: ${props => props.maxwidth};
`;

Panel.defaultProps = {
  margin: "0 auto",
  maxwidth: "1200px",
  padding: "0"
};

Panel.propTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
  maxwidth: PropTypes.string
};

export const Body = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background: ${ Theme.PrimaryPale};
`;

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;

export const Boxed = styled.div`
  ${props => props.padHorizontal && css`
    padding-left: ${props => props.padHorizontal};
    padding-right: ${props => props.padHorizontal};
  `}
  ${props => props.padVertical && css`
    padding-top: ${props => props.padVertical};
    padding-bottom: ${props => props.padVertical};
  `}
  ${props => props.pad && css`
    padding: ${props => props.pad};
  `}
   ${props => props.align && css`
    text-align: ${props => props.align};
  `}
   ${props => props.margin && css`
    margin: ${props => props.margin};
  `}
   ${props => props.color && css`
    color: ${props => props.color};
  `}
  ${props => props.position && css`
    position: ${props => props.position};
  `}
`;


export const Container = styled.div`
  flex-grow: 1;
`;

export const Aligner = styled.div`
  text-align: ${props => props.right ? "right" : "left"};
  text-align: ${props => props.center && "center"};
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${props => props.default};
  
  ${props => props.padHorizontal && css`
    grid-column-gap: ${props => props.padHorizontal};
  `}

  grid-gap: ${props => props.pad};
  ${props => props.padVertical && css`
    grid-row-gap: ${props => props.padVerical};
  `}
  ${props => props.autoRow && css`
    grid-auto-rows: ${props => props.autoRow};
  `}
  ${media.desktop`
    grid-template-columns: ${props => props.tablet};   
  `}
  ${media.tablet`
    grid-template-columns: ${props => props.tablet};   
  `}
  ${media.phone`
    grid-template-columns: ${props => props.mobile};
  `}
  `;

Grid.defaultProps = {
  default: "repeat(6, 1fr)",
  mobile: "1fr",
  desktop: "repeat(3, 1fr)",
  tablet: "repeat(2, 1fr)",
  pad: "0",
  padHorizontal: "10px",
};

Grid.propTypes = {
  default: PropTypes.string,
  mobile: PropTypes.string,
  desktop: PropTypes.string,
  tablet: PropTypes.string,
  pad: PropTypes.string,
  padHorizontal: PropTypes.string,
  padVertical: PropTypes.string,
  autoRow: PropTypes.string,
};