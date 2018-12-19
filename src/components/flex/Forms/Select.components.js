// import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Theme } from '../theme'; 
import { InputWrapper } from './Inputs.components';
import { Label } from '../index';

export class SimpleSelect extends React.Component { 
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return (
            <InputWrapper {...this.props}>
                {this.props.label && <Label>{this.props.label}</Label>}
                <Select
                    {...this.props}
                    classNamePrefix="flexisaf"
                />
                {this.props.error && <em>{this.props.error}</em>}
            </InputWrapper>  
        )
    }
}


SimpleSelect.defaultProps = {
    color: Theme.PrimaryFontColor,
};

SimpleSelect.propTypes = {
    fontSize: PropTypes.string,
    options: PropTypes.array.isRequired
};

