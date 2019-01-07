import React from "react";
import styled, { keyframes, css } from 'styled-components';
import { darken, lighten, transparentize } from 'polished';
import { Fade } from 'react-slideshow-image';
import { Theme } from '../../../components/flex/theme';
import { Input, Button, P, H2, Layout, Boxed, H4, Space } from "../../../components/flex";
import Logo from '../../../components/assets/logo.png';
import Slide1 from '../../../components/assets/slider1.jpg';
import Slide2 from '../../../components/assets/slider2.jpg';
import Slide3 from '../../../components/assets/slider3.jpg';


const properties = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: true,
  indicators: false,
  arrows: false
}

const Slideshow = () => {
  return (
    <Fade {...properties}>
      <div className="each-slide" style={{ 'backgroundImage': `url(${Slide1})` }}></div>
      <div className="each-slide" style={{ 'backgroundImage': `url(${Slide2})` }}></div>
      <div className="each-slide" style={{ 'backgroundImage': `url(${Slide3})` }}></div>
    </Fade>
  )
}
const moveup = keyframes`
  to {
    bottom: 600px;
    transform: rotateZ(360deg);
  }
`;
const moveside = keyframes`
  to {
    left: 600px;
    transform: rotateZ(360deg);
  }
`;

const LoginBox = styled.div`
  display: grid;
  grid-template-columns: auto 400px;
  min-height: 100vh;
  width: 100%;
  font-size: 12px;
  color: rgba(255,255,255,0.8);

  &:after{
    z-index: -1px;
    background: #000;
    opacity: 0.2;
    width: 500px;
    height: 500px;
    border-radius: 10%;
    position: fixed;
    top: -250px;
    left: -250px;
    content: '';
    animation: ${moveside} 20s linear alternate both infinite;
  }
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
  position: relative;
  z-index: 1;
  background: ${Theme.Gradient("rgba(0,0,0,0.3)", "rgba(0,0,0,4)")};

  ${H4}{
    text-shadow: 0 0 5px rgba(255,255,255,0.2);
    opacity: 0.9;
  }
  
  &:before{
    z-index: -1px;
    background: #222;
    opacity: 0.5;
    width: 200px;
    height: 200px;
    border-radius: 10%;
    position: absolute;
    bottom: 0px;
    right: -100px;
    content: '';
    animation: ${moveup} 20s linear alternate both infinite;
  }

  &>div{
    max-width: 500px;
  }
  & strong{
    display: block;
    margin-bottom: 15px;
  }
  & ol{
    margin:0;
    padding:15px 15px;
    border-top: 1px solid ${lighten(0.6, Theme.PrimaryFontColor)};
    color: rgba(255,255,255,0.6);
    & li{

    }
  }

  & .neco-foot{
    position: fixed;
    bottom: 20px;
    width: 100vw;
  }
`;

const FormBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: -5px 0 25px ${transparentize(0.9, Theme.PrimaryFontColor)};
  position: relative;
  padding: 20px;
  z-index: 10;

  & form{
    width: 100%;
  }
`;

const SlideGuy = styled.div`
  position: fixed;
  top:0;
  left:0;
  z-index: 0;
  height: 100vh;
  width: 100vw;
  & .nav{
    display: none;
  }
  & .indicators{
    display: none;
  }
  & .react-slideshow-container{
    height: 100vh;
  }
  & .each-slide{
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: left center;
  }
`;


export const Login = ({ login, error, updateInfo, usersPending, submit }) => {
  const form = React.createRef();
  return (
    <React.Fragment>
      <Layout>
        <LoginBox>
          <DetailBox>
            <div>
              <H4 size="large" color="#fff">Project Performance Monitoring and Delivery System</H4>
              <Space height="20" />
              <P color="rgba(255,255,255,0.6)">
                Centralized project and contractor information tool for continous project performance tracking, allowing to analyze results and guide management to appropraitely pay contractors based on real time performance and to help guide in the development improvement plans.
              </P>


            </div>

            <div className="neco-foot">&copy; 2019 Federal Ministry of Agriculture and Rural Development. All Rights Reserved.</div>
          </DetailBox>
          <SlideGuy>
            <Slideshow />
          </SlideGuy>
          <FormBox>

            <form ref={form} onSubmit={login}>
              <img src={Logo} style={{ height: "80px" }} />
              <H4 className="mbottom">Log in</H4>
              <Space height={20} />
              <Input
                label="email"
                className="mbottom"
                placeholder="email"
                name={"username"}
                onChange={e => updateInfo(e, "username")}
                forminput
              />
              <Input
                label="password"
                className="mbottom"
                type="password"
                placeholder="password"
                onChange={e => updateInfo(e, "password")}
                forminput
              />
              {!usersPending ? (
                <Button onClick={() => submit(form)} className="pull-left">
                  {" "}
                  Submit
          </Button>
              ) : (
                  <Button className="pull-left" progress={true}>
                    {" "}
                    Loading ...
          </Button>
                )}
              {error ? <P>{error}</P> : null}
            </form>
          </FormBox>
        </LoginBox>
      </Layout>
    </React.Fragment>
  );
};
