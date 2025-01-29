import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from '../config/api';
import {CryptoState} from "../CryptoContext";
import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography,Pagination } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';




const Coinstable = () => {
    const [coins, setCoins] = useState([]);
    const [loading , setLoading ] = useState(false);
     const[ search, setSearch ]=useState("");
     const [page, setPage] = useState(1);

     const navigate = useNavigate();

    const {currency, symbol} = CryptoState();

    const fetchCoins = async()=>{
        setLoading(true);
      const { data } = await axios.get(CoinList(currency));// destructuring our data thats why we have write in curly braces 
      
      setCoins(data);
      setLoading(false);
    };

    console.log(coins);

    useEffect(()=>{
       fetchCoins();
    },[currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark", // Use "mode" instead of "type" in MUI v5 and above
        },
    });

    const handleSearch =()=>{
        return coins.filter(
            (coin)=>(
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }
 
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const classes = makeStyles((theme) => ({
        row: {
            backgroundColor:"#16171a",
          cursor: "pointer",  // Example of a row style
          "&:hover": {
            backgroundColor: "#131111",  // Change on hover
          },
          fontFamily:"Montserrat",
        },
       
      }));

      
    
  return(
    <>
    <ThemeProvider theme={darkTheme}>
         <Container style={{textAlign:"center"}}>
           <Typography
               variant='h4'
               style ={{margin:18, fontFamily:"Montserrat"}}>
               Crypto price by market cap
           </Typography>
           <TextField
            label =" Search for crypto currency .."
            variant='outlined'
            style={{marginBottom:20 , width: "100%"}}
            onChange={(e)=>setSearch(e.target.value)}
           />

           <TableContainer>
           { 
            loading ?(
                <LinearProgress style= {{backgroundColor :"gold "}}/>
                ): (
                    <Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                        <TableRow>
                            {["coin", "Price", "24th change", "Market Cap"].map((head)=>(
                                <TableCell
                                    style={{
                                        color:"black",
                                        fontWeight:"700",
                                        fontFamily:"Montserrat",
                                        }}
                                        key={head}
                                        align={head==="coin"?"":"right"}
                                        >
                                        {head}
                                </TableCell>
                            )
                            )}
                        </TableRow>
                        </TableHead>

                        <TableBody>
                           { handleSearch().slice((page-1)*10,(page-1)*10+10)
                           .map((row)=>{
                            const profit = row.price_change_percentage_24h>0;

                            return(
                                <TableRow 
                                onClick ={()=>  navigate(`/coins/${row.id}`)}
                                className ={classes.row}
                                key={row.name}
                                    >
                                    <TableCell component='th' scope=' row'
                                    stules={{
                                        display:"flex",
                                        gap:15,
                                    }}>
                                    <img
                                        src={row?.image}
                                        alt={row.name}
                                        height="50"
                                        style={{marginBottom:10}}
                                    />

                                    <div 
                                    style={{ display:"flex", flexDirection:"column"}}>

                                    <span
                                       style={{
                                        textTransform:"uppercase",
                                        fontSize:22,
                                       }}
                                    >
                                     
                                     {row.symbol}
                                    </span>

                                    <span style={{color:"darkgrey"}}>{row.name}</span>
                                    </div>
                                    </TableCell>

                                   <TableCell
                                      align='right'>
                                      {symbol}{""}
                                      {numberWithCommas(row.current_price.toFixed(2))}

                                   </TableCell>

                                   <TableCell
                                     align="right"
                                     style={{
                                        color: profit>0 ? "rgb(14,203,129)":"red",
                                        fontWeight:500,
                                     }}
                                   > 
                                    {profit && "+"}
                                    {row.price_change_percentage_24h.toFixed(2)}%

                                   </TableCell>

                                   <TableCell align="right">
                                      {symbol}{""}
                                      {numberWithCommas(
                                        row.market_cap.toString().slice(0,-6)
                                      )}
                                      M
                                   </TableCell>
                                </TableRow>
                            )
                           })}
                        </TableBody>
                    </Table>
                    )
            }
            <Pagination
                    count={Math.ceil(handleSearch().length / 10)} // Calculate total pages
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ul: classes.Pagination}}
                    onChange={(_, value) => {
                        setPage(value); // Update page state
                        window.scroll(0, 450); // Scroll to table
                    
                }}
                />

           </TableContainer>

         </Container>
    </ThemeProvider>
    </>
  )
}

export default Coinstable;
