import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Table from 'rc-table';
import Pagination from 'rc-pagination';
import { Theme } from '../theme';
import { lighten, transparentize, darken } from 'polished';
import { InputWrapper, Input, Grid, SimpleSelect } from '../';
import { Boxed } from '../Layouts/Layout.components';
import pluralize from 'pluralize';


const TableWrapper = styled.div`
    display: block;
    margin: 20px 0;
    font-size: ${Theme.PrimaryFontSize};
    background-color: #fff;
    border-radius: ${Theme.SecondaryRadius};
    box-shadow: 0 2px 10px ${Theme.Shadow};

    & table{
        width: 100%;
        border-collapse: collapse;
        
        & thead{
            /* background: ${lighten(0.1, Theme.PrimaryGrey)}; */
            & th{
                text-align: left;
                padding: 15px;
                text-transform: uppercase;
                border-bottom: 1px solid ${lighten(0.66, Theme.PrimaryFontColor)};
                /* border-bottom: 1px solid ${Theme.PrimaryColor}; */
                font-size: ${Theme.PrimaryFontSize};
                color: ${transparentize(0.4, Theme.PrimaryFontColor)};
                font-weight: bold;
            }
        }
        & tbody{
            & tr:nth-child(even){
                background: ${lighten(0.71, Theme.PrimaryFontColor)};
            }
            & tr{
                border-bottom: 1px solid ${lighten(0.66, Theme.PrimaryFontColor)};
                border-left: 3px solid transparent;
                transition: all 0.1s ease-out;
                & td:first-child{
                   border-left: none;
                }
                & td:last-child{
                    
                }
                &:hover{
                    border-left: 3px solid ${lighten(0.1, Theme.PrimaryColor)};
                    background-color: ${lighten(0.7, Theme.PrimaryColor)};
                }
            }
            & td{
                padding: 15px;
                font-size: ${Theme.PrimaryFontSize};
                border-left: 1px solid ${lighten(0.66, Theme.PrimaryFontColor)};
                transition: ${Theme.PrimaryTransition};
            }

        }
    }
`;

const FootTable = styled.div`
    min-height: 50px;
`;
const Pretable = styled.div`
    display: none;
    padding: 10px;
    /* background: ${lighten(0.2, Theme.PrimaryGrey)}; */
    /* border-radius: ${Theme.PrimaryRadius} ${Theme.PrimaryRadius} 0 0; */
    color: ${Theme.PrimaryFontColor};

    & span{
        color: ${Theme.PrimaryFontColor};
        font-size: 1rem;
    }

    ${InputWrapper}{
        background: none;
        &:before{
            color: ${Theme.PrimaryFontColor};
           height: 38px;
        }
        &:hover{
            
        }
        &:focus{
        
        }
        & input{
        background: rgba(255,255,255,0.4);
        border-color: rgba(255,255,255,0);
        color: ${Theme.PrimaryFontColor};
        font-size: 14px;
        height: 38px;
        border-radius: ${Theme.PrimaryRadius};
        }
    }
`;

const PaginationWrapper = styled.div`
    text-align: right;
    color: ${Theme.PrimaryFontColor};
    position: relative;

    & .rc-pagination{
        list-style: none;
        margin: 0;
        padding:0;
        display: inline-flex;
        flex-direction: row;

         
        & .rc-pagination-prev{
            & a{
                &:after{
                font-family: 'flexisaf';
                content: '\\f104';
                color: ${Theme.PrimaryColor};
                /* font-size: 18px; */
                font-weight: bold;
                }
            }  
        }
        & .rc-pagination-next{
            & a{
                &:after{
                font-family: 'flexisaf';
                content: '\\f105';
                color: ${Theme.PrimaryColor};
                /* font-size: 18px; */
                font-weight: bold;
                }
            }  
        }
        &>li{
            border:0;
            height: 50px;
            width: 40px;
            border-left: 1px solid ${lighten(0.66, Theme.PrimaryFontColor)};
            display: block;
            text-align: center;
            padding: 15px 0;
            box-sizing: border-box;
            font-size: 13px;
            margin:0;
            border-radius: 0;
            
            transition: background-color 0.3s ease-out;
            cursor: pointer;
            &.rc-pagination-disabled{
                color: #ccc;
                & a:after{
                    color: #ccc;
                    font-weight: normal;
                }
                &:hover{
                    background: none;
                }
            }
            &.rc-pagination-item-active{
                color: ${darken(0.1, Theme.PrimaryColor)};
                font-weight: bold;
                padding: 14px 0 15px 0;
                background-color: ${lighten(0.43, Theme.PrimaryColor)};
                border-top: 2px solid ${Theme.PrimaryColor};
                margin-top: -1px;
                height: 51px;
                & a{
                color: ${Theme.PrimaryColor};
                }
            }
            &:active{
                outline: none;
            }
            &:focus{
                outline: none;
            }
            &:hover{
                outline: none;
                background-color: ${lighten(0.7, Theme.PrimaryFontColor)};
            }
        }
    }
    & .rc-pagination-jump-next, .rc-pagination-jump-prev{
        & a:after{
            content: '...';
        }
    }
    & li.rc-pagination-total-text{
        width: auto;
        border: none;
        padding: 15px 15px;
        background: none;
        opacity: 0.6;
        font-size: 12px;
        &:hover{
            background: none;
        }
    }
    & .page-sizer{
        display: inline-block;
        position: absolute;
        left:0;
        top:0;
        width: 120px;
        text-align: left;
        & .flexisaf__control{
            height: 30px;
            margin: 5px;
        }
    }
`;


export class FlexiTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <TableWrapper>
                <Pretable>
                    <Grid default="repeat(3,1fr)">
                        <Input type="search" />
                        <Boxed></Boxed>
                        <Boxed align="right">
                            <span>20 of 300</span>
                            <div>5 Selected</div>
                        </Boxed>
                    </Grid>
                </Pretable>
                <Table
                    {...this.props}
                >{null}</Table>
                {this.props.children && (
                    <FootTable>
                        {this.props.children}
                    </FootTable>
                )
                }
            </TableWrapper>
        )
    }
}

export class FlexiPagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: this.props.pageCounts[0]
        }
    }

    changePages = (selectedOption) => {
        this.setState({ pageSize: selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    render() {
        return (
            <PaginationWrapper>
                <div className="page-sizer">
                    {this.props.itemsDisplayed &&
                        <SimpleSelect
                            placeholder="items"
                            options={this.props.pageCounts}
                            value={this.state.pageSize}
                            onChange={this.changePages}
                            isSearchable={false}
                        />
                    }
                </div>
                <Pagination
                    {...this.props}
                    showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} ${total > 1 ? pluralize(this.props.valueType) : this.props.valueType}`}
                    pageSize={this.state.pageSize.value}
                />
            </PaginationWrapper>
        )
    }
}

FlexiPagination.defaultProps = {
    valueType: "item",
    itemsDisplayed: false,
    current: 0,
    total: 0
};

FlexiPagination.propTypes = {
    valueType: PropTypes.string,
    pageCounts: PropTypes.array.isRequired,
    total: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number,
    itemsDisplayed: PropTypes.bool,
};

FlexiTable.defaultProps = {
    forminput: false,
};

FlexiTable.propTypes = {
    forminput: PropTypes.bool
};


