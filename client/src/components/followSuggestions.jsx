import React, { forwardRef, useState, useEffect } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"
import axios from 'axios';
import Cookies from 'js-cookie';
import DataGridEx from '../templates/DataGridEx';

function FollowSuggestions(props) {
  const [followSuggestions, setFollowSuggestions] = useState([])
  //axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})
  const API_URL = process.env.REACT_APP_APIURL

  useEffect(() => {
    const fun = async () => {
      await axios.get(API_URL + "/auth/get-follow-suggestions", {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get('token')
        }
      })
        .then((response) => {
          console.log(54321, response.data)
          // var res = []
          // for (var i in response) {
          //   res.push({
          //       username: i.username,
          //       fullName: i.fullName,
          //       _id: i._id
          //   });
          // }
          setFollowSuggestions(response.data)
          //followSuggestions = response.data
        })
    }
    fun()
  }, [])
  console.log(415, followSuggestions)
///function: suggestion on who to follow component, current user is a parameter to be passed

  return (
    <DataGridEx suggestedUsers={followSuggestions} />
  );
}

/* unused code that might be useful later:

const [posts, setPosts] = useState([]);
const [openForm, setOpenForm] = useState(false);

const getPosts = async () => {
  const response = await getAllPosts();
  console.log(response);
  setPosts(response);
};

const formik = useFormik({
  initialValues: { postTitle: '', postContent: '' },
  onSubmit: async (values) => await createPost(values),
});
*/
export default FollowSuggestions;