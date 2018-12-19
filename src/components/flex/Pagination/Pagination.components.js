import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken, lighten, transparentize } from 'polished';
import { Theme } from '../theme'; 
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const PaginationWrapper = styled.ul`

    & .rc-pagination-item {
        border-radius: 0;
        &:hover{ 
            border: 1px solid ${Theme.PrimaryGreyLight};
            background-color: ${Theme.PrimaryGreyLight};
            & a {
                color: ${Theme.PrimaryFontColor};
            }
        }
    }
    & .rc-pagination-item-active {
        background-color: ${Theme.PrimaryBlue};
        border: 1px solid ${Theme.PrimaryBlue};
        &:hover{ 
            border: 1px solid ${props => darken(0.09, Theme.PrimaryBlue)};
            background-color: ${props => darken(0.09, Theme.PrimaryBlue)};
        }
    }

    & .rc-pagination-prev, .rc-pagination-next {
        border-radius: 0;
    } 
`;

export const PaginationComp = ({ current, total, showTotal,onChange }) => {
    return (
      <PaginationWrapper>
        <Pagination onChange={onChange} current={current} showTotal={showTotal} total={total} />
      </PaginationWrapper>
    );
};