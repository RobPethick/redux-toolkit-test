## Readme

#### Tasks
#1 - Use create-react-app + Import Material UI + other dependenciies
#2 - Import data and show matches for selected day
#3 - style matches
#4 - add other filters
#5 - host on gh pages




#### Shortcuts
I used a number of shortcuts that I wouldn't do in a production environment. 
#1 Not using gitflow - in a collaborative environment I would expect to use gitflow to merge branches with Pull Requests. Each branch name including the work item reference. Here I have been lazy and stuck with just master.
#2 Directly using Material UI - in a prod env I would create a component library folder with shared components (that may or may not reference an external design library). This would keep design consistency.
#3 I would discuss with analysis which of the filters are "open" and more options can be added (probably just specialisms) and which are closed and therefore can be made into enums in the FE for stronger typing.