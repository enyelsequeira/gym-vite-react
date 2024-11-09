/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedOverviewImport } from './routes/_authenticated/overview'
import { Route as AuthenticatedFoodImport } from './routes/_authenticated/food'
import { Route as AuthenticatedDietImport } from './routes/_authenticated/diet'
import { Route as AuthenticatedUsersIndexImport } from './routes/_authenticated/users/index'
import { Route as AuthLoginIndexImport } from './routes/_auth/login/index'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedOverviewRoute = AuthenticatedOverviewImport.update({
  id: '/overview',
  path: '/overview',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedFoodRoute = AuthenticatedFoodImport.update({
  id: '/food',
  path: '/food',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedDietRoute = AuthenticatedDietImport.update({
  id: '/diet',
  path: '/diet',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedUsersIndexRoute = AuthenticatedUsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/diet': {
      id: '/_authenticated/diet'
      path: '/diet'
      fullPath: '/diet'
      preLoaderRoute: typeof AuthenticatedDietImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/food': {
      id: '/_authenticated/food'
      path: '/food'
      fullPath: '/food'
      preLoaderRoute: typeof AuthenticatedFoodImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/overview': {
      id: '/_authenticated/overview'
      path: '/overview'
      fullPath: '/overview'
      preLoaderRoute: typeof AuthenticatedOverviewImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_auth/login/': {
      id: '/_auth/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/users/': {
      id: '/_authenticated/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthenticatedUsersIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginIndexRoute: typeof AuthLoginIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginIndexRoute: AuthLoginIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedDietRoute: typeof AuthenticatedDietRoute
  AuthenticatedFoodRoute: typeof AuthenticatedFoodRoute
  AuthenticatedOverviewRoute: typeof AuthenticatedOverviewRoute
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRoute
  AuthenticatedUsersIndexRoute: typeof AuthenticatedUsersIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDietRoute: AuthenticatedDietRoute,
  AuthenticatedFoodRoute: AuthenticatedFoodRoute,
  AuthenticatedOverviewRoute: AuthenticatedOverviewRoute,
  AuthenticatedProfileRoute: AuthenticatedProfileRoute,
  AuthenticatedUsersIndexRoute: AuthenticatedUsersIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/diet': typeof AuthenticatedDietRoute
  '/food': typeof AuthenticatedFoodRoute
  '/overview': typeof AuthenticatedOverviewRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/login': typeof AuthLoginIndexRoute
  '/users': typeof AuthenticatedUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/diet': typeof AuthenticatedDietRoute
  '/food': typeof AuthenticatedFoodRoute
  '/overview': typeof AuthenticatedOverviewRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/login': typeof AuthLoginIndexRoute
  '/users': typeof AuthenticatedUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/diet': typeof AuthenticatedDietRoute
  '/_authenticated/food': typeof AuthenticatedFoodRoute
  '/_authenticated/overview': typeof AuthenticatedOverviewRoute
  '/_authenticated/profile': typeof AuthenticatedProfileRoute
  '/_auth/login/': typeof AuthLoginIndexRoute
  '/_authenticated/users/': typeof AuthenticatedUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/diet'
    | '/food'
    | '/overview'
    | '/profile'
    | '/login'
    | '/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/diet'
    | '/food'
    | '/overview'
    | '/profile'
    | '/login'
    | '/users'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_authenticated'
    | '/_authenticated/diet'
    | '/_authenticated/food'
    | '/_authenticated/overview'
    | '/_authenticated/profile'
    | '/_auth/login/'
    | '/_authenticated/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_authenticated"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login/"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/diet",
        "/_authenticated/food",
        "/_authenticated/overview",
        "/_authenticated/profile",
        "/_authenticated/users/"
      ]
    },
    "/_authenticated/diet": {
      "filePath": "_authenticated/diet.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/food": {
      "filePath": "_authenticated/food.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/overview": {
      "filePath": "_authenticated/overview.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_auth/login/": {
      "filePath": "_auth/login/index.tsx",
      "parent": "/_auth"
    },
    "/_authenticated/users/": {
      "filePath": "_authenticated/users/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
