/**
 * Created by Administrator on 2017/8/3.
 */
(function(data,liem){
    console.log(data+liem);
})(3,5)

function getindex(data,liem){
    var Data = data;
    var dasf = liem;
    for(var i=0;i<Data.length;i++){
        dasf+=Data[i];
    }
    return dasf;
};