import {
    AudienceCriteriaEvaluatorFn,
    AudienceEvaluationContext,
    BaseAudienceCriteria,
    isStringMatch, negateIfNecessary, StringOperator
} from "@yostack/sdk-frontend-react";

export const exampleAudienceCriteriaEvaluator: AudienceCriteriaEvaluatorFn = (criteria: ExampleCriteria,
          context: AudienceEvaluationContext): boolean => {

    const actualUrl = window.location.href;
    const match = isStringMatch(actualUrl, criteria.url, criteria.matchOperator);
    return negateIfNecessary(match, criteria);
}

interface ExampleCriteria extends BaseAudienceCriteria {
    matchOperator: StringOperator;
    url: string;
}