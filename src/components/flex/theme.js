import { darken, lighten, transparentize } from 'polished';
import { css } from 'styled-components';
import './fonts/fonts/fonts.css';


const BrandColor = "#017d34";
const BrandGrey = "#9DA2AD";

export const Theme = {
  PrimaryColor: BrandColor,
  PrimaryDark: darken(0.1, BrandColor),
  PrimaryLight: lighten(0.2, BrandColor),
  PrimaryPale: "#E7E8EB",

  PrimaryRed: "#F54B51",
  PrimaryBlue: "#2a78d0",
  PrimaryMint: "#A0E8AF",
  PrimaryOrange: "#FFCF56",

  PrimaryGrey: BrandGrey,
  PrimaryGreyDark: darken(0.4, BrandGrey),
  PrimaryGreyLight: lighten(0.25, BrandGrey),

  PrimaryFontFamily: "Open Sans",
  PrimaryFontSize: "12px",
  PrimaryFontColor: "#314659",
  SecondaryFontFamily: "Lato",
  PrimaryLineHeight: "1.6rem",


  PrimaryRadius: "2px",
  SecondaryRadius: "5px",

  PrimaryTransition: "0.3s ease-out",

  Shadow: transparentize(0.95, darken(0.3, BrandColor)),

  sizes: {
    giant: 1170,
    desktop: 992,
    tablet: 768,
    phone: 660
  },

  Gradient: (Primary, secondary) => {
    return (
      `background: ${Primary};
            background: -moz-linear-gradient(-45deg, ${ Primary} 0%, ${secondary} 100%);
            background: -webkit-linear-gradient(-45deg, ${ Primary} 0%,${secondary} 100%);
            background: linear-gradient(135deg, ${ Primary} 0%,${secondary} 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${ Primary}', endColorstr='${secondary}',GradientType=1 );`
    )
  },
  Truncate: (width) => {
    return `
          width: ${width};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;`
  },
  CreateUUID: () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }
};


export const media = Object.keys(Theme.sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${Theme.sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})