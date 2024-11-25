const { Util, Component, Form, Observe, VC, Extend, Time, Ajax } = LY;
const { DropList, Radio, Switch, Slider, Checkbox, MultipleList } = Form;
const { WaterMark, ScrollBar, FileUpload, FilePreview, ScrollTop, Popup, Pagination } = Extend;

function createApp(selector) {
    class App extends Component {
        constructor(selector) {
            super(selector);
        }

        /**
         * 挂载成功
         */
        _mounted() {
            let componentList = this.node.attr('data-mounted');

            if (componentList == null) {
                return;
            }

            componentList = componentList.split(',');
            componentList.forEach((componentName) => {
                componentName = componentName.trim();

                if (!this._children[componentName] instanceof Component) {
                    console.log(componentName, '没有定义load方法！');
                    return;
                }

                if (typeof this._children[componentName].load === 'function') {
                    this._children[componentName].load();
                } else {
                    console.log(componentName, '没有定义load方法！');
                }
            });
        }
    }

    return new App(selector || '#app');
}
