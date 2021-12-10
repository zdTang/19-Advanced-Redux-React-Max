# redux and useEffect

redux: 还原  
reducer:减震器

reducer must be pure, side-effect free, synchronous functions

For using "@reduxjs/toolkit", also need "react-redux" package

About how to write "useSlice" : https://redux-toolkit.js.org/usage/usage-guide#simplifying-slices-with-createslice

## Provider

It define the scope of the state
It must work with "store"

## dispatch actions

need useDispatch to generate a "dispatch"
need import Actions from Slices
actions must work with "Dispatch"

## useSelector to get Slice's state

To get a state from Slice, must reference slice's name property
Because a state has been divided into several slices.
(if work with Redux other than "toolkit", then use "state" is OK)

## javascript find() goes here

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find  
Each item in the Cart is not just a Product, but much more information such as total price
Be aware of how to pass action to reducer !!!

## Writing Action Creators

https://redux-toolkit.js.org/usage/usage-guide#defining-action-creators-with-createaction

Slice(): The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

## Side-effect ??

Once we update state, how to save the state to remote database as well?

Scenario:
1, our backend cannot validate, it just save data, so that we should validate data at the front end.  
2, our reducer cannot has Asynchronous code, so that sending HTTP request cannot be occurs in the Reducer

In our case, once user submit a order, the "addToCart" reducer is fired.  
In the "addToCart" reducer, "logic code" to validate the payload before updating
the "state"

In order to update State and send HTTP as well. we have two options:

1, In the component's Handler function.
2, In the Reducer.

### Option one[Fat Component]

Move "logic" code to component's eventHandler function(just put before using "dispatch"). so that once finish validating the logic, we will then dispatch Reducer to update state and call HTTP to save date to back end as well.  
This approach works, but will make the component very fat, and the Reducer just save data. It will make the Redux not that important.

### Option two (Fat Reducer)

We still put those "logic" in the Reducer, once the Reducer finished updating state,at another component, we should monitor and be aware of it and will fire HTTP request to save the current data to remote back end.

## Thunk

https://redux-toolkit.js.org/api/createAsyncThunk

this approach can keep our component lean. For instance, the App.js has a very simple useEffect which only dispatch a action creator. Heavy job will be taken by the function in the Redux.

Study the function. too many asynchronous.  
Watch the Max's lecture to understand how Redux Toolkit deal with those Action creator: Redux will expect an Action object, it also expect an function.
