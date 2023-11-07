"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var useEventCallback_1 = require("@/hooks/storage/useEventCallback");
var useEventListener_1 = require("@/hooks/storage/useEventListener");
var react_1 = require("react");
var LS = "local-storage";
function useLocalStorage(key, initialValue) {
    var readValue = (0, react_1.useCallback)(function () {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            var item = window.localStorage.getItem(key);
            return item ? parseJSON(item) : initialValue;
        }
        catch (error) {
            console.error("Error reading localStorage key \u201C".concat(key, "\u201D"), error);
            return initialValue;
        }
    }, [initialValue, key]);
    var _a = (0, react_1.useState)(readValue), storedValue = _a[0], setStoredValue = _a[1];
    var setValue = (0, useEventCallback_1.useEventCallback)(function (value) {
        if (typeof window === "undefined") {
            console.warn("Tried setting localStorage key \u201C".concat(key, "\u201D even though environment is not a client"));
        }
        try {
            var newValue = value instanceof Function ? value(storedValue) : value;
            if (newValue === undefined) {
                window.localStorage.removeItem(key);
            }
            else {
                window.localStorage.setItem(key, JSON.stringify(newValue));
                setStoredValue(newValue);
            }
            window.dispatchEvent(new Event(LS));
        }
        catch (err) {
            console.error("Error setting localStorage key \u201C".concat(key, "\u201D"), err);
        }
    });
    (0, react_1.useEffect)(function () {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var handleStorageChange = (0, react_1.useCallback)(function (event) {
        if ((event === null || event === void 0 ? void 0 : event.key) && event.key !== key) {
            return;
        }
        setStoredValue(readValue());
    }, [key, readValue]);
    (0, useEventListener_1.useEventListener)("storage", handleStorageChange);
    (0, useEventListener_1.useEventListener)(LS, handleStorageChange);
    return [storedValue, setValue];
}
exports.useLocalStorage = useLocalStorage;
function parseJSON(value) {
    try {
        return value === "undefined" ? undefined : JSON.parse(value !== null && value !== void 0 ? value : "");
    }
    catch (_a) {
        console.error("Error parsing JSON value", { value: value });
        return undefined;
    }
}
