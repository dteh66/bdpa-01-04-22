import React, { forwardRef, useState, useEffect } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"
import axios from 'axios';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { getPosts } from './barkFetch';
import { Link, useParams } from "react-router-dom"

import Bark from '../templates/Bark';


import BarkCreate from './BarkCreate'

export default function Barkview() {
  //const username = await axios.get(`/barks?token=${Cookies.get("token")}`)
  //console.log(username)

  // const username = await axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})

  //the component "followSuggestion" is a component with a list of all users to follow
  //sort barks from front end (aka here)

  //make backend send pack barks. can sort if need be
  //make backend send normal barks. we need to sort these

  //sort barks from front end (aka here)
  const barkID = useParams().id;

  const [post, setPost] = useState(null)
  const API_URL = process.env.REACT_APP_APIURL
  

  useEffect(() => {
    const updatePost = async () => {
        console.log("barkID: ", barkID)
        setPost(await axios.get(API_URL + `/bark/${barkID}/`, 
        //{headers: {  'Authorization': 'Bearer ' + Cookies.get('token')}}
        )
        .then((response) => {
            console.log("response: ", response)
            return response.data;
        }))
    }
    updatePost()
    console.log(post)
    //console.log("post._id: ", post._id)
  }, [barkID]);

  return (
    post ? 
    <Bark key={post._id} object={post} view="single"/>
    :
    <div>
      Getting post information...
    </div>
  )
    // return (
    //   <Button onClick={() => console.log(post)}>
    //     LISUFHD
    //   </Button>
    // )
}
