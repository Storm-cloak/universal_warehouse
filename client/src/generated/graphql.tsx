import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A string representing a series of binary bits */
  BitString: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** The day, does not include a time. */
  Date: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  Jwt: any;
};

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['Jwt']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** A filter to be used against BitString fields. All fields are combined with a logical ‘and.’ */
export type BitStringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['BitString']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['BitString']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['BitString']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['BitString']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['BitString']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['BitString']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['BitString']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['BitString']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['BitString']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['BitString']>;
};

/** All input for the create `Main` mutation. */
export type CreateMainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Main` to be created by this mutation. */
  main: MainInput;
};

/** The output of our create `Main` mutation. */
export type CreateMainPayload = {
  __typename?: 'CreateMainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Main` that was created by this mutation. */
  main?: Maybe<Main>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Session` that is related to this `Main`. */
  session?: Maybe<Session>;
  /** Reads a single `Warehouse` that is related to this `Main`. */
  product?: Maybe<Warehouse>;
  /** An edge for our `Main`. May be used by Relay 1. */
  mainEdge?: Maybe<MainsEdge>;
};


/** The output of our create `Main` mutation. */
export type CreateMainPayloadMainEdgeArgs = {
  orderBy?: Maybe<Array<MainsOrderBy>>;
};

/** All input for the create `Session` mutation. */
export type CreateSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Session` to be created by this mutation. */
  session: SessionInput;
};

/** The output of our create `Session` mutation. */
export type CreateSessionPayload = {
  __typename?: 'CreateSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Session` that was created by this mutation. */
  session?: Maybe<Session>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Storage` that is related to this `Session`. */
  storage?: Maybe<Storage>;
  /** An edge for our `Session`. May be used by Relay 1. */
  sessionEdge?: Maybe<SessionsEdge>;
};


/** The output of our create `Session` mutation. */
export type CreateSessionPayloadSessionEdgeArgs = {
  orderBy?: Maybe<Array<SessionsOrderBy>>;
};

/** All input for the create `Storage` mutation. */
export type CreateStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Storage` to be created by this mutation. */
  storage: StorageInput;
};

/** The output of our create `Storage` mutation. */
export type CreateStoragePayload = {
  __typename?: 'CreateStoragePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Storage` that was created by this mutation. */
  storage?: Maybe<Storage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Storage`. */
  responsiblePerson?: Maybe<User>;
  /** An edge for our `Storage`. May be used by Relay 1. */
  storageEdge?: Maybe<StoragesEdge>;
};


/** The output of our create `Storage` mutation. */
export type CreateStoragePayloadStorageEdgeArgs = {
  orderBy?: Maybe<Array<StoragesOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `UserPrivelage` that is related to this `User`. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the create `UserPrivelage` mutation. */
export type CreateUserPrivelageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPrivelage` to be created by this mutation. */
  userPrivelage: UserPrivelageInput;
};

/** The output of our create `UserPrivelage` mutation. */
export type CreateUserPrivelagePayload = {
  __typename?: 'CreateUserPrivelagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPrivelage` that was created by this mutation. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserPrivelage`. May be used by Relay 1. */
  userPrivelageEdge?: Maybe<UserPrivelagesEdge>;
};


/** The output of our create `UserPrivelage` mutation. */
export type CreateUserPrivelagePayloadUserPrivelageEdgeArgs = {
  orderBy?: Maybe<Array<UserPrivelagesOrderBy>>;
};

/** All input for the create `Warehouse` mutation. */
export type CreateWarehouseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Warehouse` to be created by this mutation. */
  warehouse: WarehouseInput;
};

/** The output of our create `Warehouse` mutation. */
export type CreateWarehousePayload = {
  __typename?: 'CreateWarehousePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Warehouse` that was created by this mutation. */
  warehouse?: Maybe<Warehouse>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Storage` that is related to this `Warehouse`. */
  storage?: Maybe<Storage>;
  /** An edge for our `Warehouse`. May be used by Relay 1. */
  warehouseEdge?: Maybe<WarehousesEdge>;
};


/** The output of our create `Warehouse` mutation. */
export type CreateWarehousePayloadWarehouseEdgeArgs = {
  orderBy?: Maybe<Array<WarehousesOrderBy>>;
};



/** A filter to be used against Date fields. All fields are combined with a logical ‘and.’ */
export type DateFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Date']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Date']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Date']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Date']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Date']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Date']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Date']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Date']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Date']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Date']>;
};


/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

/** All input for the `deleteMainByNodeId` mutation. */
export type DeleteMainByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Main` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteMain` mutation. */
export type DeleteMainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Main` mutation. */
export type DeleteMainPayload = {
  __typename?: 'DeleteMainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Main` that was deleted by this mutation. */
  main?: Maybe<Main>;
  deletedMainNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Session` that is related to this `Main`. */
  session?: Maybe<Session>;
  /** Reads a single `Warehouse` that is related to this `Main`. */
  product?: Maybe<Warehouse>;
  /** An edge for our `Main`. May be used by Relay 1. */
  mainEdge?: Maybe<MainsEdge>;
};


/** The output of our delete `Main` mutation. */
export type DeleteMainPayloadMainEdgeArgs = {
  orderBy?: Maybe<Array<MainsOrderBy>>;
};

/** All input for the `deleteSessionByNodeId` mutation. */
export type DeleteSessionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Session` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSession` mutation. */
export type DeleteSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Session` mutation. */
export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Session` that was deleted by this mutation. */
  session?: Maybe<Session>;
  deletedSessionNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Storage` that is related to this `Session`. */
  storage?: Maybe<Storage>;
  /** An edge for our `Session`. May be used by Relay 1. */
  sessionEdge?: Maybe<SessionsEdge>;
};


/** The output of our delete `Session` mutation. */
export type DeleteSessionPayloadSessionEdgeArgs = {
  orderBy?: Maybe<Array<SessionsOrderBy>>;
};

/** All input for the `deleteStorageByNodeId` mutation. */
export type DeleteStorageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Storage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteStorage` mutation. */
export type DeleteStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Storage` mutation. */
export type DeleteStoragePayload = {
  __typename?: 'DeleteStoragePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Storage` that was deleted by this mutation. */
  storage?: Maybe<Storage>;
  deletedStorageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Storage`. */
  responsiblePerson?: Maybe<User>;
  /** An edge for our `Storage`. May be used by Relay 1. */
  storageEdge?: Maybe<StoragesEdge>;
};


/** The output of our delete `Storage` mutation. */
export type DeleteStoragePayloadStorageEdgeArgs = {
  orderBy?: Maybe<Array<StoragesOrderBy>>;
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserByUsername` mutation. */
export type DeleteUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `UserPrivelage` that is related to this `User`. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteUserPrivelageByNodeId` mutation. */
export type DeleteUserPrivelageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserPrivelage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserPrivelage` mutation. */
export type DeleteUserPrivelageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `UserPrivelage` mutation. */
export type DeleteUserPrivelagePayload = {
  __typename?: 'DeleteUserPrivelagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPrivelage` that was deleted by this mutation. */
  userPrivelage?: Maybe<UserPrivelage>;
  deletedUserPrivelageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserPrivelage`. May be used by Relay 1. */
  userPrivelageEdge?: Maybe<UserPrivelagesEdge>;
};


/** The output of our delete `UserPrivelage` mutation. */
export type DeleteUserPrivelagePayloadUserPrivelageEdgeArgs = {
  orderBy?: Maybe<Array<UserPrivelagesOrderBy>>;
};

/** All input for the `deleteWarehouseByNodeId` mutation. */
export type DeleteWarehouseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Warehouse` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteWarehouse` mutation. */
export type DeleteWarehouseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Warehouse` mutation. */
export type DeleteWarehousePayload = {
  __typename?: 'DeleteWarehousePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Warehouse` that was deleted by this mutation. */
  warehouse?: Maybe<Warehouse>;
  deletedWarehouseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Storage` that is related to this `Warehouse`. */
  storage?: Maybe<Storage>;
  /** An edge for our `Warehouse`. May be used by Relay 1. */
  warehouseEdge?: Maybe<WarehousesEdge>;
};


/** The output of our delete `Warehouse` mutation. */
export type DeleteWarehousePayloadWarehouseEdgeArgs = {
  orderBy?: Maybe<Array<WarehousesOrderBy>>;
};

/** A filter to be used against Float fields. All fields are combined with a logical ‘and.’ */
export type FloatFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Float']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Float']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Float']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Float']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Float']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Float']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Float']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Float']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Float']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Float']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};


/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['JSON']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['JSON']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['JSON']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['JSON']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['JSON']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['JSON']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['JSON']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['JSON']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['JSON']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['JSON']>;
  /** Contains the specified JSON. */
  contains?: Maybe<Scalars['JSON']>;
  /** Contains the specified key. */
  containsKey?: Maybe<Scalars['String']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: Maybe<Array<Scalars['String']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: Maybe<Array<Scalars['String']>>;
  /** Contained by the specified JSON. */
  containedBy?: Maybe<Scalars['JSON']>;
};


export type Main = Node & {
  __typename?: 'Main';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  sessionId: Scalars['Int'];
  productId: Scalars['Int'];
  quantity: Scalars['Float'];
  deleteThisResult: Scalars['Int'];
  price: Scalars['Float'];
  nettoPrice?: Maybe<Scalars['Float']>;
  prodDate?: Maybe<Scalars['Date']>;
  expDate?: Maybe<Scalars['Date']>;
  productCell?: Maybe<Scalars['String']>;
  documentId: Scalars['String'];
  documentParentId?: Maybe<Scalars['String']>;
  currencyId: Scalars['Int'];
  margin?: Maybe<Scalars['Float']>;
  clustersId: Scalars['Int'];
  nettoWeight?: Maybe<Scalars['Float']>;
  bruttoWeight?: Maybe<Scalars['Float']>;
  inventoryArray: Scalars['JSON'];
  /** Reads a single `Session` that is related to this `Main`. */
  session?: Maybe<Session>;
  /** Reads a single `Warehouse` that is related to this `Main`. */
  product?: Maybe<Warehouse>;
};

/** A condition to be used against `Main` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MainCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sessionId` field. */
  sessionId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `productId` field. */
  productId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `quantity` field. */
  quantity?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `deleteThisResult` field. */
  deleteThisResult?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `price` field. */
  price?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `nettoPrice` field. */
  nettoPrice?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `prodDate` field. */
  prodDate?: Maybe<Scalars['Date']>;
  /** Checks for equality with the object’s `expDate` field. */
  expDate?: Maybe<Scalars['Date']>;
  /** Checks for equality with the object’s `productCell` field. */
  productCell?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `documentId` field. */
  documentId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `documentParentId` field. */
  documentParentId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `currencyId` field. */
  currencyId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `margin` field. */
  margin?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `clustersId` field. */
  clustersId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `nettoWeight` field. */
  nettoWeight?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `bruttoWeight` field. */
  bruttoWeight?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `inventoryArray` field. */
  inventoryArray?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `Main` object types. All fields are combined with a logical ‘and.’ */
export type MainFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `sessionId` field. */
  sessionId?: Maybe<IntFilter>;
  /** Filter by the object’s `productId` field. */
  productId?: Maybe<IntFilter>;
  /** Filter by the object’s `quantity` field. */
  quantity?: Maybe<FloatFilter>;
  /** Filter by the object’s `deleteThisResult` field. */
  deleteThisResult?: Maybe<IntFilter>;
  /** Filter by the object’s `price` field. */
  price?: Maybe<FloatFilter>;
  /** Filter by the object’s `nettoPrice` field. */
  nettoPrice?: Maybe<FloatFilter>;
  /** Filter by the object’s `prodDate` field. */
  prodDate?: Maybe<DateFilter>;
  /** Filter by the object’s `expDate` field. */
  expDate?: Maybe<DateFilter>;
  /** Filter by the object’s `productCell` field. */
  productCell?: Maybe<StringFilter>;
  /** Filter by the object’s `documentId` field. */
  documentId?: Maybe<StringFilter>;
  /** Filter by the object’s `documentParentId` field. */
  documentParentId?: Maybe<StringFilter>;
  /** Filter by the object’s `currencyId` field. */
  currencyId?: Maybe<IntFilter>;
  /** Filter by the object’s `margin` field. */
  margin?: Maybe<FloatFilter>;
  /** Filter by the object’s `clustersId` field. */
  clustersId?: Maybe<IntFilter>;
  /** Filter by the object’s `nettoWeight` field. */
  nettoWeight?: Maybe<FloatFilter>;
  /** Filter by the object’s `bruttoWeight` field. */
  bruttoWeight?: Maybe<FloatFilter>;
  /** Filter by the object’s `inventoryArray` field. */
  inventoryArray?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MainFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MainFilter>>;
  /** Negates the expression. */
  not?: Maybe<MainFilter>;
};

/** An input for mutations affecting `Main` */
export type MainInput = {
  sessionId: Scalars['Int'];
  productId: Scalars['Int'];
  quantity: Scalars['Float'];
  deleteThisResult: Scalars['Int'];
  price: Scalars['Float'];
  nettoPrice?: Maybe<Scalars['Float']>;
  prodDate?: Maybe<Scalars['Date']>;
  expDate?: Maybe<Scalars['Date']>;
  productCell?: Maybe<Scalars['String']>;
  documentId: Scalars['String'];
  documentParentId?: Maybe<Scalars['String']>;
  currencyId: Scalars['Int'];
  margin?: Maybe<Scalars['Float']>;
  clustersId: Scalars['Int'];
  nettoWeight?: Maybe<Scalars['Float']>;
  bruttoWeight?: Maybe<Scalars['Float']>;
  inventoryArray: Scalars['JSON'];
};

/** Represents an update to a `Main`. Fields that are set will be updated. */
export type MainPatch = {
  sessionId?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Float']>;
  deleteThisResult?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Float']>;
  nettoPrice?: Maybe<Scalars['Float']>;
  prodDate?: Maybe<Scalars['Date']>;
  expDate?: Maybe<Scalars['Date']>;
  productCell?: Maybe<Scalars['String']>;
  documentId?: Maybe<Scalars['String']>;
  documentParentId?: Maybe<Scalars['String']>;
  currencyId?: Maybe<Scalars['Int']>;
  margin?: Maybe<Scalars['Float']>;
  clustersId?: Maybe<Scalars['Int']>;
  nettoWeight?: Maybe<Scalars['Float']>;
  bruttoWeight?: Maybe<Scalars['Float']>;
  inventoryArray?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `Main` values. */
export type MainsConnection = {
  __typename?: 'MainsConnection';
  /** A list of `Main` objects. */
  nodes: Array<Maybe<Main>>;
  /** A list of edges which contains the `Main` and cursor to aid in pagination. */
  edges: Array<MainsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Main` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Main` edge in the connection. */
export type MainsEdge = {
  __typename?: 'MainsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Main` at the end of the edge. */
  node?: Maybe<Main>;
};

/** Methods to use when ordering `Main`. */
export enum MainsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  SessionIdAsc = 'SESSION_ID_ASC',
  SessionIdDesc = 'SESSION_ID_DESC',
  ProductIdAsc = 'PRODUCT_ID_ASC',
  ProductIdDesc = 'PRODUCT_ID_DESC',
  QuantityAsc = 'QUANTITY_ASC',
  QuantityDesc = 'QUANTITY_DESC',
  DeleteThisResultAsc = 'DELETE_THIS_RESULT_ASC',
  DeleteThisResultDesc = 'DELETE_THIS_RESULT_DESC',
  PriceAsc = 'PRICE_ASC',
  PriceDesc = 'PRICE_DESC',
  NettoPriceAsc = 'NETTO_PRICE_ASC',
  NettoPriceDesc = 'NETTO_PRICE_DESC',
  ProdDateAsc = 'PROD_DATE_ASC',
  ProdDateDesc = 'PROD_DATE_DESC',
  ExpDateAsc = 'EXP_DATE_ASC',
  ExpDateDesc = 'EXP_DATE_DESC',
  ProductCellAsc = 'PRODUCT_CELL_ASC',
  ProductCellDesc = 'PRODUCT_CELL_DESC',
  DocumentIdAsc = 'DOCUMENT_ID_ASC',
  DocumentIdDesc = 'DOCUMENT_ID_DESC',
  DocumentParentIdAsc = 'DOCUMENT_PARENT_ID_ASC',
  DocumentParentIdDesc = 'DOCUMENT_PARENT_ID_DESC',
  CurrencyIdAsc = 'CURRENCY_ID_ASC',
  CurrencyIdDesc = 'CURRENCY_ID_DESC',
  MarginAsc = 'MARGIN_ASC',
  MarginDesc = 'MARGIN_DESC',
  ClustersIdAsc = 'CLUSTERS_ID_ASC',
  ClustersIdDesc = 'CLUSTERS_ID_DESC',
  NettoWeightAsc = 'NETTO_WEIGHT_ASC',
  NettoWeightDesc = 'NETTO_WEIGHT_DESC',
  BruttoWeightAsc = 'BRUTTO_WEIGHT_ASC',
  BruttoWeightDesc = 'BRUTTO_WEIGHT_DESC',
  InventoryArrayAsc = 'INVENTORY_ARRAY_ASC',
  InventoryArrayDesc = 'INVENTORY_ARRAY_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Main`. */
  createMain?: Maybe<CreateMainPayload>;
  /** Creates a single `Session`. */
  createSession?: Maybe<CreateSessionPayload>;
  /** Creates a single `Storage`. */
  createStorage?: Maybe<CreateStoragePayload>;
  /** Creates a single `Warehouse`. */
  createWarehouse?: Maybe<CreateWarehousePayload>;
  /** Creates a single `UserPrivelage`. */
  createUserPrivelage?: Maybe<CreateUserPrivelagePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Updates a single `Main` using its globally unique id and a patch. */
  updateMainByNodeId?: Maybe<UpdateMainPayload>;
  /** Updates a single `Main` using a unique key and a patch. */
  updateMain?: Maybe<UpdateMainPayload>;
  /** Updates a single `Session` using its globally unique id and a patch. */
  updateSessionByNodeId?: Maybe<UpdateSessionPayload>;
  /** Updates a single `Session` using a unique key and a patch. */
  updateSession?: Maybe<UpdateSessionPayload>;
  /** Updates a single `Storage` using its globally unique id and a patch. */
  updateStorageByNodeId?: Maybe<UpdateStoragePayload>;
  /** Updates a single `Storage` using a unique key and a patch. */
  updateStorage?: Maybe<UpdateStoragePayload>;
  /** Updates a single `Warehouse` using its globally unique id and a patch. */
  updateWarehouseByNodeId?: Maybe<UpdateWarehousePayload>;
  /** Updates a single `Warehouse` using a unique key and a patch. */
  updateWarehouse?: Maybe<UpdateWarehousePayload>;
  /** Updates a single `UserPrivelage` using its globally unique id and a patch. */
  updateUserPrivelageByNodeId?: Maybe<UpdateUserPrivelagePayload>;
  /** Updates a single `UserPrivelage` using a unique key and a patch. */
  updateUserPrivelage?: Maybe<UpdateUserPrivelagePayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUsername?: Maybe<UpdateUserPayload>;
  /** Deletes a single `Main` using its globally unique id. */
  deleteMainByNodeId?: Maybe<DeleteMainPayload>;
  /** Deletes a single `Main` using a unique key. */
  deleteMain?: Maybe<DeleteMainPayload>;
  /** Deletes a single `Session` using its globally unique id. */
  deleteSessionByNodeId?: Maybe<DeleteSessionPayload>;
  /** Deletes a single `Session` using a unique key. */
  deleteSession?: Maybe<DeleteSessionPayload>;
  /** Deletes a single `Storage` using its globally unique id. */
  deleteStorageByNodeId?: Maybe<DeleteStoragePayload>;
  /** Deletes a single `Storage` using a unique key. */
  deleteStorage?: Maybe<DeleteStoragePayload>;
  /** Deletes a single `Warehouse` using its globally unique id. */
  deleteWarehouseByNodeId?: Maybe<DeleteWarehousePayload>;
  /** Deletes a single `Warehouse` using a unique key. */
  deleteWarehouse?: Maybe<DeleteWarehousePayload>;
  /** Deletes a single `UserPrivelage` using its globally unique id. */
  deleteUserPrivelageByNodeId?: Maybe<DeleteUserPrivelagePayload>;
  /** Deletes a single `UserPrivelage` using a unique key. */
  deleteUserPrivelage?: Maybe<DeleteUserPrivelagePayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUsername?: Maybe<DeleteUserPayload>;
  authenticate?: Maybe<AuthenticatePayload>;
  registerUser?: Maybe<RegisterUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMainArgs = {
  input: CreateMainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStorageArgs = {
  input: CreateStorageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWarehouseArgs = {
  input: CreateWarehouseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserPrivelageArgs = {
  input: CreateUserPrivelageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMainByNodeIdArgs = {
  input: UpdateMainByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMainArgs = {
  input: UpdateMainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionByNodeIdArgs = {
  input: UpdateSessionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionArgs = {
  input: UpdateSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStorageByNodeIdArgs = {
  input: UpdateStorageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStorageArgs = {
  input: UpdateStorageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWarehouseByNodeIdArgs = {
  input: UpdateWarehouseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWarehouseArgs = {
  input: UpdateWarehouseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserPrivelageByNodeIdArgs = {
  input: UpdateUserPrivelageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserPrivelageArgs = {
  input: UpdateUserPrivelageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUsernameArgs = {
  input: UpdateUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMainByNodeIdArgs = {
  input: DeleteMainByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMainArgs = {
  input: DeleteMainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionByNodeIdArgs = {
  input: DeleteSessionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionArgs = {
  input: DeleteSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStorageByNodeIdArgs = {
  input: DeleteStorageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStorageArgs = {
  input: DeleteStorageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWarehouseByNodeIdArgs = {
  input: DeleteWarehouseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWarehouseArgs = {
  input: DeleteWarehouseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserPrivelageByNodeIdArgs = {
  input: DeleteUserPrivelageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserPrivelageArgs = {
  input: DeleteUserPrivelageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUsernameArgs = {
  input: DeleteUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Main`. */
  mains?: Maybe<MainsConnection>;
  /** Reads and enables pagination through a set of `Session`. */
  sessions?: Maybe<SessionsConnection>;
  /** Reads and enables pagination through a set of `Storage`. */
  storages?: Maybe<StoragesConnection>;
  /** Reads and enables pagination through a set of `Warehouse`. */
  warehouses?: Maybe<WarehousesConnection>;
  /** Reads and enables pagination through a set of `UserPrivelage`. */
  userPrivelages?: Maybe<UserPrivelagesConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  main?: Maybe<Main>;
  session?: Maybe<Session>;
  storage?: Maybe<Storage>;
  warehouse?: Maybe<Warehouse>;
  userPrivelage?: Maybe<UserPrivelage>;
  user?: Maybe<User>;
  userByUsername?: Maybe<User>;
  /** Reads a single `Main` using its globally unique `ID`. */
  mainByNodeId?: Maybe<Main>;
  /** Reads a single `Session` using its globally unique `ID`. */
  sessionByNodeId?: Maybe<Session>;
  /** Reads a single `Storage` using its globally unique `ID`. */
  storageByNodeId?: Maybe<Storage>;
  /** Reads a single `Warehouse` using its globally unique `ID`. */
  warehouseByNodeId?: Maybe<Warehouse>;
  /** Reads a single `UserPrivelage` using its globally unique `ID`. */
  userPrivelageByNodeId?: Maybe<UserPrivelage>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMainsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MainsOrderBy>>;
  condition?: Maybe<MainCondition>;
  filter?: Maybe<MainFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SessionsOrderBy>>;
  condition?: Maybe<SessionCondition>;
  filter?: Maybe<SessionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryStoragesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<StoragesOrderBy>>;
  condition?: Maybe<StorageCondition>;
  filter?: Maybe<StorageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWarehousesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WarehousesOrderBy>>;
  condition?: Maybe<WarehouseCondition>;
  filter?: Maybe<WarehouseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserPrivelagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserPrivelagesOrderBy>>;
  condition?: Maybe<UserPrivelageCondition>;
  filter?: Maybe<UserPrivelageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMainArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStorageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWarehouseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserPrivelageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMainByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStorageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWarehouseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserPrivelageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** All input for the `registerUser` mutation. */
export type RegisterUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  surname: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  userPrivelageId: Scalars['Int'];
};

/** The output of our `registerUser` mutation. */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `UserPrivelage` that is related to this `User`. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our `registerUser` mutation. */
export type RegisterUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

export type Session = Node & {
  __typename?: 'Session';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  parentId: Scalars['Int'];
  isDone: Scalars['BitString'];
  beginDate: Scalars['Datetime'];
  invoiceNum?: Maybe<Scalars['String']>;
  productSellerId?: Maybe<Scalars['Int']>;
  storageId: Scalars['Int'];
  electronReceipt?: Maybe<Scalars['String']>;
  type: Scalars['Int'];
  /** Reads a single `Storage` that is related to this `Session`. */
  storage?: Maybe<Storage>;
  /** Reads and enables pagination through a set of `Main`. */
  mains: MainsConnection;
};


export type SessionMainsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MainsOrderBy>>;
  condition?: Maybe<MainCondition>;
  filter?: Maybe<MainFilter>;
};

/** A condition to be used against `Session` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SessionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `isDone` field. */
  isDone?: Maybe<Scalars['BitString']>;
  /** Checks for equality with the object’s `beginDate` field. */
  beginDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `invoiceNum` field. */
  invoiceNum?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `productSellerId` field. */
  productSellerId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `electronReceipt` field. */
  electronReceipt?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `Session` object types. All fields are combined with a logical ‘and.’ */
export type SessionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `parentId` field. */
  parentId?: Maybe<IntFilter>;
  /** Filter by the object’s `isDone` field. */
  isDone?: Maybe<BitStringFilter>;
  /** Filter by the object’s `beginDate` field. */
  beginDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `invoiceNum` field. */
  invoiceNum?: Maybe<StringFilter>;
  /** Filter by the object’s `productSellerId` field. */
  productSellerId?: Maybe<IntFilter>;
  /** Filter by the object’s `storageId` field. */
  storageId?: Maybe<IntFilter>;
  /** Filter by the object’s `electronReceipt` field. */
  electronReceipt?: Maybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SessionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SessionFilter>>;
  /** Negates the expression. */
  not?: Maybe<SessionFilter>;
};

/** An input for mutations affecting `Session` */
export type SessionInput = {
  parentId: Scalars['Int'];
  isDone: Scalars['BitString'];
  beginDate: Scalars['Datetime'];
  invoiceNum?: Maybe<Scalars['String']>;
  productSellerId?: Maybe<Scalars['Int']>;
  storageId: Scalars['Int'];
  electronReceipt?: Maybe<Scalars['String']>;
  type: Scalars['Int'];
};

/** Represents an update to a `Session`. Fields that are set will be updated. */
export type SessionPatch = {
  parentId?: Maybe<Scalars['Int']>;
  isDone?: Maybe<Scalars['BitString']>;
  beginDate?: Maybe<Scalars['Datetime']>;
  invoiceNum?: Maybe<Scalars['String']>;
  productSellerId?: Maybe<Scalars['Int']>;
  storageId?: Maybe<Scalars['Int']>;
  electronReceipt?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Session` values. */
export type SessionsConnection = {
  __typename?: 'SessionsConnection';
  /** A list of `Session` objects. */
  nodes: Array<Maybe<Session>>;
  /** A list of edges which contains the `Session` and cursor to aid in pagination. */
  edges: Array<SessionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Session` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Session` edge in the connection. */
export type SessionsEdge = {
  __typename?: 'SessionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Session` at the end of the edge. */
  node?: Maybe<Session>;
};

/** Methods to use when ordering `Session`. */
export enum SessionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  IsDoneAsc = 'IS_DONE_ASC',
  IsDoneDesc = 'IS_DONE_DESC',
  BeginDateAsc = 'BEGIN_DATE_ASC',
  BeginDateDesc = 'BEGIN_DATE_DESC',
  InvoiceNumAsc = 'INVOICE_NUM_ASC',
  InvoiceNumDesc = 'INVOICE_NUM_DESC',
  ProductSellerIdAsc = 'PRODUCT_SELLER_ID_ASC',
  ProductSellerIdDesc = 'PRODUCT_SELLER_ID_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  ElectronReceiptAsc = 'ELECTRON_RECEIPT_ASC',
  ElectronReceiptDesc = 'ELECTRON_RECEIPT_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Storage = Node & {
  __typename?: 'Storage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  storageName: Scalars['JSON'];
  storageType: Scalars['Int'];
  responsiblePersonId: Scalars['Int'];
  /** Reads a single `User` that is related to this `Storage`. */
  responsiblePerson?: Maybe<User>;
  /** Reads and enables pagination through a set of `Session`. */
  sessions: SessionsConnection;
  /** Reads and enables pagination through a set of `Warehouse`. */
  warehouses: WarehousesConnection;
};


export type StorageSessionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SessionsOrderBy>>;
  condition?: Maybe<SessionCondition>;
  filter?: Maybe<SessionFilter>;
};


export type StorageWarehousesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WarehousesOrderBy>>;
  condition?: Maybe<WarehouseCondition>;
  filter?: Maybe<WarehouseFilter>;
};

/** A condition to be used against `Storage` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type StorageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `storageName` field. */
  storageName?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `storageType` field. */
  storageType?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `responsiblePersonId` field. */
  responsiblePersonId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `Storage` object types. All fields are combined with a logical ‘and.’ */
export type StorageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `storageName` field. */
  storageName?: Maybe<JsonFilter>;
  /** Filter by the object’s `storageType` field. */
  storageType?: Maybe<IntFilter>;
  /** Filter by the object’s `responsiblePersonId` field. */
  responsiblePersonId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<StorageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<StorageFilter>>;
  /** Negates the expression. */
  not?: Maybe<StorageFilter>;
};

/** An input for mutations affecting `Storage` */
export type StorageInput = {
  storageName: Scalars['JSON'];
  storageType: Scalars['Int'];
  responsiblePersonId: Scalars['Int'];
};

/** Represents an update to a `Storage`. Fields that are set will be updated. */
export type StoragePatch = {
  storageName?: Maybe<Scalars['JSON']>;
  storageType?: Maybe<Scalars['Int']>;
  responsiblePersonId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Storage` values. */
export type StoragesConnection = {
  __typename?: 'StoragesConnection';
  /** A list of `Storage` objects. */
  nodes: Array<Maybe<Storage>>;
  /** A list of edges which contains the `Storage` and cursor to aid in pagination. */
  edges: Array<StoragesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Storage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Storage` edge in the connection. */
export type StoragesEdge = {
  __typename?: 'StoragesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Storage` at the end of the edge. */
  node?: Maybe<Storage>;
};

/** Methods to use when ordering `Storage`. */
export enum StoragesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  StorageNameAsc = 'STORAGE_NAME_ASC',
  StorageNameDesc = 'STORAGE_NAME_DESC',
  StorageTypeAsc = 'STORAGE_TYPE_ASC',
  StorageTypeDesc = 'STORAGE_TYPE_DESC',
  ResponsiblePersonIdAsc = 'RESPONSIBLE_PERSON_ID_ASC',
  ResponsiblePersonIdDesc = 'RESPONSIBLE_PERSON_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
};

/** All input for the `updateMainByNodeId` mutation. */
export type UpdateMainByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Main` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Main` being updated. */
  patch: MainPatch;
};

/** All input for the `updateMain` mutation. */
export type UpdateMainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Main` being updated. */
  patch: MainPatch;
  id: Scalars['Int'];
};

/** The output of our update `Main` mutation. */
export type UpdateMainPayload = {
  __typename?: 'UpdateMainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Main` that was updated by this mutation. */
  main?: Maybe<Main>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Session` that is related to this `Main`. */
  session?: Maybe<Session>;
  /** Reads a single `Warehouse` that is related to this `Main`. */
  product?: Maybe<Warehouse>;
  /** An edge for our `Main`. May be used by Relay 1. */
  mainEdge?: Maybe<MainsEdge>;
};


/** The output of our update `Main` mutation. */
export type UpdateMainPayloadMainEdgeArgs = {
  orderBy?: Maybe<Array<MainsOrderBy>>;
};

/** All input for the `updateSessionByNodeId` mutation. */
export type UpdateSessionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Session` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Session` being updated. */
  patch: SessionPatch;
};

/** All input for the `updateSession` mutation. */
export type UpdateSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Session` being updated. */
  patch: SessionPatch;
  id: Scalars['Int'];
};

/** The output of our update `Session` mutation. */
export type UpdateSessionPayload = {
  __typename?: 'UpdateSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Session` that was updated by this mutation. */
  session?: Maybe<Session>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Storage` that is related to this `Session`. */
  storage?: Maybe<Storage>;
  /** An edge for our `Session`. May be used by Relay 1. */
  sessionEdge?: Maybe<SessionsEdge>;
};


/** The output of our update `Session` mutation. */
export type UpdateSessionPayloadSessionEdgeArgs = {
  orderBy?: Maybe<Array<SessionsOrderBy>>;
};

/** All input for the `updateStorageByNodeId` mutation. */
export type UpdateStorageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Storage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Storage` being updated. */
  patch: StoragePatch;
};

/** All input for the `updateStorage` mutation. */
export type UpdateStorageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Storage` being updated. */
  patch: StoragePatch;
  id: Scalars['Int'];
};

/** The output of our update `Storage` mutation. */
export type UpdateStoragePayload = {
  __typename?: 'UpdateStoragePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Storage` that was updated by this mutation. */
  storage?: Maybe<Storage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Storage`. */
  responsiblePerson?: Maybe<User>;
  /** An edge for our `Storage`. May be used by Relay 1. */
  storageEdge?: Maybe<StoragesEdge>;
};


/** The output of our update `Storage` mutation. */
export type UpdateStoragePayloadStorageEdgeArgs = {
  orderBy?: Maybe<Array<StoragesOrderBy>>;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByUsername` mutation. */
export type UpdateUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  username: Scalars['String'];
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  id: Scalars['Int'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `UserPrivelage` that is related to this `User`. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateUserPrivelageByNodeId` mutation. */
export type UpdateUserPrivelageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserPrivelage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserPrivelage` being updated. */
  patch: UserPrivelagePatch;
};

/** All input for the `updateUserPrivelage` mutation. */
export type UpdateUserPrivelageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserPrivelage` being updated. */
  patch: UserPrivelagePatch;
  id: Scalars['Int'];
};

/** The output of our update `UserPrivelage` mutation. */
export type UpdateUserPrivelagePayload = {
  __typename?: 'UpdateUserPrivelagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPrivelage` that was updated by this mutation. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserPrivelage`. May be used by Relay 1. */
  userPrivelageEdge?: Maybe<UserPrivelagesEdge>;
};


/** The output of our update `UserPrivelage` mutation. */
export type UpdateUserPrivelagePayloadUserPrivelageEdgeArgs = {
  orderBy?: Maybe<Array<UserPrivelagesOrderBy>>;
};

/** All input for the `updateWarehouseByNodeId` mutation. */
export type UpdateWarehouseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Warehouse` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Warehouse` being updated. */
  patch: WarehousePatch;
};

/** All input for the `updateWarehouse` mutation. */
export type UpdateWarehouseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Warehouse` being updated. */
  patch: WarehousePatch;
  id: Scalars['Int'];
};

/** The output of our update `Warehouse` mutation. */
export type UpdateWarehousePayload = {
  __typename?: 'UpdateWarehousePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Warehouse` that was updated by this mutation. */
  warehouse?: Maybe<Warehouse>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Storage` that is related to this `Warehouse`. */
  storage?: Maybe<Storage>;
  /** An edge for our `Warehouse`. May be used by Relay 1. */
  warehouseEdge?: Maybe<WarehousesEdge>;
};


/** The output of our update `Warehouse` mutation. */
export type UpdateWarehousePayloadWarehouseEdgeArgs = {
  orderBy?: Maybe<Array<WarehousesOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  userPrivelageId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `UserPrivelage` that is related to this `User`. */
  userPrivelage?: Maybe<UserPrivelage>;
  /** Reads and enables pagination through a set of `Storage`. */
  storagesByResponsiblePersonId: StoragesConnection;
};


export type UserStoragesByResponsiblePersonIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<StoragesOrderBy>>;
  condition?: Maybe<StorageCondition>;
  filter?: Maybe<StorageFilter>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `firstname` field. */
  firstname?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `surname` field. */
  surname?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `userPrivelageId` field. */
  userPrivelageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `firstname` field. */
  firstname?: Maybe<StringFilter>;
  /** Filter by the object’s `surname` field. */
  surname?: Maybe<StringFilter>;
  /** Filter by the object’s `userPrivelageId` field. */
  userPrivelageId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  userPrivelageId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  username?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  userPrivelageId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

export type UserPrivelage = Node & {
  __typename?: 'UserPrivelage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  privelageName: Scalars['String'];
  modulesAccess: Scalars['JSON'];
  /** Reads and enables pagination through a set of `User`. */
  users: UsersConnection;
};


export type UserPrivelageUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};

/**
 * A condition to be used against `UserPrivelage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserPrivelageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `privelageName` field. */
  privelageName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `modulesAccess` field. */
  modulesAccess?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `UserPrivelage` object types. All fields are combined with a logical ‘and.’ */
export type UserPrivelageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `privelageName` field. */
  privelageName?: Maybe<StringFilter>;
  /** Filter by the object’s `modulesAccess` field. */
  modulesAccess?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserPrivelageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserPrivelageFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserPrivelageFilter>;
};

/** An input for mutations affecting `UserPrivelage` */
export type UserPrivelageInput = {
  privelageName: Scalars['String'];
  modulesAccess: Scalars['JSON'];
};

/** Represents an update to a `UserPrivelage`. Fields that are set will be updated. */
export type UserPrivelagePatch = {
  privelageName?: Maybe<Scalars['String']>;
  modulesAccess?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `UserPrivelage` values. */
export type UserPrivelagesConnection = {
  __typename?: 'UserPrivelagesConnection';
  /** A list of `UserPrivelage` objects. */
  nodes: Array<Maybe<UserPrivelage>>;
  /** A list of edges which contains the `UserPrivelage` and cursor to aid in pagination. */
  edges: Array<UserPrivelagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserPrivelage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserPrivelage` edge in the connection. */
export type UserPrivelagesEdge = {
  __typename?: 'UserPrivelagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserPrivelage` at the end of the edge. */
  node?: Maybe<UserPrivelage>;
};

/** Methods to use when ordering `UserPrivelage`. */
export enum UserPrivelagesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  PrivelageNameAsc = 'PRIVELAGE_NAME_ASC',
  PrivelageNameDesc = 'PRIVELAGE_NAME_DESC',
  ModulesAccessAsc = 'MODULES_ACCESS_ASC',
  ModulesAccessDesc = 'MODULES_ACCESS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  FirstnameAsc = 'FIRSTNAME_ASC',
  FirstnameDesc = 'FIRSTNAME_DESC',
  SurnameAsc = 'SURNAME_ASC',
  SurnameDesc = 'SURNAME_DESC',
  UserPrivelageIdAsc = 'USER_PRIVELAGE_ID_ASC',
  UserPrivelageIdDesc = 'USER_PRIVELAGE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Warehouse = Node & {
  __typename?: 'Warehouse';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['JSON'];
  title2: Scalars['JSON'];
  parentId: Scalars['Int'];
  clusterId: Scalars['Int'];
  clusterOrderDefaultId: Scalars['Int'];
  barcode: Scalars['String'];
  minQuantity?: Maybe<Scalars['Float']>;
  optimalQuantity?: Maybe<Scalars['Float']>;
  expDateWarning?: Maybe<Scalars['Int']>;
  imageLink?: Maybe<Scalars['String']>;
  isWeight: Scalars['BitString'];
  isInventory: Scalars['BitString'];
  storageId: Scalars['Int'];
  measureBy?: Maybe<Scalars['BitString']>;
  marginDefault?: Maybe<Scalars['Float']>;
  /** Reads a single `Storage` that is related to this `Warehouse`. */
  storage?: Maybe<Storage>;
  /** Reads and enables pagination through a set of `Main`. */
  mainsByProductId: MainsConnection;
};


export type WarehouseMainsByProductIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MainsOrderBy>>;
  condition?: Maybe<MainCondition>;
  filter?: Maybe<MainFilter>;
};

/**
 * A condition to be used against `Warehouse` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type WarehouseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `title` field. */
  title?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `title2` field. */
  title2?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `clusterId` field. */
  clusterId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `clusterOrderDefaultId` field. */
  clusterOrderDefaultId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `barcode` field. */
  barcode?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `minQuantity` field. */
  minQuantity?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `optimalQuantity` field. */
  optimalQuantity?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `expDateWarning` field. */
  expDateWarning?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageLink` field. */
  imageLink?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isWeight` field. */
  isWeight?: Maybe<Scalars['BitString']>;
  /** Checks for equality with the object’s `isInventory` field. */
  isInventory?: Maybe<Scalars['BitString']>;
  /** Checks for equality with the object’s `storageId` field. */
  storageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `measureBy` field. */
  measureBy?: Maybe<Scalars['BitString']>;
  /** Checks for equality with the object’s `marginDefault` field. */
  marginDefault?: Maybe<Scalars['Float']>;
};

/** A filter to be used against `Warehouse` object types. All fields are combined with a logical ‘and.’ */
export type WarehouseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<JsonFilter>;
  /** Filter by the object’s `title2` field. */
  title2?: Maybe<JsonFilter>;
  /** Filter by the object’s `parentId` field. */
  parentId?: Maybe<IntFilter>;
  /** Filter by the object’s `clusterId` field. */
  clusterId?: Maybe<IntFilter>;
  /** Filter by the object’s `clusterOrderDefaultId` field. */
  clusterOrderDefaultId?: Maybe<IntFilter>;
  /** Filter by the object’s `barcode` field. */
  barcode?: Maybe<StringFilter>;
  /** Filter by the object’s `minQuantity` field. */
  minQuantity?: Maybe<FloatFilter>;
  /** Filter by the object’s `optimalQuantity` field. */
  optimalQuantity?: Maybe<FloatFilter>;
  /** Filter by the object’s `expDateWarning` field. */
  expDateWarning?: Maybe<IntFilter>;
  /** Filter by the object’s `imageLink` field. */
  imageLink?: Maybe<StringFilter>;
  /** Filter by the object’s `isWeight` field. */
  isWeight?: Maybe<BitStringFilter>;
  /** Filter by the object’s `isInventory` field. */
  isInventory?: Maybe<BitStringFilter>;
  /** Filter by the object’s `storageId` field. */
  storageId?: Maybe<IntFilter>;
  /** Filter by the object’s `measureBy` field. */
  measureBy?: Maybe<BitStringFilter>;
  /** Filter by the object’s `marginDefault` field. */
  marginDefault?: Maybe<FloatFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<WarehouseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<WarehouseFilter>>;
  /** Negates the expression. */
  not?: Maybe<WarehouseFilter>;
};

/** An input for mutations affecting `Warehouse` */
export type WarehouseInput = {
  title: Scalars['JSON'];
  title2: Scalars['JSON'];
  parentId: Scalars['Int'];
  clusterId: Scalars['Int'];
  clusterOrderDefaultId: Scalars['Int'];
  barcode: Scalars['String'];
  minQuantity?: Maybe<Scalars['Float']>;
  optimalQuantity?: Maybe<Scalars['Float']>;
  expDateWarning?: Maybe<Scalars['Int']>;
  imageLink?: Maybe<Scalars['String']>;
  isWeight?: Maybe<Scalars['BitString']>;
  isInventory?: Maybe<Scalars['BitString']>;
  storageId: Scalars['Int'];
  measureBy?: Maybe<Scalars['BitString']>;
  marginDefault?: Maybe<Scalars['Float']>;
};

/** Represents an update to a `Warehouse`. Fields that are set will be updated. */
export type WarehousePatch = {
  title?: Maybe<Scalars['JSON']>;
  title2?: Maybe<Scalars['JSON']>;
  parentId?: Maybe<Scalars['Int']>;
  clusterId?: Maybe<Scalars['Int']>;
  clusterOrderDefaultId?: Maybe<Scalars['Int']>;
  barcode?: Maybe<Scalars['String']>;
  minQuantity?: Maybe<Scalars['Float']>;
  optimalQuantity?: Maybe<Scalars['Float']>;
  expDateWarning?: Maybe<Scalars['Int']>;
  imageLink?: Maybe<Scalars['String']>;
  isWeight?: Maybe<Scalars['BitString']>;
  isInventory?: Maybe<Scalars['BitString']>;
  storageId?: Maybe<Scalars['Int']>;
  measureBy?: Maybe<Scalars['BitString']>;
  marginDefault?: Maybe<Scalars['Float']>;
};

/** A connection to a list of `Warehouse` values. */
export type WarehousesConnection = {
  __typename?: 'WarehousesConnection';
  /** A list of `Warehouse` objects. */
  nodes: Array<Maybe<Warehouse>>;
  /** A list of edges which contains the `Warehouse` and cursor to aid in pagination. */
  edges: Array<WarehousesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Warehouse` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Warehouse` edge in the connection. */
export type WarehousesEdge = {
  __typename?: 'WarehousesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Warehouse` at the end of the edge. */
  node?: Maybe<Warehouse>;
};

/** Methods to use when ordering `Warehouse`. */
export enum WarehousesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  Title2Asc = 'TITLE2_ASC',
  Title2Desc = 'TITLE2_DESC',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  ClusterIdAsc = 'CLUSTER_ID_ASC',
  ClusterIdDesc = 'CLUSTER_ID_DESC',
  ClusterOrderDefaultIdAsc = 'CLUSTER_ORDER_DEFAULT_ID_ASC',
  ClusterOrderDefaultIdDesc = 'CLUSTER_ORDER_DEFAULT_ID_DESC',
  BarcodeAsc = 'BARCODE_ASC',
  BarcodeDesc = 'BARCODE_DESC',
  MinQuantityAsc = 'MIN_QUANTITY_ASC',
  MinQuantityDesc = 'MIN_QUANTITY_DESC',
  OptimalQuantityAsc = 'OPTIMAL_QUANTITY_ASC',
  OptimalQuantityDesc = 'OPTIMAL_QUANTITY_DESC',
  ExpDateWarningAsc = 'EXP_DATE_WARNING_ASC',
  ExpDateWarningDesc = 'EXP_DATE_WARNING_DESC',
  ImageLinkAsc = 'IMAGE_LINK_ASC',
  ImageLinkDesc = 'IMAGE_LINK_DESC',
  IsWeightAsc = 'IS_WEIGHT_ASC',
  IsWeightDesc = 'IS_WEIGHT_DESC',
  IsInventoryAsc = 'IS_INVENTORY_ASC',
  IsInventoryDesc = 'IS_INVENTORY_DESC',
  StorageIdAsc = 'STORAGE_ID_ASC',
  StorageIdDesc = 'STORAGE_ID_DESC',
  MeasureByAsc = 'MEASURE_BY_ASC',
  MeasureByDesc = 'MEASURE_BY_DESC',
  MarginDefaultAsc = 'MARGIN_DEFAULT_ASC',
  MarginDefaultDesc = 'MARGIN_DEFAULT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AuthenticateMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { authenticate?: Maybe<(
    { __typename?: 'AuthenticatePayload' }
    & Pick<AuthenticatePayload, 'jwt'>
  )> }
);

export type FetchUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<(
    { __typename?: 'UsersConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>> }
  )> }
);


export const AuthenticateDocument = gql`
    mutation authenticate($username: String!, $password: String!) {
  authenticate(input: {username: $username, password: $password}) {
    jwt
  }
}
    `;
export type AuthenticateMutationFn = Apollo.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const FetchUsersDocument = gql`
    query FetchUsers {
  users {
    nodes {
      id
      username
    }
  }
}
    `;

/**
 * __useFetchUsersQuery__
 *
 * To run a query within a React component, call `useFetchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUsersQuery(baseOptions?: Apollo.QueryHookOptions<FetchUsersQuery, FetchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUsersQuery, FetchUsersQueryVariables>(FetchUsersDocument, options);
      }
export function useFetchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUsersQuery, FetchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUsersQuery, FetchUsersQueryVariables>(FetchUsersDocument, options);
        }
export type FetchUsersQueryHookResult = ReturnType<typeof useFetchUsersQuery>;
export type FetchUsersLazyQueryHookResult = ReturnType<typeof useFetchUsersLazyQuery>;
export type FetchUsersQueryResult = Apollo.QueryResult<FetchUsersQuery, FetchUsersQueryVariables>;