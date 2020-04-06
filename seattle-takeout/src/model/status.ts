export enum Status {
    CLOSED = 'CLOSED',
    DINNER_ONLY = 'DINNER_ONLY',
    LUNCH_ONLY = 'LUNCH_ONLY',
    LUNCH_AND_DINNER = 'LUNCH_AND_DINNER'
}

export const StatusNameMap: Map<Status, string> = new Map([
    [Status.CLOSED, 'Closed'],
    [Status.DINNER_ONLY, 'Dinner Only'],
    [Status.LUNCH_ONLY, 'Lunch Only'],
    [Status.LUNCH_AND_DINNER, 'Lunch and Dinner'],
]);

export const StatusColorMap: Map<Status, string> = new Map([
    [Status.CLOSED, '#ffbabb'],
    [Status.DINNER_ONLY, '#b8edff'],
    [Status.LUNCH_ONLY, '#ffeab6'],
    [Status.LUNCH_AND_DINNER, '#dcbcff'],
]);