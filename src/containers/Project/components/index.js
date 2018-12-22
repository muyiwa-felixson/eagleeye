import styled, { css } from 'styled-components';
import { Theme } from '../../../components/flex/theme';
import { Panel, Label, H3 } from '../../../components/flex';
import { lighten } from 'polished';
import { LineBar } from '../../Projects/components';

export const TopSection = styled.div`   
  background: white;
  color: ${Theme.PrimaryFontColor};
  width: 100%;
  box-shadow: 0 0 35px ${Theme.Shadow};
  margin-top: 100px;
  border-top: 1px solid ${Theme.PrimaryGreyLight};

  ${Panel}{
    margin-top: 20px;
    border: 1px solid ${Theme.PrimaryGreyLight};
    border-bottom: none;
    border-radius: ${Theme.SecondaryRadius} ${Theme.SecondaryRadius} 0 0;
    padding: 30px;
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
    padding: 30px;
    border: 1px solid ${Theme.PrimaryGreyLight};
    border-top: none;
  }

  & .perval{
    font-size: 20px;
    font-family: ${Theme.SecondaryFontFamily};
  }
  ${LineBar}{
    height: 6px; 
    &:after{
      height: 100%;
    }
    &:before{
      content: '';
    }
  }
`;
