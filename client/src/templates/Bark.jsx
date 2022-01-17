import { Link, useNavigate } from 'react-router-dom';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
//add condensed and non condensed view. Pass in parameter as a prop
function Bark({ object, children, view }) {
    const navigate = useNavigate();
    //console.log("Bark: ", object, 123, children)
    const { _id, author, title, content } = object;

    const postStyle = {
    };

    const linkStyle = {
    };
    console.log(_id, author, title, content)
    return (
        <Paper style={postStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>{title}</h1>
                {children}
            </div>
            { view == "single" ? 
                <div>
                    Share link: {`localhost:3000/barkview/${_id}`}
                </div>

                :
                <Button onClick = {() => navigate(`/barkview/${_id}`)}>
                    Click me!
                </Button>
            }
            <p>Author: {author}</p>
            <p>{content}</p>
        </Paper>
    );
    // <li key={_id}>
    //             Click me!
    //             <Link to={`barkview/${_id}`} />
    //         </li>
    /*
  return (
        <Paper style={postStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/${_id}`} style={linkStyle}>
                    <h1>{title}</h1>
                </Link>
                {children}
            </div>
            <p>{body}</p>
        </Paper>
    );
    */
}

export default Bark;