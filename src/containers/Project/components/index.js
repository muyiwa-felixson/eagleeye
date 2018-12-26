import styled, { css } from 'styled-components';
import { Theme } from '../../../components/flex/theme';
import { Panel, Label, H3, Grid, Button, PaleButton } from '../../../components/flex';
import { lighten, transparentize } from 'polished';
import { LineBar } from '../../Projects/components';

export const TopSection = styled.div`   
  background: white;
  color: ${Theme.PrimaryFontColor};
  width: 100%;
  box-shadow: 0 0 35px ${Theme.Shadow};
  padding-top: 120px;
 

  ${Panel}{
    margin-top: 20px;
    border: 1px solid ${Theme.PrimaryGreyLight};
    border-bottom: none;
    border-radius: ${Theme.SecondaryRadius} ${Theme.SecondaryRadius} 0 0;
    padding: 15px 30px;
    min-height: 200px;
  }

  ${Label}{
    display: block;
    margin-bottom: -5px;
    margin-top: 10px;
    font-size: 10px;
    font-weight: bold;
  }
  & .paid{
    font-size: 70px;
    font-family: ${Theme.SecondaryFontFamily};
  }
  & h3{
    font-size: 1rem;
    margin-bottom: 20px;
    text-transform: capitalize;
  }

  & p{
    opacity: 0.6;
  }

  & .right-bar{
    border-right: 1px solid ${Theme.PrimaryGreyLight};
    padding-right: 20px;
    margin-right:20px;
  }
  & .minibox{
    grid-gap: 20px;
    margin: 15px 0;
    border-top: 1px solid ${Theme.PrimaryGreyLight};
    border-bottom: 1px solid ${Theme.PrimaryGreyLight};
    & div{
      border-right: 1px solid ${Theme.PrimaryGreyLight};
      padding-bottom: 10px;
    }
    & div:last-child{
      border-right: none;
    }
  }
  & .answer{
    display: inline-block;
    margin-top: 10px;

  }
`;

export const LowerSection = styled.div`
${Panel}{
    /* padding: 30px; */
}

  & .lower-buttons{
    background: ${lighten(0.05, Theme.PrimaryPale)};
    border-radius: 0 0 ${Theme.SecondaryRadius} ${Theme.SecondaryRadius};
    padding: 20px 30px;
    border: 1px solid ${Theme.PrimaryGreyLight};
    border-top: none;
  }

  & .perval{
    font-size: 20px;
    font-family: ${Theme.SecondaryFontFamily};
  }
  ${LineBar}{
    height: 6px; 
    border-radius: 2px;
    background: ${lighten(0.65, Theme.PrimaryGreyDark)};
    box-shadow: 0 3px 9px ${Theme.Shadow};
    &:after{
      height: 100%;
      box-shadow: 1px 1px 5px ${Theme.Shadow};
    }
    &:before{
      content: '';
    }
  }
`;

export const TimeLine = styled.div`
  padding: 50px 0;
  position: relative;
  &:after{
    position: absolute;
    bottom: 40px;
    left: 74px;
    width: 15px;
    height: 15px;
    background: ${Theme.PrimaryBlue};
    border-radius: 50%;
    content: '';
    display: block;
  }
`;

export const TimeBox = styled.div`
  padding: 0;
  min-height: 100px;
  display: grid;
  grid-template-columns: 80px auto;
`;

export const TimeDate = styled.div`
  font-size: 12px;
  color:${Theme.PrimaryBlue};
  & span{
    display: block;
    letter-spacing: 0px;
  }
  & strong{
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const TimeContent = styled.div`
  padding: 0 30px 30px 30px;
  border-left: 2px solid ${Theme.PrimaryBlue};
  position: relative;

    &:before{
    position: absolute;
    top: 0;
    left: -18px;
    width: 31px;
    height: 31px;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${lighten(0.1, Theme.PrimaryBlue)};
    border: 2px solid ${Theme.PrimaryBlue};
    font-family: 'flexisaf';
    content: '\\f0f6';
    }

    ${Button}{
      font-size: 12px;
      height: 36px;
      padding: 7px 16px;
    }
    ${PaleButton}{
      font-size: 12px;
      height: 36px;
      padding: 7px 16px;
    }
    & .button-section{
      padding-bottom: 10px;
    }
`;

export const PayContent = styled.div`
  padding: 0 30px 30px 30px;
  border-left: 2px solid ${Theme.PrimaryBlue};
  position: relative;
  background-color: ${transparentize(0.7, Theme.PrimaryGreyLight)};

    &:before{
    position: absolute;
    top: 0;
    left: -23px;
    width: 41px;
    height: 41px;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${lighten(0.1, Theme.PrimaryRed)};
    border: 2px solid ${Theme.PrimaryBlue};
    font-family: 'flexisaf';
    content: '\\e82c';
    font-size: 18px;
    }
`;

export const TimeDiv = styled.div`
  background: ${props => props.type === "report" ? "#fff" : lighten(0.05, Theme.PrimaryGreyLight)};
  border-radius: ${Theme.PrimaryRadius};
  box-shadow: 1px 1px 15px ${Theme.Shadow};
  display: inline-block;
  padding: 15px;
  position: relative;
  
  .badge{
    top: 15px;
    right: 15px;
    display: inline-block;
    border-radius: ${Theme.PrimaryRadius};
    background: ${props => props.confirmed ? Theme.PrimaryMint : Theme.PrimaryGrey};
    color: #fff;
    padding: 5px;
    position: absolute;
  }

  ${Grid}{
    border-top: 1px dashed ${Theme.PrimaryGreyLight};
    border-bottom: 1px dashed ${Theme.PrimaryGreyLight};
    text-transform: capitalize;
    margin: 15px -15px;
    padding: 0 15px;
    width: calc(100% + 30px);
    background-color: ${transparentize(0.7, Theme.PrimaryGreyLight)};

    & div{
      padding: 10px;
      border-left: 1px dashed ${Theme.PrimaryGreyLight};
    }
    & div:first-child{
      border-left:none;
    }
    ${Label}{
      display: block;
      font-size: 10px;
    }
  }

  & h3{
    font-weight: normal;
    font-size: 34px;
    margin: 0 0 10px 0;
    font-family: ${Theme.SecondaryFontFamily};

    & span{
      font-size: 12px;
    }
  }
  & p{
    font-size: ${Theme.PrimaryFontSize};
    color: ${Theme.PrimaryFontColor};
  }
  & .media{
    overflow: hidden;
    margin: 0 -15px -15px -15px;
    padding: 10px;
  }

`;

export const Picture = styled.div`
  border-radius: ${Theme.PrimaryRadius};
  background-color: ${Theme.PrimaryGrey};
  width: 100px;
  height: 90px;
  margin: 10px;
  display: inline-block;
  float: left;
  background-size: cover;
  background-position: center;
  box-shadow: 1px 5px 25px ${Theme.Shadow};
  cursor: pointer;
  background-image: ${props => `url(${props.backgroundImage})`};
`;

export const Video = styled.div`
  border-radius: ${Theme.PrimaryRadius};
  background-color: ${Theme.PrimaryGrey};
  width: 100px;
  height: 90px;
  margin: 10px;
  display: inline-flex;
  position: relative;
  float: left;
  background-size: cover;
  background-position: center;
  box-shadow: 1px 5px 25px ${Theme.Shadow};
  cursor: pointer;

  &:after{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    font-family: 'flexisaf';
    font-size: 16px;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    content: '\\f00f';
    position: absolute;
    top: 20px;
    left: 25px;
    border: 10px solid rgba(255,255,255,0.2);
    box-shadow: 0px 0px 5px ${Theme.Shadow};
    text-shadow: 1px 1px 1px ${Theme.Shadow};
  }
`;

export const DragZone = styled.div`
  border-radius: ${Theme.SecondaryRadius};
  background: ${lighten(0.05, Theme.PrimaryGreyLight)};
  padding: 30px;
  min-height: 200px;
  margin-top: 30px;
  position: relative;

  & .file-region{
    overflow: hidden;
  }
  & i{
    font-size: 60px;
    opacity: 0.8;
    display: block;
    color: ${Theme.PrimaryColor};
  }

  & .placeholder{
    text-align: center;
    padding: 30px 20px;
  }

  ${Video}{
    width: 60px;
    height: 50px;
    overflow: hidden;
    margin: 5px;
    &:after{
    width: 16px;
    height: 16px;
    font-size: 10px;
    border-width: 5px;
    top: 12px;
    left: 17px;
    }
  }
  ${Picture}{
    margin: 5px;
    width: 60px;
    height: 50px;
  }
`;