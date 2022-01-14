import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

//add condensed and non condensed view. Pass in parameter as a prop
function Bark({ object, children }) {
    console.log("Bark: ", object, 123, children)
    const { _id, author, title, content } = object;

    const postStyle = {
    };

    const linkStyle = {
    };

    return (
        <Paper style={postStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>{title}</h1>
                {children}
            </div>
            <p>Author: {author}</p>
            <p>{content}</p>
        </Paper>
    );
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