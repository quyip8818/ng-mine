/**
 * Created by derek on 2016/5/26.
 */

export class DefaultValue {
    private static defaultConfig = {
        height: 10,
        width: 10,
        num_mines: 20
    };

    static getDefaultConfig() {
        return Object.assign({}, this.defaultConfig);
    }

    static resetDefaultConfig(config) {
        return Object.assign(config, this.defaultConfig);
    }
}