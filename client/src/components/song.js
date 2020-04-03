import React from 'react';

const Song = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <button onClick={props.onClick}>Change Song</button>
        </div>
    )
}

export default Song;