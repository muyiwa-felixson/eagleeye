import styled, { css } from 'styled-components';
import { Theme } from '../components/flex/theme';
import { InputWrapper, Label } from '../components/flex/index';
import { darken, transparentize, lighten } from 'polished';


export const Relative = styled.div`   
  position: relative;
`;

export const TopBar = styled.div`   
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  height: 100px;
  width: 100%;
  display: grid;
  grid-template-columns: 100px auto auto 150px 60px 60px 20px;
  grid-gap: 10px;
  align-items: center;
  align-content: center;
  box-shadow: 0 0 35px ${Theme.Shadow};
  z-index: 1000;
  border-bottom: 1px solid ${Theme.PrimaryGreyLight};

  & .logo{
    text-align: center;
    font-size: 30px;
    & img{
      height: 60px;
      margin: 0 20px;
    }
  }
  & .login-user{
    display: flex;
    width: 44px;
    height: 44px;
    font-size: 18px;
    line-height: 20px;
    align-items: center;
    align-content: center;
    justify-content: center;
    border-radius: 50px;
    border: 2px solid ${Theme.PrimaryGrey};
    color:${Theme.PrimaryGrey};
  }
  & .alert{
    display: flex;
    width: 44px;
    height: 44px;
    font-size: 18px;
    line-height: 20px;
    align-items: center;
    align-content: center;
    justify-content: center;
    color:${Theme.PrimaryGrey};
  }
`;

export const PopMenu = styled.div`
    position: absolute;
    top: 20px;
    left: 220px;
    width: 200px;
    max-height: 44px;
    transition: all ease-in-out 0.3s;
    overflow: hidden;
    &:hover{
      max-height: 300px;
      &:before{
        border-radius: 2px 2px 0 0;
      }
      & ul{
      &:before{
        top:-2px;
      }
      }
    }
    &:before{
      content: '\\e827';
      font-family: 'flexisaf';
      display: flex;
      width: 42px;
      height: 42px;
      font-size: 14px;
      line-height: 20px;
      align-items: center;
      align-content: center;
      justify-content: center;
      border: 1px solid ${lighten(0.6, Theme.PrimaryFontColor)};
      border-radius: 2px;
      color:${Theme.PrimaryGrey};
      transition: all ease-in-out 0.3s;
    }
    & ul{
      &:before{
        top: 0;
        left: 0;
        position: absolute;
        background: #fff;
        height: 2px;
        width: 42px;
        content: '';
        display: block;
        transition: all ease-in-out 0.3s;
      }
      display: block;
      position: relative;
      background: #fff;
      padding: 0;
      margin:0;
      border: 1px solid ${lighten(0.6, Theme.PrimaryFontColor)};
      /* overflow: hidden; */
      border-radius: 0 3px 3px 3px;
      /* box-shadow: 0 5px 5px rgba(0,0,0,0.3); */
      color:${lighten(0.2, Theme.PrimaryFontColor)};
      font-size: 12px;
      & li{
        color:${lighten(0.2, Theme.PrimaryFontColor)};
        border-bottom: 1px solid ${lighten(0.7, Theme.PrimaryFontColor)};
        & a{
          padding: 10px;
          display: block;
          color: inherit;
          text-decoration: none;
        }
        
        transition: all ease-out 0.3s;
        &:hover{
          font-weight: bold;
          color: ${Theme.PrimaryFontColor};
        }
      }
      & li:last-child{
        border-bottom: none;
      }
    }
`;