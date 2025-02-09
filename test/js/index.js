class App extends Component {
    constructor(selector) {
        super(selector);
    }

    load() {
        this.initTableFixedCell();
    }

    initTableFixedCell() {
        this._children.tableFixedCell.load({
            fixedRow: [2, -2],
            fixedColumn: [2, -2],
            thead: `<tr>
                        <th title="序号" rowspan="2" >序号</th>
                        <th title="车辆">车辆</th>
                        <th content="车厢">车厢</th>
                        <th title="系统">系统</th>
                        <th title="位置">位置</th>
                        <th title="部件名称">部件名称</th>
                        <th title="维修类型">维修类型</th>
                        <th title="具体原因">具体原因</th>
                        <th title="旧件序列号">旧件序列号</th>
                        <th title="旧件硫化号">旧件硫化号</th>
                        <th title="旧件批次号">旧件批次号</th>
                        <th title="内片剩余厚度">内片剩余厚度</th>
                        <th title="外片剩余厚度(mm)">外片剩余厚度(mm)</th>
                        <th title="闸片偏磨">闸片偏磨</th>
                        <th title="服务时长(天)">服务时长(天)</th>
                        <th title="服务里程(km)">服务里程(km)</th>
                        <th title="新件序列号">新件序列号</th>
                        <th title="新件硫化号">新件硫化号</th>
                        <th title="新件批次号">新件批次号</th>
                        <th title="物料编码">物料编码</th>
                        <th title="新件数量">新件数量</th>
                        <th title="修时里程(km)">修时里程(km)</th>
                        <th title="施工时间">施工时间</th>
                        <th title="施工负责人">施工负责人</th>
                        <th title="工单编码" rowspan="2">工单编码</th>
                        <th content="工单类型">工单类型</th>
                    </tr><tr> 
                        <th title="车辆">车辆</th>
                        <th content="车厢">车厢</th>
                        <th title="系统">系统</th>
                        <th title="位置">位置</th>
                        <th title="部件名称">部件名称</th>
                        <th title="维修类型">维修类型</th>
                        <th title="具体原因">具体原因</th>
                        <th title="旧件序列号">旧件序列号</th>
                        <th title="旧件硫化号">旧件硫化号</th>
                        <th title="旧件批次号">旧件批次号</th>
                        <th title="内片剩余厚度">内片剩余厚度</th>
                        <th title="外片剩余厚度(mm)">外片剩余厚度(mm)</th>
                        <th title="闸片偏磨">闸片偏磨</th>
                        <th title="服务时长(天)">服务时长(天)</th>
                        <th title="服务里程(km)">服务里程(km)</th>
                        <th title="新件序列号">新件序列号</th>
                        <th title="新件硫化号">新件硫化号</th>
                        <th title="新件批次号">新件批次号</th>
                        <th title="物料编码">物料编码</th>
                        <th title="新件数量">新件数量</th>
                        <th title="修时里程(km)">修时里程(km)</th>
                        <th title="施工时间">施工时间</th>
                        <th title="施工负责人">施工负责人</th>
                        <th content="工单类型">工单类型</th>
                    </tr> `
        });
        console.log(this._children.tableFixedCell);
        let htmlStr = '';

        for (let i = 0; i < 10; i++) {
            htmlStr += `<tr  class="${[2].includes(i) ? 'hidden' : ''}">
                            <td >${i + 1}</td>
                            <td title="C210">C210</td>
                            <td title="2">2</td>
                            <td title="司控系统">司控系统</td>
                            <td title="C210-2-司控系统-档位开关">C210-2-司控系统-档位开关</td>
                            <td title="档位开关">档位开关</td>
                            <td title="产品更换">产品更换</td>
                            <td title="超次数">超次数</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="--">--</td>
                            <td title="2024-12-24 09:22:45">2024-12-24 09:22:45</td>
                            <td title="刘飞">刘飞</td>
                            <td title="02CL142412240002">
                                <span style="cursor: pointer">02CL142412240002</span>
                            </td>
                            <td title="故障修工单">故障修工单</td>
                        </tr>`;
        }
        this._children.tableFixedCell.renderTbody(htmlStr);
    }
}

var app = new App('#app');
app.load();
