export function createEmitter(initialValue, bitmaskFactory) {
    var registeredUpdaters = [];
    var value = initialValue;
    var diff = function (newValue) { return bitmaskFactory(value, newValue) | 0; };
    return {
        register: function (updater) {
            registeredUpdaters.push(updater);
            updater(value, diff(value));
        },
        unregister: function (updater) {
            registeredUpdaters = registeredUpdaters.filter(function (i) { return i !== updater; });
        },
        val: function (newValue) {
            if (newValue === undefined || newValue == value) {
                return value;
            }
            var bitmask = diff(newValue);
            value = newValue;
            registeredUpdaters.forEach(function (up) { return up(newValue, bitmask); });
            return value;
        }
    };
}
export var noopEmitter = {
    register: function (_) {
        console.warn("Consumer used without a Provider");
    },
    unregister: function (_) {
        // do nothing
    },
    val: function (_) {
        //do nothing;
    }
};
