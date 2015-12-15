/**
 * Dependent on jquery jquery.cookie layer.js 
 *
 */
var goodsObj = function() {
    this.goods_id = 0;
    this.goods_name = "";
    this.quantity = 1;
    this.price    = 0;
    this.default_image    = '';
    this.sub_total = 0;
};

var Cart = function() {
    this.items = [];
    this.keyName = 'chepeng_cart';

    this.setting = {path: '/', 'expired': 30};
    this.load();
};

Cart.prototype.load = function() {
    var _str = $.cookie(this.keyName);
    if (!_str)
    {
        return [];
    }
    this.items = JSON.parse(_str);
};

Cart.prototype.add = function(obj) {
    var pos = this.findGoodsPos(obj.goods_id);
    if (pos === false)
    {
        this.items.unshift(obj);
        this.setNew();
        layer.alert('商品已添加到购物车')
    }
    else
    {
        layer.alert('商品已添加');
    }
};

Cart.prototype.del = function(goodsId) {
    var pos = this.findGoodsPos(goodsId);
    if (pos) {
        this.items.splice(pos,1);
        this.setNew();
    }
};

Cart.prototype.modify = function(Obj) {
    var pos = this.findGoodsPos(Obj.goods_id);
    if (pos !== false) {
        var sel = this.items[pos];
        if (Obj.quantity) {
            sel.quantity  = Obj.quantity;
            sel.sub_total = sel.quantity * sel.price;
        }
        this.setNew();
    }
};

Cart.prototype.setNew = function () {
    var _str = JSON.stringify(this.items);
    $.cookie(this.keyName, _str, this.setting);
};

Cart.prototype.findGoodsPos = function(prodId){
    for(i in this.items) {
        if (!this.items.hasOwnProperty(i)) {
            continue;
        }
        if (this.items[i]['goods_id'] == prodId) {
            return i;
        }
    }
    return false;
};