import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid, CssBaseline, Paper, AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import './DefaultLayout.css';
import ListFriendsMenu from "../components/ListFriendsMenu/ListFriendsMenu";
import Header from "../components/Header/Header";
import CategoriesMenu from "../components/CategoriesMenu/CategoriesMenu";


const DefaultLayout = () => {
  const isSmallScreen = useMediaQuery('(max-width:400px)');
  console.log('Is small screen:', isSmallScreen);

  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          paddingTop: '64px', // Điều chỉnh dựa trên chiều cao của AppBar
          width: '100%', // Đảm bảo chiếm toàn bộ chiều rộng
          overflow: 'hidden' // Ngăn cuộn thừa ở container
        }}
      >
        <Grid container style={{ flex: 1, height: '100%' }}>
          {/* Categories Menu */}
          <Grid item xs={12} md={3}>
            <Box
              className="no-scrollbar"
              sx={{
                display: { xs: 'none', md: 'block' },
                height: '100%',
                position: 'sticky',
                top: 0,
                overflowY: 'auto'
              }}
            >
              <Paper style={{ height: '100%' }}>
                <CategoriesMenu />
              </Paper>
            </Box>
          </Grid>

          {/* Posts (Main Content) */}
          <Grid item xs={12} md={6} className="no-scrollbar" style={{
            overflowY: 'auto',
            height: '100%',
          }}>
            <Box >
              <Outlet />
            </Box>
          </Grid>

          {/* List Friends Menu */}
          <Grid item xs={12} md={3}>
            <Box
              className="no-scrollbar"
              sx={{
                display: { xs: 'none', md: 'block' },
                height: '100%',
                position: 'sticky',
                top: 0,
                overflowY: 'auto'
              }}
            >
              <Paper style={{ height: '100%' }}>
                <ListFriendsMenu />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DefaultLayout;
