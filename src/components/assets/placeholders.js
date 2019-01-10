import React from 'react';
import PropTypes from 'prop-types';
import styled, {css, keyframes} from 'styled-components';
import {lighten, transparentize, darken} from 'polished';
import {Theme} from "../flex/theme";

export const Vectors = styled.div`
    height: 400px;
    text-align: center;
    position: relative;
    &>div{
        height: 100%;
        position: relative;
    & svg{
        height: 100%;
        & .fade{
            opacity: 0.6;
        }
        & .highfade{
            opacity: 0.4;
        }
        & .white{
            fill: #fff;
        }
        & .light{
            fill: ${lighten(0.3, Theme.PrimaryGrey)};
        }
        & .darker{
            fill: ${Theme.PrimaryGreyDark};
        }
        & .dark{
            fill: ${lighten(0.3, Theme.PrimaryGreyDark)};
        }
        & .pale{
            fill: none;
        }
        & .stroke{
            stroke-width: 1;
            stroke: ${Theme.PrimaryGreyDark};
        }
        & .thickstroke{
            stroke-width: 2;
            stroke: ${Theme.PrimaryGreyDark};
        }
    }
    & i{
        font-size: 30px;
        color: ${Theme.PrimaryGrey};
    }
    & .vectorcontent{
        position: absolute;
        bottom: 30px;
        width: 100%;
        text-align: center;
        color: ${ darken(0.3, Theme.PrimaryFontColor)};
        & h5{
           margin: 5px;
           font-size: 16px;
           font-weight: normal;
           font-family: ${Theme.SecondaryFont};
           text-transform: uppercase;
        }
        & p{
            margin: 5px;
            font-size: ${Theme.PrimaryFontSize};
            opacity: 0.6;
        }
    }
    }
    ${props => props.floater && css`
        & .floater{
            animation: ${float} 1.5s ease-in-out infinite both alternate 0s;
        }
        & .strokeanimation{
            stroke-dasharray: 145;
            animation: ${widenAnimation} 1s ease-in-out infinite both alternate;
        }
        & .delay0{
            animation-delay: 0s;
        }
        & .delay1{
            animation-delay: 0.2s;
        }
        & .delay2{
            animation-delay: 0.6s;
        }
        & .delay3{
            animation-delay: 0.8s;
        }
        & .delay4{
            animation-delay: 1s;
        }
    `}
`;

const float = keyframes`
  to {
    transform: translateY(-20px) translateX(-10px) scale(1.03);
  }
`;

const widenAnimation = keyframes`
  from{
      /* opacity: 0; */
      /* transform: scaleX(0); */
      stroke-dashoffset: 0;
  }
  to{
      /* opacity: 1; */
      /* transform: scaleX(1); */
      stroke-dashoffset: 200;
  }
`;

const generate = (
<g className="floater">
		<path className="white thickstroke" d="M198.2,190.1v152.8c0,3.4,2.7,6.1,6.1,6.1h113.8c3.4,0,6.1-2.7,6.1-6.1V215.8c0-1.2-0.4-2.4-1-3.4L306,186.7
		c-1.1-1.7-3-2.7-5.1-2.7h-96.6C201,184,198.2,186.7,198.2,190.1z"/>
		<path className="white thickstroke" d="M301,184v26.6c0,2.7,2.2,4.8,4.8,4.7L324,215"/>
		<line className="strokeanimation delay0 darker thickstroke" x1="216.8" y1="229" x2="305.8" y2="229"/>
		<line className="strokeanimation delay1 darker thickstroke" x1="216.8" y1="250.8" x2="305.8" y2="250.8"/>
		<line className="strokeanimation delay2 darker thickstroke" x1="216.8" y1="272.5" x2="305.8" y2="272.5"/>
		<line className="strokeanimation delay3 darker thickstroke" x1="216.8" y1="294.2" x2="305.8" y2="294.2"/>
		<line className="strokeanimation delay4 darker thickstroke" x1="216.8" y1="316" x2="271.8" y2="316"/>
</g>
);
const noSettlement = (
	<g className="floater">
		<path className="white" d="M231.5,181.8c0,3.4,0,6.3,0,9.3c0,7.4,0,14.9,0,22.3c0,1.5-0.3,2.4-2,2.9c-12.7,3.6-21.4,18.7-14.1,32.4
			c4,7.5,9.1,14.2,14.6,20.6c0.8,0.9,1.3,2.3,1.4,3.5c0.1,5.2,0.1,10.5,0,15.7c0,0.9-0.7,2.2-1.4,2.5c-8.5,3.8-17,7.5-25.5,11.1
			c-0.3,0.1-0.6,0.1-1.2,0.3c0-1.1,0-2,0-2.9c0-33.7,0-67.4,0-101.1c0-2.1,0.6-3.1,2.5-4c7.8-3.7,15.5-7.6,23.2-11.4
			C229.7,182.6,230.4,182.3,231.5,181.8z"/>
		<path className="white" d="M300.9,173.4c0,5.6-4.3,10-9.9,10c-5.7,0-10-4.2-10-9.9c0-5.5,4.5-10.1,9.9-10.1
			C296.4,163.4,300.9,167.8,300.9,173.4z"/>
		<polygon className="white" points="236.1,176.2 236.4,293.9 290,315.3 338.9,291.4 338.9,175.4 287.5,196.1 		"/>
		<path className="light stroke" d="M289.7,319.6c-9.8-4-19.7-8-29.5-12c-7-2.8-14.1-5.7-21.2-8.4c-1-0.4-2.5-0.4-3.5,0.1c-11.5,4.8-22.9,9.7-34.3,14.5
			c-4.5,1.9-7.6-0.1-7.6-4.9c0-38.4,0-76.8,0-115.2c0-2.9,1.1-4.8,3.8-6.2c11.6-5.6,23.2-11.4,34.7-17.2c2.2-1.1,4.2-1.3,6.6-0.5
			c4.2,1.5,21,7.4,25.2,8.9c3.2,1.1,4.8,3.7,3.8,6.4c-0.9,2.6-3.5,3.6-6.7,2.6c-2.5-0.8-17.5-6.2-20.2-7.1c-0.1,0.9-0.2,1.5-0.2,2.1
			c0,10.2,0,20.5,0,30.7c0,1.6,0.4,2.3,2.1,2.8c12.3,3.4,21.2,18.3,14.4,31.8c-3.9,7.7-9,14.5-14.7,20.8c-1.2,1.3-1.8,2.7-1.8,4.5
			c0.1,4.8,0,9.6,0.1,14.5c0,0.8,0.7,2,1.3,2.3c14.2,5.8,28.5,11.6,42.7,17.3c0.2,0.1,0.5,0,1,0c0-1,0-2,0-3c0-22.3,0-44.6,0-67
			c0-0.7,0-1.4,0-2c0-3.7,2-6.1,5-6.1c2.9,0.1,4.7,2.3,4.7,6c0,22.8,0,45.7,0,68.5c0,1,0,2,0,3.3c1-0.4,1.7-0.7,2.4-1
			c11.7-5.7,23.4-11.4,35.1-17c1.4-0.7,2-1.4,2-3c-0.2-34.2-0.4-68.5-0.6-102.7c0-0.4-0.1-0.8-0.1-1.5c-1.2,0.5-16.2,8.3-17.3,8.7
			c-2.6,1.1-5.4,0.2-6.6-2.1c-1.2-2.4-0.3-5.3,2.3-6.7c3.4-1.8,20.9-10.8,24.5-12.3c3.5-1.5,6.5,0.6,6.6,4.4
			c0.3,38.4,0.5,76.8,0.9,115.2c0,3.8-1.4,5.8-4.7,7.3c-15.2,7.2-30.3,14.5-45.4,21.8c-0.8,0.4-1.5,0.9-2.3,1.4
			C291.4,319.6,290.6,319.6,289.7,319.6z M231.5,181.8c-1.1,0.5-1.9,0.8-2.6,1.2c-7.7,3.8-15.4,7.7-23.2,11.4c-1.9,0.9-2.5,2-2.5,4
			c0.1,33.7,0,67.4,0,101.1c0,0.9,0,1.8,0,2.9c0.6-0.1,1-0.1,1.2-0.3c8.5-3.7,17-7.3,25.5-11.1c0.7-0.3,1.3-1.6,1.4-2.5
			c0.1-5.2,0.1-10.5,0-15.7c0-1.2-0.6-2.6-1.4-3.5c-5.5-6.4-10.6-13.1-14.6-20.6c-7.3-13.7,1.4-28.8,14.1-32.4c1.7-0.5,2-1.3,2-2.9
			c-0.1-7.4,0-14.9,0-22.3C231.5,188.1,231.5,185.2,231.5,181.8z M236.4,261.8c5-5.9,9.6-11.8,12.8-18.6c2.5-5.4,0.8-11.6-4.1-15.4
			c-5.1-4-12-4.1-17.1-0.2c-5,3.8-6.8,10-4.4,15.5C226.7,250.1,231.4,255.9,236.4,261.8z"/>
		<path className="dark thickstroke" d="M290.6,225.2c-11-11.8-21.2-23.6-28.5-37.7c-6.3-12.2-4.8-23.7,3.8-34c8.7-10.5,20.3-14.2,33.5-10.6
			c13.1,3.6,20.7,12.8,23.1,26.1c1,5.8-0.2,11.4-2.6,16.8c-5.3,11.5-13.1,21.3-21.3,30.7C296.1,219.4,293.5,222.2,290.6,225.2z
			 M300.9,173.4c0-5.6-4.5-10-10-10c-5.5,0-9.9,4.6-9.9,10.1c0,5.7,4.2,9.9,10,9.9C296.6,183.3,300.9,178.9,300.9,173.4z"/>
		
		<path className="darker stroke" d="M236.4,261.8c-5-6-9.7-11.8-12.8-18.7c-2.4-5.5-0.6-11.8,4.4-15.5c5.2-3.9,12.1-3.8,17.1,0.2
			c4.8,3.8,6.5,10,4.1,15.4C246,250.1,241.4,256,236.4,261.8z M236.1,244.7c3.1,0,5.6-2.5,5.7-5.5c0.1-3.1-2.6-5.8-5.7-5.8
			c-3.1,0-5.6,2.5-5.7,5.6C230.3,242.1,232.9,244.7,236.1,244.7z"/>
		
		<path className="white" d="M236.1,244.7c-3.2,0-5.8-2.6-5.7-5.8c0.1-3.1,2.6-5.5,5.7-5.6c3.2,0,5.8,2.7,5.7,5.8C241.8,242.3,239.2,244.7,236.1,244.7
			z"/>
	</g>
);
const noLocation = (
		<g className="floater">
			<g>
				<path className="light stroke" d="M260,340c0,0-70.4-54.9-71.8-96.5c-1.3-38.9,28.3-75,71.8-74.5c43.4,0.5,70.4,31.1,70.4,74.5
					C330.4,277.8,284.2,317.1,260,340z"/>
				<circle className="white stroke" cx="259.5" cy="240.3" r="31.5"/>
				<g>
					<path className="darker" d="M299.9,301.4c-4.8,5.4-9.8,10.5-15,15.5c-5.7,5.5-11.5,10.9-17.2,16.3c-2.2,2.1-4.5,4.1-6.6,6.2
						c-0.7,0.7-1.1,0.6-1.9,0c-8.7-7.1-17-14.5-25-22.3c-10-9.8-19.4-20.1-27.6-31.3c-3-4.1-5.8-8.3-8.3-12.7c-0.4-0.7-0.5-1.1,0.2-1.8
						c8.5-8.9,16.9-17.8,25.4-26.7c2.3-2.5,5-4.5,8.6-4.9c3.7-0.5,6.7,1.1,9.3,3.5c1.1,1,2.1,2.1,3.2,3.1c7.5,7.5,15.1,15.1,22.7,22.6
						c0.3,0.3,0.6,0.8,1.1,0.9c0.1,0.5,0.5,0.8,0.9,1.1c7.9,7.9,15.8,15.8,23.6,23.7C295.3,296.9,297.6,299.2,299.9,301.4z"/>
					<path className="dark" d="M299.9,301.4c-2.3-2.3-4.6-4.5-6.9-6.8c-7.9-7.9-15.8-15.8-23.6-23.7c-0.3-0.3-0.8-0.6-0.9-1.1
						c4.1-4,8.1-8.1,12.2-12c4.2-4,10.8-3.8,14.8,0.2c7,7.1,13.9,14.2,20.9,21.3c0.4,0.4,0.5,0.7,0.2,1.3
						C311.6,288,306,294.9,299.9,301.4z"/>
				</g>
			</g>
			<g>
				<path className="thickstroke white" d="M316.4,338.9c-0.6,0.9-1.5,1.5-2.4,1.7c-1,0.2-2,0.1-2.9-0.5l-20.6-13.3c0,0,0,0-0.1-0.1
					c-3.4,3.8-8,6.7-13.3,7.8c-13.4,2.9-26.6-5.6-29.5-19c-2.9-13.4,5.6-26.6,19-29.5c13.4-2.9,26.6,5.6,29.5,19
					c1.1,5.3,0.5,10.5-1.5,15.1c0,0,0.1,0,0.1,0.1l20.6,13.2C317,334.7,317.5,337.1,316.4,338.9z"/>
				<ellipse className="thickstroke light" cx="271.8" cy="310.4" rx="19" ry="19"/>
				<ellipse className="fade light" cx="271.8" cy="310.4" rx="19" ry="19"/>
			</g>
		</g>
	);

const selectPlaceholder = (type) => {
	switch (type) {
		case "locations":
			return noLocation;
		case "settlements":
			return noSettlement;
		case "generate":
			return generate;
		default: 
			return null;
	}
}
const PlaceHolder = (props) => {
	return(
        <Vectors>
            <div>
		<svg viewBox="0 0 516 516">
			<path className="highfade light" d="M440,240.3L440,240.3c-6.9-18.9-28-28.7-46.9-21.8l-40.2,14.7c-3.1,1.1-5.7-2.4-3.8-5.1c7-9.5,9.3-22.3,5-34.2
				l0,0c-6.9-18.9-28-28.7-46.9-21.8l0,0c-2.3,0.8-4.6-1.4-3.8-3.7c2.5-7.5,2.5-15.9-0.4-23.8v0c-6.9-18.9-28-28.7-46.9-21.8
				l-138.4,50.4C98.9,180,89.1,201.1,96,220l0,0c2.8,7.6,7.9,13.8,14.2,17.9c2.4,1.6,1.9,5.2-0.8,6.2l-9.4,3.4
				c-18.9,6.9-28.6,27.9-21.5,46.7l0,0c6.9,18.9,28,28.7,46.9,21.8l44-16c2.2-0.8,3.9,1.8,2.4,3.6c-8.8,9.7-12.1,24-7.3,37.1l0,0
				c2.9,8.1,8.5,14.5,15.3,18.6c3.2,1.9,2.7,6.6-0.8,7.9l-49.9,18.2c-18.9,6.9-28.7,28-21.8,46.9l0,0c6.9,18.9,28,28.7,46.9,21.8
				L361,378.7c18.9-6.9,28.7-28,21.8-46.9l0,0c-3.1-8.4-8.9-15-16.2-19.2c-2.8-1.6-2.5-5.9,0.6-7l51-18.6
				C437.1,280.3,446.9,259.2,440,240.3z"/>
			<path className="thickstroke light" d="M384.9,373.9H133.6c-3,0-5.5-2.5-5.5-5.5V208.5c0-3,2.5-5.5,5.5-5.5h251.4c3,0,5.5,2.5,5.5,5.5v159.9
				C390.4,371.4,388,373.9,384.9,373.9z"/>
			<polygon className="thickstroke light" points="96.4,371.9 96.4,366.3 231.3,366.3 235.1,369 283.9,369 288.2,366.3 422.1,366.3 422.1,371.9 
				403.3,376.4 116,376.4 "/>
			<rect x="136.3" y="215.5" className="stroke white" width="245.9" height="141.2"/>
			<polygon className="white fade" points="96.4,366.2 231.3,366.2 235.1,368.9 283.9,368.9 288.2,366.2 422.1,366.2 422.1,371.3 96.4,371.3 "/>
			<polygon className="thickstroke pale" points="96.4,371.9 96.4,366.3 231.3,366.3 235.1,369.1 283.9,369.1 288.2,366.3 422.1,366.3 422.1,371.9 
				403.3,376.5 116,376.5 "/>
			<circle className="stroke pale" cx="259.2" cy="209.6" r="1.8"/>
			{ selectPlaceholder(props.type)}
		</svg>
		<div className="vectorcontent">
		<h5>{ props.title }</h5>
		<p>{ props.content }</p>
		</div>
            </div>
        </Vectors>
    );
};
PlaceHolder.defaultProps = {
	title: '',
	content: ''
}
PlaceHolder.propTypes = {
	title: PropTypes.any,
	content: PropTypes.string,
	type: PropTypes.string.isRequired
};

export default PlaceHolder;