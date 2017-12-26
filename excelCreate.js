const xlsx =require('node-xlsx') 
const fs =require('fs') 

var arr1=['银行信用卡|','支付|','记账|','传统券商证券|','手机银行|','消费金融|','P2P网贷|','互联网理财|','传统保险|'];
var arr2=['休闲娱乐|','服饰鞋帽|','儿童娱乐|','大众品牌|','配饰|','餐饮|','功能包|','快餐简餐|'];
var arr3=['高（有过付费行为）|100以下（近30天付费）|','低安装（仅安装1-2款游戏）|高频（连续七天有游戏行为）|','低活跃（近30天玩过1-2款游戏）|低安装（仅安装1-2款游戏）|高频（连续七天有游戏行为）|','低安装（仅安装1-2款游戏）|低频（仅最近一天有游戏行为）|','低活跃（近30天玩过1-2款游戏）|低安装（仅安装1-2款游戏）','中安装（安装3-7款游戏）|','低安装（仅安装1-2款游戏）|','低安装（仅安装1-2款游戏）|中频（连续三天有游戏行为）|'];
var arr4=['银行信用卡|','支付|','记账|','传统券商证券|','手机银行|','消费金融|','P2P网贷|','互联网理财|','传统保险|']
var arr5=['**|','**|**|','**|**|**|','**|**|**|**|']
var arr6=['写实|',' Q版画风|','经营策略|','卡通|',' 经营|','跑酷|',' 闯关|',' 动作射击|','跑酷竞速|','宝石消除|','射击|','休闲时间|','塔防守卫|','僵尸|'
,'益智|','捕鱼|','减压|']
var headers=['支付方式','个人爱好','消费行为','投资偏好','个人归类','应用类型'] //行名

var obj1={
    arr:arr1,
    displayPencent:0.6, //这一行是否显示的概率
    displayNum:5,//一行最多展示多少项
}
var obj2={
    arr:arr2,
    displayPencent:0.1,
    displayNum:2,
}
var obj3={
    arr:arr3,
    displayPencent:0.8,
    displayNum:1,
}
var obj4={
    arr:arr4,
    displayPencent:0.3,
    displayNum:5,
}
var obj5={
    arr:arr5,
    displayPencent:0.7,
    displayNum:1,
}
var obj6={
    arr:arr6,
    displayPencent:0.4,
    displayNum:6,
}

var arrAll=[obj1,obj2,obj3,obj4,obj5,obj6] //数据源
var cols=10000;  //多少行数据
var excelName="test1"; //表名
var dataSource=[];

function getRandom(length){
    return Math.floor(length*Math.random());
}

function showRandom(pencent){
    if(pencent>Math.random()){
        return true
    }else{
        return false
    }
}

for(let i=0;i<cols;i++){
    if(i===0){
        dataSource[i]=headers;
    }else{
        dataSource[i]=colInsert();
    }
}

function colInsert(){
    var rowArr=[];
    var rowArrItem='';
    arrAll.forEach((obj,i)=>{
        var arrTempete=[];
        for(let j=0;j<obj.displayNum;j++){
            obj.displayNum=obj.displayNum>obj.arr.length?obj.arr.length:obj.displayNum;
            arrTempete.push(obj.arr[getRandom(obj.arr.length)]);
        }
        arrTempete=showRandom(obj.displayPencent)?arrTempete:null
        rowArrItem=[...new Set(arrTempete)].join('') //去除重复项
        rowArr.push(rowArrItem);
    })
    return rowArr;
}



var buffer = xlsx.build([
    {
        name:'sheet1',
        data:dataSource
    }        
]);

// console.log(dataSource);
fs.writeFileSync(excelName+'.xlsx',buffer,{'flag':'w'});

