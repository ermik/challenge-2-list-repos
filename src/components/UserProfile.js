import React from 'react';
import styled from "styled-components";
import DWARFScore from "./DWARF";

const UserProfile = (props) => {
    if (!props.data || !props.data.login) {
        return null;
    }

    const {
        avatarUrl,
    } = props.data;

    const followerCount = (props.data.followers || {}).totalCount;
    const orgCount = (props.data.organizations || {}).totalCount;
    const {
        // totalIssueContributions,
        totalCommitContributions,
        // totalRepositoryContributions,
        // totalPullRequestContributions,
        totalPullRequestReviewContributions
    } = props.data.contributionsCollection;

    return (
        <UserWrapper>
            <ProfilePicture style={{backgroundImage: `url(${avatarUrl})`}} />
            <Stats>
                <div>Public stats:</div>
                <div>{followerCount} followers</div>
                <div>{orgCount} organizations</div>
                <div>{totalCommitContributions} commits</div>
                <div>{totalPullRequestReviewContributions} PRs</div>
            </Stats>
            <DWARFScore user={props.data} />
        </UserWrapper>
    )
}

const UserWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    color: wheat;
    background-color: #98173a;
    border-radius: 3px;
    padding: 10px;

    & > *:first-child {
        margin-right: 10px;
    }
    & > *:last-child {
        margin-left: 10px;
    }
    & > *:note(:first-child),
    & > *:note(:last-child) {
        margin-right: 10px;
        margin-left: 10px;
    }
`;

const Stats = styled.div`
    flex: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    background-color: #1e0658;
    color: #f8f8fd;
    padding: 5px;
    border-radius: 3px;
`;

const ProfilePicture = styled.div`
    flex: 0 0 130px;
    width: 130px;
    height: 130px;
    background-color: #fefefe;
    background-size: contain;
    border-radius: 3px;
`;

export default UserProfile;
