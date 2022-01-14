import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Checkbox,
} from '@material-ui/core';
import { UserContext } from "../contexts/User";

/* Create as part of Home view */
//props should include parent bark, if this is a "rebark" (rebarkOf attribute)
export default function CreateBarkForm(props) {

    const [state, dispatch] = useContext(UserContext);
    const [submitted, setSubmitted] = useState(false);
    const [url, setUrl] = useState(null)
    const [form, setForm] = useState({
        author: '',
        title: '',
        content: '',
        deleted: false,
        liked: 0,
        barkBacks: 0,
        rebarks: 0,
        barkBackTo: null,
        rebarkOf: null,
        created: Date.now(),
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_APIURL

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm(() => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(() => '');
        const author = state.username
        form.author = author
        if (author) {
            console.log("Barkcreate", form)
            await axios
                .post(API_URL + '/bark/create/', form, {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('token')
                    }
                })
                .then((response) => {
                    console.log("reponse: ", response)
                    setUrl(response.data._id)
                })
                .catch((error) => {
                    console.log(3131, error)
                    //setError(() => error.response.data);
                });
            setSubmitted(true);
        } else {
            console.log("Not signed in. How tf u access this page")
            navigate.push('/login');
        }
    }
    useEffect(() => {
    }, [submitted]);
    return (
        <Paper>
            { !state.loggedIn ? 
                <div>
                    Log in to Create a post!
                </div> :
                submitted ?
                    <div>
                        Bark created! 
                        Share with link: {API_URL + "/bark/:id/" + url}
                    </div> : 
                    <form onSubmit={handleSubmit}>
                        <Typography variant='h3'>Create Post</Typography>
                        <TextField
                            required
                            fullWidth
                            label='title'
                            name='title'
                            variant='outlined'
                            onChange={handleChange}
                            value={form.title}
                            autoFocus
                            inputProps={{ maxLength: 60 }}
                            style={{ margin: '0.5rem' }}
                        />
                        <TextField
                            multiline
                            rows="4"
                            required
                            fullWidth
                            label='content'
                            name='content'
                            variant='outlined'
                            onChange={handleChange}
                            value={form.content}
                            autoFocus
                            inputProps={{ maxLength: 280 }}
                            style={{ margin: '0.5rem' }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                        </div>
                        {error && (
                            <Typography variant='body2' color='secondary'>
                                {error}
                            </Typography>
                        )}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                variant='contained'
                                style={{ margin: '0.5rem' }}
                                type='submit'
                                disabled={
                                    !form.title || !form.content
                                }
                            >
                                Submit Bark
                                <Button>
                                    <Link to='/'/>
                                </Button>
                            </Button>
                        </div>
                    </form>
            }
        </Paper>
    );
}

//export default CreateBarkForm;
