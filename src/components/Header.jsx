
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { styled, ThemeProvider,createTheme } from '@mui/system';
import {useNavigate} from "react-router-dom";
import { CryptoState } from '../CryptoContext';
// Styled Title component
const Title = styled(Typography)({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
});


const Header = () => {
  // State for managing selected currency
  const navigate = useNavigate();
  const {currency,setCurrency}=CryptoState();

  
  
  return (
    <>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate("/")}>Coin Stats</Title>
            <Select
              variant="outlined"
              value={currency} // Bind value to the currency state
              onChange={(e)=>setCurrency(e.target.value)} // Handle currency change
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
      
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
      
    </>
  );
};

export default Header;
