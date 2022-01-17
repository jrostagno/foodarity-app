/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
// import DetailsIcon from '@mui/icons-material/Details';
// import InventoryIcon from '@mui/icons-material/Inventory';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { apiWithToken } from '../../services/api';
import CompanyDetail from './CompanyDetail';
import PostNewBatch from './PostNewBatch';
import PublishedProduct from './PublishedProduct';
// import PrimarySearchAppBar from '../Navbar/NavbarCommerce';
import Orders from './Orders';
import Usuarios from './Usuarios';
import Donations from './Donations';
import styles from './ProfileTempleteCommerce.module.css';
import Delete from './Delete';

const drawerWidth = 240;

const generalHeight = 58;

function ProfileTempleteCommerce(props) {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [company, setCompany] = useState({});

  const [commerceDonations, setCommerceDonations] = useState([]);
  
  const [ongDonations, setOngDonations] = useState([]);
  
  const [logged, setLogged] = useState('loading');
  

  useEffect(() => {
    apiWithToken
      .get('/orders/company')
      .then((response) => setOrders(response.data));

    apiWithToken.get(`/companies/byuser`).then((response) => {
      setCompany(response.data);
      if (response.data.id) {
        setLogged('true');
      } else {
        setLogged('false');
      }
    });

    apiWithToken.get('/donation/commerce').then((response) => {
      setCommerceDonations(response.data);
    });

    apiWithToken.get('/donation').then((response) => {
      setOngDonations(response.data);
    });
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [display, setDisplay] = React.useState(-1);

  function handleDisplay(index) {
    setDisplay(index);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setDisplay(0);
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider
        className={styles.barra}
        sx={{ height: generalHeight, border: 0, margin: 0 }}
      />
      <List className={styles.barra}>
        {[
          {
            text: 'Detalles de Cuenta',
            typesAllow: [1, 2],
          },
          { text: 'Usuarios', typesAllow: [1, 2] },

          {
            text: 'Productos',
            typesAllow: [1],
          },
          {
            text: 'Ventas',
            typesAllow: [1],
          },
          { text: 'Donaciones', typesAllow: [1, 2] },
          {
            text: 'Publicar Nuevo Lote',
            typesAllow: [1],
          },
        ].map(
          ({ text, typesAllow }, index) =>
            typesAllow.includes(company.company_type_id) && (
              <ListItem
                button
                key={text}
                onClick={() => {
                  handleDisplay(index);
                }}
              >
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            )
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="Eliminar cuenta"
          onClick={() => handleDisplay(99)}
        >
          <ListItemText primary="Eliminar cuenta" sx={{ color: 'red' }} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const loggedRender = (
    <div sx={{ position: 'inherital' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `100%`, zIndex: 9999 },
            ml: { sm: `${drawerWidth}px` },
            top: 0,
          }}
        >
          {/* <PrimarySearchAppBar />  */}
          <Toolbar sx={{ height: generalHeight * 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ paddingTop: generalHeight / 7.5 }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              {company.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: 0,
          }}
        >
          <Toolbar display="inline" />
          {display === 0 && <CompanyDetail company={company} />}
          {display === 1 && (
            // eslint-disable-next-line react/jsx-no-bind
            <Usuarios company={company} />
          )}
          {display === 2 && <PublishedProduct/>}
          {display === 3 && <Orders orders={orders} />}
          {display === 4 && (
            <Donations
              donations={
                company.company_type_id === 1 ? commerceDonations : ongDonations
              }
              typeId={company.company_type_id}
            />
          )}
          {display === 5 && <PostNewBatch />}

          {display === 99 && <Delete company={company} />}
        </Box>
      </Box>
    </div>
  );

  // TODO
  const loading = <div>CARGANDO...</div>;

  return (
    <div>
      {logged === 'true' && loggedRender}
      {logged === 'false' && navigate('/home')}
      {logged === 'loading' && loading}
    </div>
  );
}

ProfileTempleteCommerce.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // eslint-disable-next-line react/require-default-props
  window: PropTypes.func,
};

export default ProfileTempleteCommerce;
