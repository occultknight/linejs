line.module([
    '../core/Observable',
    './Dictionary'
], function (Observable, Dictionary) {

    /**
     * @class ObservableDictionary
     * @extends line.Dictionary
     * @uses line.Observable
     * @constructor
     * @param dict
     */
    return line.define('ObservableDictionary', Dictionary, {
        mixins: [Observable],
        events: ['change'],
        methods: {
            /**
             * @method setItem
             * @param key {String}
             * @param value {any}
             */
            setItem: function (key, value) {
                var map = this._map;
                if (key in map) {
                    var oldItem = map[key];
                    var newItem = map[key] = {
                        key: key,
                        value: value
                    };
                    this.fire('change', {
                        action: 'replace',
                        oldItem: oldItem,
                        newItem: newItem
                    });
                }
                else {
                    var item = map[key] = {
                        key: key,
                        value: value
                    };
                    this.notify('count');
                    this.fire('change', {
                        action: 'add',
                        items: [item]
                    });
                }
            },
            /**
             * @method removeItem
             * @param key {String}
             */
            removeItem: function (key) {
                var map = this._map;
                if (key in map) {
                    var item = map[key];
                    delete map[key];
                    this.notify('count');
                    this.fire('change', {
                        action: 'remove',
                        items: [item]
                    });
                }
            },
            /**
             * @method clear
             */
            clear: function () {
                var result = this._map;
                this._map = {};
                this.notify('count');
                this.fire('change', {
                    action: 'clear',
                    items: this.toArray()
                });
            }
        }
    });

});