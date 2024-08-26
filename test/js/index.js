const CPM = {
    TestForm: '../component/TestForm.vc',
    T: '../component/T.vc',
    MyCheckbox: '../component/MyCheckbox.vc'
};

// class App extends Component {
//     constructor(selector) {
//         super(selector);
//     }

//     _mounted() {
//         this._children.t.load();
//     }

//     load() {
//         app._children.waterMark.load({
//             parent: '#app', // 水印容器，即水印添加到哪个元素中，建议与iframe并列
//             show: true, // 是否显示水印
//             position: 'absolute', // 水印显示方式，['fixed', 'absolute']
//             getMarkInfo: () => {
//                 return [new Time().format('yyyy-mm-dd HH:MM:SS')];
//             }, // 获取水印内容，函数返回字符串数组，代表每一行显示的内容
//             interval: 1000, // 刷新频率，单位ms
//         });

//         new Tip().warn('请重新输入！');
//     }

//     _listen_component(component, action, data) {
//         console.log('App', component, action, data);
//     }
// }

// var app = new App('#app');

// app.load();

new Component('#app');
