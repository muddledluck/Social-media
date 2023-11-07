"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
var useIsomorphicLayoutEffect_1 = require("@/hooks/storage/useIsomorphicLayoutEffect");
var react_1 = require("react");
function useEventListener(eventName, handler, element, options) {
    var savedHandler = (0, react_1.useRef)(handler);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(function () {
        savedHandler.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(function () {
        var targetElement = (element === null || element === void 0 ? void 0 : element.current) || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        var eventListener = function (event) {
            return savedHandler.current(event);
        };
        targetElement.addEventListener(eventName, eventListener, options);
        return function () { return targetElement.removeEventListener(eventName, eventListener); };
    }, [eventName, element, options]);
}
exports.useEventListener = useEventListener;
