import {
    Column,
    UseColumnOrderInstanceProps,
    UseColumnOrderState,
    UseExpandedHooks,
    UseExpandedInstanceProps,
    UseExpandedOptions,
    UseExpandedState,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    UseFiltersState,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    UseGlobalFiltersState,
    UseGroupByCellProps,
    UseGroupByColumnOptions,
    UseGroupByColumnProps,
    UseGroupByHooks,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    UseGroupByState,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsColumnOptions,
    UseResizeColumnsColumnProps,
    UseResizeColumnsOptions,
    UseResizeColumnsState,
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseRowStateCellProps,
    UseRowStateInstanceProps,
    UseRowStateOptions,
    UseRowStateRowProps,
    UseRowStateState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
    // Partial,
    TableExpandedToggleProps,
    IdType,
    PropGetter,
} from 'react-table';

declare module 'react-table' {
    // take this file as-is, or comment out the sections that don't apply to your plugin configuration

    export interface UseToggleAllProps<D extends object> {
        getToggleAllRowsExpandedProps: (
            props?: PropGetter<D, TableToggleCommonProps>
        ) => TableToggleCommonProps;
    }

    export interface TableOptions<D extends object>
        extends UseExpandedOptions<D>,
            UseFiltersOptions<D>,
            UseGlobalFiltersOptions<D>,
            UseGroupByOptions<D>,
            UsePaginationOptions<D>,
            UseResizeColumnsOptions<D>,
            UseRowSelectOptions<D>,
            UseRowStateOptions<D>,
            UseSortByOptions<D> {} // Record<string, any> {} // eslint-disable-next-line @typescript-eslint/no-explicit-any // feature set, this is a safe default. // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your // note that having Record here allows you to add anything to the options, this matches the spirit of the

    export interface Hooks<D extends object = {}>
        extends UseExpandedHooks<D>,
            UseGroupByHooks<D>,
            UseRowSelectHooks<D>,
            UseSortByHooks<D> {}

    export interface TableInstance<D extends object = {}>
        extends UseColumnOrderInstanceProps<D>,
            UseExpandedInstanceProps<D>,
            UseToggleAllProps<D>,
            UseFiltersInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D>,
            UseGroupByInstanceProps<D>,
            UsePaginationInstanceProps<D>,
            UseRowSelectInstanceProps<D>,
            UseRowStateInstanceProps<D>,
            UseSortByInstanceProps<D> {
        visibleColumns: Column[];
    }

    export interface TableState<D extends object = {}>
        extends UseColumnOrderState<D>,
            UseExpandedState<D>,
            UseFiltersState<D>,
            UseGlobalFiltersState<D>,
            UseGroupByState<D>,
            UsePaginationState<D>,
            UseResizeColumnsState<D>,
            UseRowSelectState<D>,
            UseRowStateState<D>,
            UseSortByState<D> {}

    export interface Column<D extends object = {}>
        extends UseFiltersColumnOptions<D>,
            UseGroupByColumnOptions<D>,
            UseResizeColumnsColumnOptions<D>,
            UseSortByColumnOptions<D> {}

    export interface ColumnInstance<D extends object = {}>
        extends UseFiltersColumnProps<D>,
            UseGroupByColumnProps<D>,
            UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D> {}

    export interface Cell<D extends object = {}>
        extends UseGroupByCellProps<D>,
            UseRowStateCellProps<D> {}

    export interface UseExpandedRowProps<D extends object> {
        isExpanded: boolean;
        canExpand: boolean;
        subRows: Row<D>[];
        toggleExpanded: (isExpanded?: boolean) => void;
        getToggleRowExpandedProps: (
            props?: Partial<TableExpandedToggleProps>
        ) => TableExpandedToggleProps;
    }

    export interface Row<D extends object = {}>
        extends UseExpandedRowProps<D>,
            Omit<UseGroupByRowProps<D>, 'groupById'>,
            UseRowSelectRowProps<D>,
            UseRowStateRowProps<D> {
        groupByID: IdType<D>;
    }
}
