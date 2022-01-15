import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as Scroll} from 'react-scroll'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AboutCard from '../About/AboutCard';
import AboutVision from '../About/AboutVision';
import AboutMision from '../About/AboutMision';
import AboutValores from '../About/AboutValores';
import Footer from '../../Components/Footer/Footer';
import styles from './Landing.module.css';
import logoLanding from '../../assets/Mobil-background-landing.png';
import logo from '../../assets/Mobil-Full-Header-Logo.png'
import logo1 from '../../assets/WEB-Logo-Combinado.png';




export default function Landing() {

  // const [checked , setChecked] = useState(false)

  // useEffect(() => {
  //   setChecked(true);
  // }, [])
  
  return (
    <div>
    <div className={styles.landing}>
    <img className={styles.logo1} src={logo1} alt="" />
      <img className={styles.logo} src={logo} alt=""/>
      {/* <Collapse in={checked} {...checked ? { timeout: 1000}: {}} collapsedHeight={50}> */}
      <div className={styles.content}>
        <div className={styles.divImgLanding}>
          <img className={styles.imglogolanding} src={logoLanding} alt="logo" />
        </div>
        <div>
        <div className={styles.btncont}>
         <IconButton>
         <Stack spacing={1} direction="row">
         <Link to="/login">
           <Button variant="contained" size="small"type='submit'>Ingresar</Button>
           </Link>
          <Link to="/register">
          <Button variant="contained" size="small" type='submit' >Registrarse</Button>
          </Link>
          <Link to="/home">
          <Button variant="contained" size="small" type='submit'>
              Continuar
            </Button>
          </Link>
          </Stack>
          </IconButton>
          </div>
        </div>
        <Scroll to='place-to-visit' >
        <IconButton>
          <KeyboardArrowDownIcon className={styles.goDown} sx={{fontSize: 50, position: 'relative', bottom: 5,}}/>
          </IconButton>
       </Scroll>
      </div>
      {/* </Collapse> */}
      </div>
      <div className={styles.aboutCards} id= 'place-to-visit'>
      <div   >
      <AboutCard />
      </div>
      <div>
      <AboutValores />
      </div>
      </div>
      <div className={styles.containerAbouts}> 
      <div>
      <AboutMision />
      </div>
      <div>
      <AboutVision />
      </div>
      </div>
      <div>
      <Footer />
      </div>
      
    </div>
    
  );
}
