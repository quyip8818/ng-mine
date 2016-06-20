/**
 * Created by derek on 2016/5/26.
 */
"use strict";
class DefaultValue {
    static getDefaultConfig() {
        return Object.assign({}, this.defaultConfig);
    }
    static resetDefaultConfig(config) {
        return Object.assign(config, this.defaultConfig);
    }
}
DefaultValue.defaultConfig = {
    height: 10,
    width: 10,
    num_mines: 20
};
exports.DefaultValue = DefaultValue;
//# sourceMappingURL=default_value.js.map