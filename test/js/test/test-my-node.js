let appNode = document.getElementById('app');

// appNode.insertAdjacentHTML(
//     'afterend',
//     `
//     <script defer>
//         function done() {

//         }

//     </script>

// `
// );
app.node.find('.container2').before('<div>新节点</div>');
document.getElementById('app2').insertAdjacentHTML(
    'beforeend',
    `
        文字节点
        <span>节点内容</span>
        还可以
        <script>c有节点</script>
    `
);
