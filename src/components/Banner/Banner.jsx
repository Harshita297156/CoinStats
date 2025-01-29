import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'; // Updated import
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around", // Fixed typo from 'justifycontent' to 'justifyContent'
  },
  tagline:{
    display:"flex",
    height: "40%",
    flexDirection:'column',
    justifyContent:'center',
    textAlign:"center"
  },
}));

const Banner = () => {
  const classes = useStyles(); // Fixed missing parentheses
  return (
    <>
      <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
               <Typography 
               variant='h2'
               style={{
                fontWeight:"bold",
                marginBottom: 15,
                fontFamily:"Montserrat",
               }}
                >
                  Coin Stats 
               </Typography>
               <Typography 
               variant='subtitles2'
               style={{
                color:"darkgrey",
                textTransform:'capitalize',
                fontFamily:"Montserrat",
               }}
                >
                  get all the info regarding your favorite crypto currency
               </Typography>

          </div>
          <Carousel/>
        </Container>
      </div>
    </>
  );
};

export default Banner;
