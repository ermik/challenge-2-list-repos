import React from 'react';
import styled from "styled-components";

const UserProfile = (props) => {
    if (!props.data || !props.data.login) {
        return null;
    }

    console.log(props.data);

    const {
        avatarUrl,
        name,
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
                <div>Recent stats:</div>
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

/**
 * Deterministic World Adevnture and Research Finder
 */
const DWARFScore = (props) => {
    if (!props.user) {
        return <div>{scoreStrings.unknown}</div>
    }
    const {
        totalIssueContributions,
        totalCommitContributions,
        totalRepositoryContributions,
        totalPullRequestContributions,
        totalPullRequestReviewContributions
    } = props.user.contributionsCollection;
    const score = secretScore(
        totalCommitContributions,
        totalPullRequestContributions,
        totalPullRequestReviewContributions,
        totalRepositoryContributions,
        totalIssueContributions,
        props.user.organizations.totalCount,
        props.user.followers.totalCount,
        props.user.starredRepositories.totalCount,
    );
    let description = stringForScore(score);

    return (<div><ScoreWrapper>{description}</ScoreWrapper></div>)
}

const ScoreWrapper = styled.h3`
    font-family: 'IM Fell French Canon', 'Baskerville', serif;
    font-weight: 500;
    /* font-style: italic; */
    font-size: 1.8rem;
    vertical-align: middle;
    padding: 0 40px;
    justify-self: center;
    align-self: center;
    flex-grow: 0;
`

function secretScore(
    crackedPlates,
    chippedGlasses,
    bluntKnives,
    bentForks,
    smashedBottles,
    burnedCorks,
    cutCloth,
    treadFat,
) {
    return (
        (crackedPlates * burnedCorks) +
        ((chippedGlasses + bluntKnives) * 13) +
        ((bentForks + smashedBottles) / cutCloth) +
        treadFat
    ) / 144;
}

const scoreStrings = {
    unknown: "Their accomplishments remain a mystery.",
    veryLow: "One could only wonder, but that one isn't them.",
    low: "Not one to aid in cooking with trolls.",
    ok: "O.K. as long as you avoid hidden doors and webbed woods.",
    great: `You may have found your next "burglar".`,
    amazing: "You'd be glad you had them if you have to share a barrel.",
    extreme: "Take them with you and make sure you don't forget the hankerchief.",
    regular: "Might work, as long as your journey doesn't involve dragons.",
}

const stringForScore = (score) => {
    if (score < 1) {
        return scoreStrings.verLow;
    } else if (score < 10) {
        return scoreStrings.low;
    } else if (score > 50) {
        if (score < 100) {
            return scoreStrings.great;
        } else if (score < 200) {
            return scoreStrings.amazing;
        } else if (score >= 300) {
            return scoreStrings.extreme;
        }
        return scoreStrings.ok;
    } else {
        return scoreStrings.regular;
    }
}

export default UserProfile;
