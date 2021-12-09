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
