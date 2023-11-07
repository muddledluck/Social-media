"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventCallback = void 0;
var react_1 = require("react");
var useIsomorphicLayoutEffect_1 = require("@/hooks/storage/useIsomorphicLayoutEffect");
/**
 * Creates a callback function that can be safely used without issues during rendering.
 *
 * @template Args
 * @template Return
 * @param {(...args: Args) => Return} callback - The callback function to wrap.
 * @returns {(...args: Args) => Return} A wrapped callback function.
 */
function useEventCallback(callback) {
    // This reference stores the callback function. It should not be called during rendering.
    var ref = (0, react_1.useRef)(function () {
        throw new Error("Cannot call an event handler while rendering.");
    });
    // Use the useIsomorphicLayoutEffect hook to update the reference when the callback changes.
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(function () {
        ref.current = callback;
    }, [callback]);
    /**
     * Returns a new callback function that wraps the reference, allowing it to be safely called.
     * @param {...Args} args - Arguments to pass to the callback.
     * @returns {Return} The result of the callback.
     */
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ref.current.apply(ref, args);
    }, [ref]);
}
exports.useEventCallback = useEventCallback;
