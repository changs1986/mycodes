//去掉空格
String.prototype.Trim = function(){   
	return this.replace(/(^\s*)|(\s*$)/g, "");   
}

//删掉指定位置的数组元素
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}

//每个input输入达到4个字后自动跳到下一个input    
var curIdx = 0;
$('#code-input input[type=text]').keyup(function(){
    var val = $(this).val();
    if (val.length == 4)
    {
        if (curIdx < 3) {
            curIdx++;
            $('#code-input input[type=text]').eq(curIdx).focus();
        } else {
            curIdx = 0;
            $(this).blur();
        }
    }
});