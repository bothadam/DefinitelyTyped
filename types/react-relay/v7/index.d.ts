// Type definitions for react-relay 7.0
// Project: https://github.com/facebook/relay, https://facebook.github.io/relay
// Definitions by: Eloy Durán <https://github.com/alloy>
//                 Marais Rossouw <https://github.com/maraisr>
//                 Edvin Erikson <https://github.com/edvinerikson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.7

import * as React from "react";
import {
    _FragmentRefs,
    _RefType,
    CacheConfig,
    Disposable,
    Environment,
    GraphQLTaggedNode,
    IEnvironment,
    Observer,
    OperationType,
    PageInfo,
    RelayContext,
    Variables,
} from "relay-runtime";

// These are not exposed. This is just to satisfy the DefinitelyTyped build process.
import * as hooks from "./hooks";

// ./ReactRelayTypes
export interface RelayProp {
    environment: Environment;
    refetch: undefined; // ensures no RelayRefetchProp is used with a fragment container
    hasMore: undefined; // ensures no RelayPaginationProp is used with a fragment container
}

export interface RelayRefetchProp {
    environment: Environment;
    refetch: (
        refetchVariables: Variables | ((fragmentVariables: Variables) => Variables),
        renderVariables?: Variables | null,
        observerOrCallback?: ObserverOrCallback | null,
        options?: RefetchOptions,
    ) => Disposable;
    hasMore: undefined; // ensures no RelayPaginationProp is used with a refetch container
}
export interface RefetchOptions {
    force?: boolean | undefined;
    fetchPolicy?: "store-or-network" | "network-only" | undefined;
}

type ObserverOrCallback = Observer<void> | ((error: Error | null | undefined) => void);

export interface RelayPaginationProp {
    readonly environment: Environment;
    readonly hasMore: () => boolean;
    readonly isLoading: () => boolean;
    readonly loadMore: (
        pageSize: number,
        observerOrCallback?: ObserverOrCallback | null,
        options?: RefetchOptions | null,
    ) => Disposable | null | undefined;
    readonly refetchConnection: (
        totalCount: number,
        observerOrCallback?: ObserverOrCallback | null,
        refetchVariables?: Variables | null,
    ) => Disposable | null | undefined;
    refetch: undefined; // ensures no RelayRefetchProp is used with a pagination container
}

export type FragmentOrRegularProp<T> = T extends _RefType<infer U> ? _FragmentRefs<U>
    : T extends ReadonlyArray<_RefType<infer U>> ? ReadonlyArray<_FragmentRefs<U>>
    : T;

export type MappedFragmentProps<T> = {
    [K in keyof T]: FragmentOrRegularProp<T[K]>;
};

export {
    _FragmentRefs,
    _RefType,
    applyOptimisticMutation,
    commitLocalUpdate,
    commitMutation,
    DataID,
    DeclarativeMutationConfig,
    Disposable,
    Environment,
    fetchQuery,
    FragmentRef,
    graphql,
    GraphQLTaggedNode,
    MutationType,
    MutationTypes,
    NormalizationSelector,
    OperationDescriptor,
    RangeOperation,
    RangeOperations,
    ReaderSelector,
    readInlineData,
    RelayContext,
    requestSubscription,
    Snapshot,
    Variables,
} from "relay-runtime";

export type FetchPolicy = "store-and-network" | "network-only";

interface QueryRendererProps<TOperation extends OperationType> {
    environment: IEnvironment;
    query: GraphQLTaggedNode | null | undefined;
    render: (renderProps: {
        error: Error | null;
        props: TOperation["response"] | null;
        retry: (() => void) | null;
    }) => React.ReactNode;
    variables: TOperation["variables"];
}
declare class ReactRelayQueryRenderer<TOperation extends OperationType> extends React.Component<
    {
        cacheConfig?: CacheConfig | null | undefined;
        fetchPolicy?: FetchPolicy | undefined;
    } & QueryRendererProps<TOperation>
> {}
export { ReactRelayQueryRenderer as QueryRenderer };

declare class ReactRelayLocalQueryRenderer<TOperation extends OperationType> extends React.Component<
    QueryRendererProps<TOperation>
> {}
export { ReactRelayLocalQueryRenderer as LocalQueryRenderer };

export const ReactRelayContext: React.Context<RelayContext | null>;

export type ContainerProps<Props> = MappedFragmentProps<Pick<Props, Exclude<keyof Props, "relay">>>;

export type Container<Props> = React.ComponentType<
    ContainerProps<Props> & { componentRef?: ((ref: any) => void) | undefined }
>;

export function createFragmentContainer<Props>(
    Component: React.ComponentType<Props & { relay?: RelayProp | undefined }>,
    fragmentSpec: Record<string, GraphQLTaggedNode>,
): Container<Props>;

interface ConnectionData {
    edges?: ReadonlyArray<any> | null | undefined;
    pageInfo?: Partial<PageInfo> | null | undefined;
}

export interface ConnectionConfig<Props = object> {
    direction?: "backward" | "forward" | undefined;
    getConnectionFromProps?: ((props: Props) => ConnectionData | null | undefined) | undefined;
    getFragmentVariables?: ((prevVars: Variables, totalCount: number) => Variables) | undefined;
    getVariables: (
        props: Props,
        paginationInfo: { count: number; cursor?: string | null | undefined },
        fragmentVariables: Variables,
    ) => Variables;
    query: GraphQLTaggedNode;
}

export function createPaginationContainer<Props>(
    Component: React.ComponentType<
        Props & {
            relay: RelayPaginationProp;
        }
    >,
    fragmentSpec: Record<string, GraphQLTaggedNode>,
    connectionConfig: ConnectionConfig<Props>,
): Container<Props>;

export function createRefetchContainer<Props>(
    Component: React.ComponentType<
        Props & {
            relay: RelayRefetchProp;
        }
    >,
    fragmentSpec: Record<string, GraphQLTaggedNode>,
    refetchQuery: GraphQLTaggedNode,
): Container<Props>;
