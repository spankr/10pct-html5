function Point3D(x,y,z)
{
    var _this = this;
    this.x = x;
    this.y = y;
    this.z = z;

    this.add = function(pt) {
        return Point3D(this.x+pt.x, this.y+pt.y, this.z+pt.z);
    }

    return _this;
}