class Tip extends Popup {
    constructor() {
        super();
    }

    /**
     * 警告
     * @param {*} content
     */
    warn(content) {
        this.load({
            content: `
                        ${content}
                    `,
        });
    }
}
