/*
 Help: https://www.phpied.com/3-ways-to-define-a-javascript-class/
*/
function Point3D(x,y,z)
{
    var _this = this;
    this.x = x;
    this.y = y;
    this.z = z;
/*
    this.add = function(pt) {
        return Point3D(_this.x+pt.x, _this.y+pt.y, _this.z+pt.z);
    }
*/
    return _this;
}

Point3D.prototype.add = function(pt) {
    return new Point3D(this.x+pt.x, this.y+pt.y, this.z+pt.z);
}

Point3D.prototype.incr = function(pt) {
    this.x += pt.x;
    this.y += pt.y;
    this.z += pt.z;
}