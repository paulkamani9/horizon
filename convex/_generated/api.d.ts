/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.14.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as collaborations from "../collaborations.js";
import type * as documents from "../documents.js";
import type * as followership from "../followership.js";
import type * as http from "../http.js";
import type * as invitations from "../invitations.js";
import type * as messages from "../messages.js";
import type * as notifications from "../notifications.js";
import type * as search from "../search.js";
import type * as stars from "../stars.js";
import type * as tags from "../tags.js";
import type * as users from "../users.js";
import type * as views from "../views.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  collaborations: typeof collaborations;
  documents: typeof documents;
  followership: typeof followership;
  http: typeof http;
  invitations: typeof invitations;
  messages: typeof messages;
  notifications: typeof notifications;
  search: typeof search;
  stars: typeof stars;
  tags: typeof tags;
  users: typeof users;
  views: typeof views;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
