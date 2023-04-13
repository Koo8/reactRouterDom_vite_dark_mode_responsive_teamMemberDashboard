## This project use Vite React Tailwindcss and React router dom

#### Important! React Router emulates HTML Form navigation as the data mutation primitive

- HTML forms cause a navigation in the browser, it can change urls, request methods and request body.
- https://reactrouter.com/en/main/start/tutorial#data-writes--html-forms
- both <Link> and <Form> enable client side routing, so the GET request of URLSearchParams and POST request of its body are sent to a route 'action', including request.formData

#### global pending UI using useNavigation().state === 'loading' for opacity and duration inside className, this is done within the root.jsx so that all routes has the fading effect when 'loading'.

- https://reactrouter.com/en/main/start/tutorial#global-pending-ui

#### For 'delete' button inside 'contactRoute'

- Instead of making a new route of 'destroy', inside the <Form> I add the action='destroy', then within the contactRoute, I created the destroyAction. This relative 'destroy' route is added into the routes, without <element>, because it doesn't need to render a new display, but just redirect.

#### for same effect of 'back' in browser use useNavigate()(-1).

## Steps and notes:

- create routes folder in src -- holding all routes (root)
- use Left component to hold all sidebar contents.
- for 'contacts' data cached locally, use RRD's loader to pass the contacts data instead of useContext from React. This is one thing RRD is better.
- for 'New' button, instead of onClick() function, use action in Route to do update on loader data, register action in Route tree.
- make Button and Input components to abstract these elements
- make errorPage for most routes(404 page)
- add index.jsx for root route
- unified all --base-color variable within tailwindcss.

#### Create search spinning :

> useNavigation for loading indicators, useNavigation().location tells the next would-be location. It has .pathname .search(?q=a) .hash .state and .key properties.
> 'isSearching' is true only when navigation.location is true. The cycle is idle->location-idle. In order for spinning to be viewed, add fakeNetwork delay to each fetch data function to extend the elapse of navigation.location, only hidden when location is idle.

#### create search image using tailwindcss

- reference: https://codepen.io/satrya/pen/JGRxNb

#### useFetcher for 'favorite' star image - to mutate data without navigation (no change in URL) (<Link><Form> both mutate data with navigation, useSubmit do the same, but force an submit, with 'replace' can leave no trace on history stack). When all updates happen on the same page, useFetcher() post to action but no URL updates needed.

- fetcher.formData?.get('fav') can be used to instantly update the UI with mutated data => optimistic UI. However, to manipulate data in loader needs 'post' to an action.

#### parent and children routes share same errorPage: use Pathless Routes

- https://reactrouter.com/en/main/start/tutorial#pathless-routes

#### to remove highlighted ring in input field when focus in tailwindcss

- outline-none

#### useSubmit to force submit a Form when a value changes, so no need to click or return by the user, this is useful for search input field to constantly update with search terms. Use SubmitOptions(https://www.jsdocs.io/package/react-router-dom#SubmitOptions) 'replace' option to 'Set true to replace the current entry in the browser's history stack instead of creating a new one (i.e. stay on "the same page"). Defaults to false.'

#### Since the left side panel can't stretch to full screen or not create a scroll bar for Nav part when shorten the screen height, redo the tailwindcss design

- add
  html,
  body{
  height: 100%
  }
  to index.css to make sure the parent is taking full screen height
- flex-1 to make the <nav> part flexible in spare space
- the following parent div for sidebar should display flex with h-full
- the sidebar nav part is stretch to its full and when shrink has a scroll bar.

## Some extra gains from this project

- Q: to generate a 7 character string composed of characters picked randomly from the set [a-zA-Z0-9]
  > A: Math.random().toString(36).substring(2, 9); this is not truely random. Another way, crypto.randomUUID().slice(-8), this require no installation of packages.
- nullish coalescing operator ??, which treats null and undefined as specific values, so does optional chaining operator(?.) e.g. foo.bar?.toUpperCase() ?? 'not available' => combine them, safely access a prop (bar) of an object(foo) which may be nullish and provide a default value if it is.

- matchSorter from npm install match-sorter for best-match sorting of an array in js.

- when creating <Star /> i messed up 'true' with boolean true. {favorite: 'true'} is not {favorite: true}, to save as a boolean value use 'request.formData().get"favorite" === "true" ', after Object.fromEntries(theFormData), output is {favoriate: "true"}, not {favoriate: true};

## I add these more features for this app

#### save to shared DB

#### add GoogleFont

#### PWA and installable

#### responsive

#### add icons for mode, github, discord, blog

#### login page, protected content
