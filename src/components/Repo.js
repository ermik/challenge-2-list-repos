import React from 'react';
import styled from 'styled-components';

const Repo = (props) => {
    const { createdAt, name, description } = props.data;
    const forkCount = props.data.forkCount;
    const watchCount = props.data.watchers.totalCount;
    const starCount = props.data.stargazers.totalCount;

    if (!name || forkCount) {
        return null;
    }

    console.log(createdAt);

    return (<RepoWrapper>

        <RepoName>
            <RepoTitle href={props.data.url}>{props.user}/{name}</RepoTitle>
            <p>{description}</p>
        </RepoName>
        <RepoStats>
            <RepoStat>{forkCount} forks</RepoStat>
            <RepoStat>{watchCount} watchers</RepoStat>
            <RepoStat>{starCount} stars</RepoStat>
        </RepoStats>

    </RepoWrapper>)
}

const RepoWrapper = styled.div`
    flex-grow: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    padding: 5px 2px 5px 2px;
`

const RepoName = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

const RepoTitle = styled.a`
    font-weight: 500;
    &, &:active, &:visited {
        color: inherit;
        text-decoration: none;
    }
    &:hover {
        color: #19ff32;
    }
    margin: 0;
`
const RepoStats = styled.div`
    flex: 0 0 auto;
    flex-basis: 20%;
`;

const RepoStat = styled.div`
    background-color: rgb(15,15,15);
    color: white;
    font-weight: 500;
    margin: 5px;
    padding: 3px;
    border-radius: 5px;
`;

export default Repo;
