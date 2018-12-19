
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import styled, { css } from 'styled-components';
import { darken, lighten, transparentize } from 'polished';
import { Theme } from '../theme'; 
import { HamburgerClose } from '../';

export const AppBrand = styled.div`
    height: 60px;
    margin-bottom: 10px;
    padding: 0 10px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 0;
    transition: ${Theme.PrimaryTransition};
    opacity: 1;

    & svg,img{
        height: 40px;
    }
`;

export const SideList = styled.ul`
    list-style: none;
    padding:0;
    margin:0;

    & li{
        padding:0;
        margin:0;
        list-style: none;
        position: relative;
        width: 100%;
        
        & .menuItem{
          height: 50px;
          color: inherit;
          text-decoration: none;
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-items: center;
          cursor: pointer;
          overflow: hidden;
          max-width: 100%;
          transition: 0.5s ease-in-out;
          flex-wrap: nowrap;
          &.withIcon:after{
            font-family: 'flexisaf';
            content:'\\f107';
            display:block;
            /* width: 50px; */
            text-align:center;
            justify-self: flex-end;
            transition: all 0.3s ease-out;
          }
          &.withIcon.uncollapse{
            text-shadow: 0 0 3px rgba(255,255,255,0.2);
            &:after{
              content: '\\f106'; 
            }
          }
          & i{
            /* width: 50px; */
            flex-grow: 0;
            flex-shrink: 0;
            text-align: center;
            display: block;
          }
          & span{
            flex-grow: 1;
          }
        }
        & ul{
          list-style: none;
          padding:0;
          margin:0;
          max-height: 0;
          transition: all 0.3s ease-in-out;
          overflow-y: hidden;
        }
        &.uncollapse{
          &>ul{
            max-height: 300px;
          }
        }
      }
`;
export const SidePanel = styled.div`
    width: 100%;
    max-width: ${props=> props.width};
    font-size: ${props => props.fontSize};
    transition: ${Theme.PrimaryTransition};
    flex-shrink: 0;
    flex-grow: 0;
    z-index: ${props => props.zIndex};
    position: relative;
    background-color: ${props => props.background};
    color: ${props => props.color};

    & .cardprofile{
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    ${SideList}{
      color: ${props => props.color};
      & li{
        &:hover{
          background-color: ${props=> props.hoverLink};
        }
        & .menuItem{
          white-space: nowrap;
          text-overflow: nowrap;
          & i{
            width: ${props => props.collapsedWidth};
          }
          &:after{
            width: ${props => props.collapsedWidth};
          }
          &:active{
            background-color: ${props=> props.activeLink};
          }
          &.active{
            background-color: ${props=> props.activeLink};
          }
        }
        &.withSub:hover{
          background-color: ${props => darken(0.06, props.background)};
        }
      }
      
      & .uncollapse{
          &>ul{
            background-color: ${props => darken(0.03, props.background)};
          }
      }
    }


    ${props => !props.float && props.collapse && css`
        max-width: ${props => props.collapsedWidth};
        ${SideList}{
          &>li{
            max-height: 300px;
            position: relative;
            width: ${props => props.collapsedWidth};

            
            &>.menuItem{
              max-width: ${props => props.collapsedWidth};
            }
            
            & ul{
              position: absolute;
              background-color: ${props => darken(0.03,props.background)};
              z-index: 1001;
              min-width: ${props => props.width};
              top:0;
              left: ${props => props.collapsedWidth};
              overflow: visible;
              display: none;
              &>li{
                & span{
                  padding: 0 15px;
                }
              }
              & i{
                display: none;
              }
            }
            &.uncollapse{
              &>.menuItem{
                background-color: ${props => darken(0.05, props.background)};
                width: 100%;
                transition: none;
              }
              &>ul{
                height: auto;
                display: block;
                & .listTitle{
                  height: 50px;
                  display: flex;
                  padding: 0 15px;
                  align-items: center;
                  background-color: ${props => darken(0.05, props.background)};
                }
                &:before{
                  position: absolute;
                  top:0;
                  left:-${props => props.collapsedWidth};
                  height: 50px;
                  width: ${props => props.collapsedWidth};
                  content:'';
                  display: block;
                  z-index: 1002;
                }
              }
            }
          }
        }
        & .cardprofile{
          & .picture{
            width: 30px;
            height: 30px;
          }
          & span,em{
            display: none;
          }
        }
        ${AppBrand}{
          opacity:0;
          width: ${props => props.collapsedWidth};
        }
        
        ${props => props.light && css`
          ${AppBrand}{
            & svg, img{
              filter: invert();
            }
          }
        `}
    `}
    ${AppBrand}{
      ${props => props.light && css`
          border-color: ${props => darken(0.06,props.background)};
      `}
    }
    & .cardprofile{
        ${props => props.light && css`
          border-color: ${props => darken(0.06, props.background)};
      `} 
    }

    & .SideMenu_icon{
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-content: center;
        justify-content: center;
        width: ${props => props.collapsedWidth};
        height: 60px;
        transition: ${Theme.PrimaryTransition};
        cursor: pointer;
        text-align: center;
        z-index: 1000;
        &:hover{
            /* background: rgba(255,255,255,0.1); */
        }
    }
    & .cage{
        position: relative;
    }

    ${props => props.float && css`
        position: absolute;
        top:0;
        left:0;
        height: 100%;
        & .listTitle{
          display:none;
        }
        ${props => props.collapse && css`
            max-width: 0px;
            & .SideMenu_icon{
              right: -${props => props.collapsedWidth};
              background-color: ${props.background};
            }
            & .cardprofile{
              width: 0;
              overflow: hidden;
              & .cardCage{
                width: ${props => props.width};
              }
            }
        `}
      & .cage{
        /* width: ${props => props.width}; */
      }
    `}
`;

export class SideNavigation extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }



  render() {
    const themeBackground = this.props.light ? this.props.lightBackground : this.props.background
    const themeColor = this.props.light ? this.props.lightColor : this.props.color
    const themeHover = this.props.light ? lighten(0.3,this.props.hoverLink) : this.props.hoverLink

    return (
      <SidePanel 
      collapse={this.props.collapse} 
      float={this.props.float} 
      light={this.props.light} 
      width={this.props.width} 
      color={themeColor} 
      collapsedWidth={this.props.collapsedWidth} 
      fontSize={this.props.fontSize}
      background={themeBackground}
      zIndex={this.props.zIndex}
      hoverLink={themeHover}
      activeLink={this.props.activeLink}
      >
        <div className="SideMenu_icon" onClick={this.props.onClick}>
          <HamburgerClose
            open={!this.props.collapse}
            color={themeColor}
            fontSize="16px"
            timing={0.4}
            delay={0.2}
          />
        </div>
        <div className="cage">
          {this.props.children}
        </div>
      </SidePanel>
    )
  }
}

const singleObject = (theObject) => {
  return [].concat(...function _flattenObject(child, parent) {
    return [].concat(...Object(child).map(elem => {
      return [].concat(({ name: elem.name, id: elem.id, parent: parent ? parent : 0, collapse: false }), elem.sub ? _flattenObject(elem.sub, elem.id) : [])
    })
    )
  }(theObject))
}


const UUIDify = (list) => {
  return [].concat(list.map(elem => {
    elem.id = Theme.CreateUUID()
    elem.sub = elem.sub && UUIDify(elem.sub)
    return elem
  })
  )
}

export class SideListing extends React.Component {
  constructor() {
    super();
    this.state = {
      raw: [],
      flattened: []
    }
  }

  componentDidMount() {
    this.setState({
      flattened: singleObject(this.state.raw)
    })
  }
  componentWillMount() {
    this.setState({
      raw: UUIDify(this.props.links)
    })
  }
  setOpenParent(id) {
    let filters = Object.assign(this.state.flattened)
    let selection = filters.find(elem => elem.parent === id)
    selection.collapse = true
    this.setState({
      flattened: filters
    });
    selection.parent && this.setOpenParent(selection.id)
  }
  toogleActiveLink(id) {
    let filters = Object.assign(this.state.flattened)
    let selection = filters.find(elem => elem.id === id)
    selection.collapse = !selection.collapse;
    filters.filter(elem => elem.parent === selection.id).map(item => item.collapse = false)
    selection.collapse && filters.filter(elem => elem.id !== selection.id && elem.parent === selection.parent ).map(item => item.collapse = false )
    this.setState({
      flattened: filters
    });
    
    selection.collapse && selection.parent && this.setOpenParent(selection.id)
  }
  exitActiveLink(id) {
    let filters = Object.assign(this.state.flattened)
    let selection = filters.find(elem => elem.id === id)
    selection.collapse = false;
    this.setState({
      flattened: filters
    });
  }

  getElement(id) {
    let filters = this.state.flattened
    let selection = filters.find(elem => elem.id === id)
    return selection;
  }
  listLinks(list) {
    let filters = Object.assign(this.state.flattened)
    const linklist = list.map((elem) => {
      let flat = filters.find(item => item.id === elem.id)
      const elemProps = {
        href: elem.navlink
      };
      const navProps = {
        to: elem.navlink
      };
      const collapseProps = {
        onMouseEnter: () => elem.sub && this.toogleActiveLink(elem.id)
      };
      const collapseUlProps = {
        onMouseLeave: () => elem.sub && this.exitActiveLink(elem.id)
      }
      const openProps ={
        onClick: () => elem.sub ? this.toogleActiveLink(elem.id) : elem.click ? elem.click : null 
      };

      

      return (
          <li key={elem.id} className={`${flat && flat.collapse ? "uncollapse" : ""} ${elem.sub ? "withSub" : ""}`}>
          {this.props.NavLink && elem.navlink ?
            <NavLink
              {...navProps}
              {...this.props.collapse ? collapseProps : openProps}
              className={`menuItem ${elem.sub ? "withIcon" : ""} ${flat && flat.collapse ? "uncollapse" : ""}`}>
              <i className={elem.icon} /> 
              <span>{elem.name}</span>
            </NavLink>
            :
            <a
              {...elemProps}
              {...this.props.collapse ? collapseProps : openProps}
              className={`menuItem ${elem.sub ? "withIcon" : ""} ${flat && flat.collapse ? "uncollapse" : ""}`}>
              <i className={elem.icon} />
              <span>{elem.name}</span>
            </a>
          }
          {elem.sub && <ul {...this.props.collapse && collapseUlProps}>
          { this.props.collapse && <div className="listTitle">{elem.name}</div> }
          {this.listLinks(elem.sub)}
          </ul>}
        </li> 
      )
    })
    return linklist;
  }

  render() {
    return (
      <SideList>
        {
          this.listLinks(this.state.raw)
        }
      </SideList>
    )
  }
}


SideNavigation.defaultProps = {
  collapse: false,
  float: false,
  color: "#fff",
  width: "290px",
  collapsedWidth: "50px",
  light: false,
  fontSize: '1rem',
  background: Theme.PrimaryDark,
  lightBackground: "#f9f9f9",
  lightColor: Theme.PrimaryFontColor,
  zIndex: 1000,
  activeLink: Theme.PrimaryColor,
  hoverLink: transparentize(0.2, Theme.PrimaryColor)
};

SideNavigation.propTypes = {
  collapse: PropTypes.bool,
  float: PropTypes.bool,
  color: PropTypes.string,
  width: PropTypes.string,
  light: PropTypes.bool,
  fontSize: PropTypes.string,
  collapsedWidth: PropTypes.string,
  background: PropTypes.string,
  lightBackground: PropTypes.string,
  lightColor: PropTypes.string,
  zIndex: PropTypes.number,
  activeLink: PropTypes.string,
  hoverLink: PropTypes.string,
};

SideListing.defaultProps = {
  collapse: false,
  NavLink: false,
};

SideListing.propTypes = {
  collapse: PropTypes.bool,
  NavLink: PropTypes.bool,
  links: PropTypes.array.isRequired
};
