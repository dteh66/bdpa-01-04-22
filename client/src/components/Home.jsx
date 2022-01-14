import React, { forwardRef, useState, useEffect } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"
import axios from 'axios';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { getPosts } from './barkFetch';
import { Link } from "react-router-dom"
import Bark from '../templates/Bark';
import DataGridEx from '../templates/DataGridEx';
import BarkCreate from './BarkCreate'
import { UserContext } from "../contexts/User";

export default function Home() {

  //const username = await axios.get(`/barks?token=${Cookies.get("token")}`)
  //console.log(username)

  // const username = await axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})

  //the component "followSuggestion" is a component with a list of all users to follow
  //sort barks from front end (aka here)

  //make backend send pack barks. can sort if need be
  //make backend send normal barks. we need to sort these

  //sort barks from front end (aka here)
  const [state, dispatch] = React.useContext(UserContext)

  const [postsFollowed, setPostsFollowed] = useState([])
  const [postsOther, setPostsOther] = useState([])
  const [renderedPosts, setRenderedPosts] = useState([]);
  const itemLimit = 10;
  const API_URL = process.env.REACT_APP_APIURL

  useEffect(() => {
    const updatePosts = async () => {
      const fetchedPosts = await axios.get(API_URL + "/bark/", {
          headers: {
              'Authorization': 'Bearer ' + Cookies.get('token')
          }
      })
      .then((response) => {
          //console.log("Home: getPosts returned ", response.data)
          console.log(123,response.data.barks, 456, response.data.unfollowedBarks)
          setPostsFollowed(response.data.barks)
          setPostsOther(response.data.unfollowedBarks)
      })
    }
    updatePosts()
  }, []);
  useEffect(() => {
    setRenderedPosts(() => {
      if (postsFollowed){
        return postsFollowed.slice(0, 5).concat(postsOther.slice(0, 5))
      }
      return postsOther.slice(0,5);
    })
  }, [postsFollowed]);
  return (
    <>
      {!state.loggedIn ? 
        <Link to='/login' /> :
        <>
          <DataGridEx />
          <br></br>
          test
          <br></br>
          test2
          <br></br>
          test3
        </>
      }
      <Grid container direction='column' justify='flex-start'>
        test5
        {renderedPosts.map((post) => {
         
            <Bark key={post._id} object={post}>
              test6
              <Link to={`bark/${post._id}`}/>
            </Bark>
          
        })}

      </Grid>
      
    </>
  );
  /* possibly use for suggesting followers
  <DataGrid
        rows={renderedPosts}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
  />
  */
}
