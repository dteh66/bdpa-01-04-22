import React, { forwardRef, useState, useEffect } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"
import axios from 'axios';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { getPosts } from './barkFetch';
import { Link, BrowserRouter } from "react-router-dom"
import Bark from '../templates/Bark';
import DataGridEx from '../templates/DataGridEx';
import BarkCreate from './BarkCreate'
import FollowSuggestions from './FollowSuggestions'
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
  var postsFollowed = []
  var postsOther = []
  const [renderedPosts, setRenderedPosts] = useState([]);
  const itemLimit = 10;
  const API_URL = process.env.REACT_APP_APIURL

  useEffect(() => {
    console.log("hi")
    const updatePosts = async () => {
      const fetchedPosts = await axios.get(API_URL + "/bark/", {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get('token')
        }
      })
        .then((response) => {
          
          postsFollowed = response.data.barks
          postsOther = response.data.unfollowedBarks
          //console.log(1134, postsFollowed, 1356, postsOther)
          const toRender = (postsFollowed ?
            (postsFollowed.slice(0, 5)).concat(postsOther.slice(0, 5))
            :
            (postsOther ? postsOther.slice(0, 5) : null))
          setRenderedPosts(toRender)
        })
        //can't setState, then immediately reference the state. State will not have updated
    }
    updatePosts()
  }, []);
  return (
    <>
      {!state.loggedIn ?
        <Button>
          Click to log in
          <Link to='/login' />
        </Button>
        :
        <>
          <FollowSuggestions />
          <br></br>
          test
          <br></br>
          test2
          <br></br>
          test3
        </>
      }
      <Grid container direction='column' justify='flex-start'>
        {renderedPosts.map((post) => {
          return (
            <Bark key={post._id} object={post}>

                <Link to={`barkview/${post._id}`} />

            </Bark>
          )
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
