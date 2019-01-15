import styled, { css } from 'styled-components';
import { Theme } from '../../../components/flex/theme';
import { InputWrapper, Label, PaleButton } from '../../../components/flex';
import { darken, transparentize, lighten } from 'polished';


export const Relative = styled.div`   
  position: relative;
`;



export const ListBody = styled.div`
  padding: 20px;
  margin-top: 100px;

  & .filter-lane{
    margin-bottom: 20px;


    & .right-align{
      grid-column-gap: 10px;
    }
    ${PaleButton}{
      height: 38px;
      padding: 8px 15px;
      margin-top: 10px;
    }
    ${InputWrapper}{
      background: none;
      & .flexisaf__control{
        background: ${Theme.Gradient("#fff", "#fefefe")};
        text-align: left;
        border: none;
        font-size: 11px;
        border-radius: 3px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        height: 36px;
        cursor: pointer;

        & .flexisaf__placeholder{
          ${Theme.Truncate("calc(100% - 10px)")};
        }

        &.flexisaf__control--is-focused{
          background: #fff;
          border: none;
          box-shadow: 0 2px 10px ${Theme.Shadow};
        }
      }
    }
  }
`;

export const ProjectCard = styled.div`
${props => props.layout === "card" && css`
  cursor: pointer;
  padding: 20px;
  min-height: 150px;
  background: #FFF;
  color: ${Theme.PrimaryFontColor};
  position: relative;
  border-radius: ${Theme.SecondaryRadius};
  font-size: ${Theme.PrimaryFontSize};
  border: 1px solid #FFF;
  z-index: 1;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 0 ${transparentize(0.9, Theme.PrimaryGreyDark)};

  &:hover{
    box-shadow: 0px 10px 40px ${transparentize(0.9, Theme.PrimaryGreyDark)};
  }

  &::after{
    height: 20px;
    background: #FFF;
    position: absolute;
    top: -21px;
    left: 5px;
    width: 60%;
    display: block;
    border: 1px solid #FFF;
    border-bottom: none;
    border-radius: ${Theme.SecondaryRadius} ${Theme.SecondaryRadius} 0 0;
    z-index: 2;
  }

  & .project-code{
    font-size: 12px;
    font-weight: normal;
    opacity: 0.8;
  }
  & .project-year{
    font-size: 15px;
    line-height: 15px;
    text-align: left;
    font-weight: bold;
    color: ${Theme.PrimaryBlue};
    margin-bottom: 15px;
    text-transform: uppercase;
    & span{
      display: block;
      font-weight:normal;
      letter-spacing: 3px;
    }
  }
  & .project-name{
    padding: 5px 0;
    margin-bottom: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }
  & .project-completion{
  }
  & .project-payment{
  }
  & .project-buttons{
    margin: 10px -20px;
    padding: 20px 20px 10px 20px;
  }
  & .project-status{
    position: absolute;
    top: 10px;
    right: 10px;
    height: 30px;
    width: 30px;
    background: ${Theme.PrimaryColor};
    color: #fff;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    text-shadow: 0 1px 5px ${transparentize(0.9, Theme.PrimaryGreyDark)};

    &.non{
      background: ${transparentize(0.6, Theme.PrimaryGrey)};
    }
  }

  ${Label}{
    font-size: 10px;
    margin: 2px 0;
    text-transform: capitalize;
  }
  `}

${props => props.layout === "list" && css`
  /* padding: 20px; */
  /* min-height: 150px; */
  padding: 10px;
  background: ${lighten(0.05, Theme.PrimaryPale)};
  color: ${Theme.PrimaryFontColor};
  position: relative;
  border-radius: ${Theme.PrimaryRadius};
  font-size: ${Theme.PrimaryFontSize};
  border: 2px solid ${Theme.PrimaryPale};
  z-index: 1;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 0 ${transparentize(0.9, Theme.PrimaryGreyDark)};
  display: grid;
  grid-template-columns: 80px 160px auto  100px 100px 50px;
  grid-gap: 10px;
  align-items: center;

  &:hover{
    background: #fff;
    box-shadow: 0px 10px 40px ${transparentize(0.9, Theme.PrimaryGreyDark)};
    border: 2px solid #fff;
    z-index: 10px;
  }


  & .project-code{
    font-size: 12px;
    font-weight: normal;
    opacity: 0.8;
  }
  & .project-year{
    font-size: 15px;
    line-height: 15px;
    text-align: left;
    font-weight: bold;
    color: ${Theme.PrimaryBlue};
    text-transform: uppercase;
    & span{
      display: inline-block;
      font-weight:normal;
      letter-spacing: 0;
      margin-left: 5px;
    }
  }
  & .project-name{
    font-weight: bold;
    text-transform: uppercase;
  }
  & .project-completion{
  }
  & .project-payment{
  }
  & .project-buttons{
    margin: 10px -20px;
    padding: 20px 20px 10px 20px;
  }
  & .project-status{
    height: 20px;
    margin-left: 20px;
    width: 20px;
    background: ${Theme.PrimaryColor};
    color: #fff;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    text-shadow: 0 1px 5px ${transparentize(0.9, Theme.PrimaryGreyDark)};

    &.non{
      background: ${transparentize(0.6, Theme.PrimaryGrey)};
    }
  }

  ${Label}{
    font-size: 10px;
    margin: 2px 0;
    text-transform: capitalize;
  }
  ${LineBar}{
    width: 100%;
    &:before{
      top: -20px;
      right: 0;
    }
  }
  `}
`;

export const LineBar = styled.div`
  height: 3px;
  margin: 5px 0;
  background: ${transparentize(0.3, Theme.PrimaryGreyLight)};
  /* border-radius: ${Theme.PrimaryRadius}; */
  /* overflow: hidden; */
  position: relative;
  width: calc(100% - 40px);

  &:before{
    position: absolute;
    right: -40px;
    top: -5px;
    font-size: 10px;
    content:  '${props => props.percentage}';
    color: ${Theme.PrimaryGrey};
  }
  &:after{
    content: '';
    display: block;
    height: 3px;
    background-color: ${props => props.color ? props.color : Theme.PrimaryMint};
    width: ${props => props.percentage ? props.percentage : 0};
  }

`;

export const BallLegend = styled.div`
    display: inline-grid;
    grid-template-columns: 35px auto;
    font-size: ${Theme.BaseFontSize};
    align-items: center;
    margin-right: 15px;
    text-transform: capitalize;
    
    &::before{
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        text-transform: uppercase;
        content: '${props => props.legend}';
        width: 28px;
        height: 28px;
        background: #333;
        border: 1px solid #333;
        ${props => props.color && css`
            background: ${props => transparentize(0.1, props.color)};
            border: 1px solid ${props => props.color};
            text-shadow: 0 1px 1px ${props => props.color};
        `};
        border-radius: 50%;
        padding: 6px 0;
        line-height: 14px;
        color: #fff;
        font-size: 12px;
        font-family: ${Theme.SecondaryFont};
    }
`;

export const AutosuggestItem = styled.div`
    display: grid;
    grid-template-columns: 35px auto;
    font-size: ${Theme.BaseFontSize};
    align-items: center;
    text-transform: capitalize;
    position: relative;
    
    &::before{
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        text-transform: uppercase;
        content: '${props => props.legend}';
        width: 24px;
        height: 24px;
        margin-top: 5px;
        background: #333;
        border: 1px solid #333;
        ${props => props.color && css`
            background: ${props => transparentize(0.1, props.color)};
            border: 1px solid ${props => props.color};
            text-shadow: 0 1px 1px ${props => props.color};
        `};
        border-radius: 50%;
        padding: 5px 0;
        line-height: 12px;
        color: #fff;
        font-size: 10px;
        font-family: ${Theme.SecondaryFont};
    }
`;

export const LevelBadge = styled.div`
    display: grid;
    grid-template-columns: 35px;
    font-size: ${Theme.BaseFontSize};
    align-items: center;
    text-transform: capitalize;
    position: relative;
    
    &::before{
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        text-transform: uppercase;
        content: '${props => props.legend}';
        width: 24px;
        height: 24px;
        background: #333;
        border: 1px solid #333;
        ${props => props.color && css`
            background: ${props => transparentize(0.1, props.color)};
            border: 1px solid ${props => props.color};
            text-shadow: 0 1px 1px ${props => props.color};
        `};
        border-radius: 50%;
        padding: 5px 0;
        line-height: 12px;
        color: #fff;
        font-size: 10px;
        font-family: ${Theme.SecondaryFont};
    }
`;

export const LevelList = styled.div`
    position: absolute;
    font-size: 10px;
    opacity: 0.6;
    bottom:-15px;
    left: 35px;
    text-align: right;
    & span{
        display: inline-block;
        padding: 3px;
        &:before{
            content: '*';
            display: inline-block;
            padding-right: 3px;
        }
        &:first-child:before{
            display: none;
        }
    }
`;

export const LocTable = styled.table`
  margin: 10px 0;
  border: 1px solid ${Theme.PrimaryPale};
  border-collapse: collapse;
  color: ${Theme.PrimaryFontColor};
  font-size: 12px;
  & thead{
    & th{
      text-align: left;
      font-size: 10px;
      opacity: 0.6;
      padding: 10px;
    }
    & th:last-child{
      width: 40px;
    }
    border-bottom: 1px solid ${Theme.PrimaryPale};
  }
  & tbody{
    & tr{
      border-bottom: 1px solid ${Theme.PrimaryPale};
    }
    & tr:last-child{
      border-bottom: none;
    }
    & tr:nth-child(even){
      background: #f6f6f6;
    }
    & td{
      padding: 10px;
      border-right: 1px solid ${Theme.PrimaryPale};
    }
    & td:last-child{
      border-right: none;
    }
  }
`;