import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import Cookies from 'js-cookie';

import { UserContext } from "../contexts/User";

export default function Navbar() {
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  const [state, dispatch] = useContext(UserContext)
  const [username, setUsername] = useState(state.username);
  

  //axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})
  useEffect(() => {
    setUsername(state.username)
  }, [state.username]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    dispatch({ type: "logged_out" });
    Cookies.remove('token') //cookie actually does remove. Just need to refresh
  }
  //<button onClick={() => console.log(1233, state)}>asdf</button>
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/home">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/home">Layout</Link>
            </MenuItem>
          </Menu>
          {username ? <>
          <Button>{state.username}</Button>
          <Button>
            <Link to='/barkcreate'>
              Create Post
            </Link>
          </Button>
        </>
          : <>
            <Button>
              <Link to='/login'>
                Login to Post
              </Link>
            </Button>
          </>
        }

        </div>
        <Typography variant="h6" className={classes.title}>Navigate</Typography>
        <Avatar alt="Creative Tail Animal cat" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Creative-Tail-Animal-cat.svg/128px-Creative-Tail-Animal-cat.svg.png" />
        {username ? <>
          <Button>{state.username}</Button>
          <Button onClick = {handleLogout}>
            <Link to='/login'>Logout</Link>
          </Button>
        </>
          : <>
            <Button>
              <Link to='/register'>Register</Link>
            </Button>
            <Button>
              <Link to='/login'>Login</Link>
            </Button>
          </>
        }

      </Toolbar>
    </AppBar>
  );
}
