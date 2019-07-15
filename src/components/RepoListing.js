import React from 'react';
import styled from "styled-components";
import Repo from './Repo';

const RepoListing = (props) => {
    if (!props.data ||
        !props.data.nodes ||
        props.data.nodes.length === undefined ||
        props.data.nodes.length < 1) {
        return (<div>Nothing to show...</div>);
    }

    console.log(props);

    return (<RepoList>
        {props.data.nodes.map((r, i) => {
            return (<Repo key={i} data={r} user={props.user} />)
        })}
    </RepoList>)
}

const RepoList = styled.div`
    display: block;

    & > *:nth-child(2n+1) {
        background-color: rgb(240,240,240);
    }
`;

export default RepoListing;
