import isInRootLocation from './is-in-root-location.js';
export default function findByReference(gameDefinition, userId, reference) {
    const { references, variables } = gameDefinition;
    if (!reference) {
        return undefined;
    }
    const candidates = references[reference];
    if (!candidates) {
        return undefined;
    }
    else if (candidates.length === 1) {
        return candidates[0];
    }
    // more than one candidate
    const currentLocation = variables[userId].location;
    // TODO: handle scenarios where there are multiple items in the same location
    // TODO: handle "it"
    return candidates.find(candidate => {
        const passage = variables[candidate];
        return passage.in === currentLocation || passage.out === currentLocation || isInRootLocation(variables, candidate, currentLocation);
    });
}
