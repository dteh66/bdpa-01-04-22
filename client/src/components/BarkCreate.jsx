import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Checkbox,
} from '@material-ui/core';

/* Create as part of Home view */

function CreateBarkForm(props) {
    const [form, setForm] = useState({
        author: '',
        content: '',
        deleted: false,
        liked: 0,
        barkBacks: 0,
        rebarks: 0,
        barkBackTo: null,
        rebarkOf: null,
        created: Date.now,
    });
    const [error, setError] = useState('');
    const history = useHistory();
    const API_URL = process.env.REACT_APP_APIURL

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm(() => {
            return { ...form, [name]: value };
        });
    }

    function handleCheckboxChange(e) {
        const name = e.target.name;
        const value = e.target.checked;
        setForm(() => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(() => '');
        await axios
            .post(API_URL + '/bark/create/', Cookies.get('token'), form)
            .then((response) => {
                Cookies.set('token', response.data.token, {
                    expires: form.remember ? null : 1 / 24,
                });
                history.push('/');
            })
            .catch((error) => {
                console.log(error)
                //setError(() => error.response.data);
            });
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Typography variant='h3'>Create Post</Typography>
                <TextField
                    multiline
                    rows="4"
                    required
                    fullWidth
                    label='Content'
                    name='Content'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.content}
                    autoFocus
                />
                <TextField
                    required
                    fullWidth
                    label='Password'
                    name='password'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.password}
                    type='password'
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
                    <Typography variant='body1'>
                        Dont have an account?{' '}
                        <Link to='/register'>Register</Link>
                    </Typography>
                    <Button
                        variant='contained'
                        style={{ margin: '0.5rem' }}
                        type='submit'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default CreateBarkForm;
