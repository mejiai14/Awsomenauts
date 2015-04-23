game.MiniMap = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
            image: "minimap",
            width: 281,
            height: 157,
            spritewidth: "281",
            spriteheight: "157",
            getShape: function(){
                return (new me.Rect(0, 0, 281, 157)).toPolygon();
            }
        }]);
    this.floating = true;
    }
});