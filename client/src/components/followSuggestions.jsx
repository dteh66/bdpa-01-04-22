import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton } from '@mui/material';
import CheckIcon from '@material-ui/icons/Check';

import Navbar from "./Navbar"
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from "../contexts/User";

function FollowSuggestions(props) {
  const [followSuggestions, setFollowSuggestions] = useState([])
  const [submitted, setSubmitted] = useState(false); //for follow changes
  const [userState, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

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

async function handleToggle(rowID) {
  let selectedState = false
  const updatedRows = await Promise.all(followSuggestions.map(async (row) => {
      if (row.id === rowID) {
        selectedState = !row.selected

        if (selectedState) {
          const follower = userState.username
          const followee = row.username
          const form = {username: follower, followedUser: followee}
          if (follower) {
              // console.log("follow", form)
              await axios
                  .post(API_URL + '/follow/' + follower, form, {
                      headers: {
                          'Authorization': 'Bearer ' + Cookies.get('token')
                      }
                  })
                  .then((response) => {
                      //console.log("reponse: ", response)
                  })
                  .catch((error) => {
                      console.log(333, error)
                      //setError(() => error.response.data);
                  });

                
              setSubmitted(true);
          } else {
              console.log("Not signed in. How tf u access this page")
              navigate('/login');
          }
        }


        return { ...row, selected: !row.selected };
      }
      return row;
  }));
  console.log("user followed")
  setFollowSuggestions(updatedRows);
};

useEffect(() => {
}, [submitted]);


return (
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>User ID</TableCell>
        <TableCell align="right">Username</TableCell>
        <TableCell align="right">Full Name</TableCell>
        <TableCell align="right">Follow</TableCell>
        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
      </TableRow>
    </TableHead>
    <TableBody>
      {followSuggestions.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.username}</TableCell>
          <TableCell align="right">{row.fullName}</TableCell>
          <TableCell align="right">
            <ToggleButton
                value="check"
                selected={row.selected || false}
                onChange={() => handleToggle(row)}
                >
                <CheckIcon />
            </ToggleButton> 
          </TableCell>
          {/* <TableCell align="right">{row.someParam}</TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>
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