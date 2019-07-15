import React from 'react';
import styled from "styled-components";

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

export default DWARFScore;
