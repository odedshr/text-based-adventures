# Text-based-adventures

An engine for text based adventures. Easily modifiable to create your own text-based adventures

## Mansion Escape demo

See it running on [gitpages](https://odedshr.github.io/text-based-adventures/).
The goal of the game of to escape the mansion but of courses it's never as simple as that. Good luck.

## What this is all about

Text-based adventure games are a simplified virtual escape room - the player find themselves in a situation in which they need to find out what's their goal and the go and achieve it.

The engine has a process method that gets 3 input parameters:
    - last user input string
    - current state of the world
    - current playerId (multiplayer support).

The state of the world, or the `GameDefinition` has the following structure
    - actions: Action[],
    - variables: {[key:string]:Variable},
    - references: {[key:string]:string[]},
    - handlers: ((gameDefinition:GameDefinition, variableName: string, variable: Variable) => void)[],
    - startTimer: (name:string) => void,
    - stopTimer: (name:string) => void
    - strings: { [key:string]: string | GetStringMethod },

### Actions

Actions have a regular-expression input, conditions that must pass for the action to take place (for example the player must be in a specific room) and eventually the action to be executed (changing the state of the world).

### Variables

Variables are player(s), rooms, passages, items, numbers or lists that can be manipulated.

### References

References are synonyms to variables (catching variations of how the user might refer to them).

### Handlers

Handlers allows you to catch and react any change of value to trigger other changes.

### startTimer / stopTimer

It is possible to update `NumberVariable` by interval of seconds for timed-base operation (such as count-down).
StartTimer will create the interval while stopTimer will stop it.

### strings

Strings are descriptions for the various variables or output for actions.

## It's super easy to add new rooms

Adding pieces to the puzzle is easy. A file usually contain variables, actions and strings. All relevant to a particular `RoomVariable` that has at least one `PassageVariable` that allows access to this room.
It might also include handlers for more completed operations but that's not very common.

## Thoughts on future version

I would be great to have a multiplayer game, save/load options and referring to the last item used as "it", but I'm going to focus on other projects. Let me know if you enjoyed or found it useful and I'll consider developing this further.
