const { Util, Component, Form, Observe, VC, Extend, Time, Ajax } = LY;
const {
    ScrollTop,
    DropList,
    Radio,
    Switch,
    Slider,
    Checkbox,
    Pagination,
    FileUpload,
    FilePreview,
    MultipleList,
    Popup,
} = Form;
const { WaterMark, ScrollBar } = Extend;
const CPM = {
    TestForm: '../component/TestForm.vc',
    T: '../component/T.vc',
    MyCheckbox: '../component/MyCheckbox.vc',
};

class App extends Component {
    constructor(selector) {
        super(selector);
    }

    _mounted() {
        // this._bus.emit('T', {
        //     component: this,
        //     action: 'update',
        //     data: {
        //         dd: '还可以',
        //     },
        // });
    }

    load() {
        this._children.scrollBar.load({ fixed: true });
    }
}

var app = new App('#app');
app.load();
console.log(app);

const waterMark = new WaterMark();
waterMark.load({
    parent: '#app', // 水印容器，即水印添加到哪个元素中，建议与iframe并列
    show: true, // 是否显示水印
    position: 'absolute', // 水印显示方式，['fixed', 'absolute']
    getMarkInfo: () => {
        return [new Time().format('yyyy-mm-dd HH:MM:SS')];
    }, // 获取水印内容，函数返回字符串数组，代表每一行显示的内容
    interval: 1000, // 刷新频率，单位ms
});