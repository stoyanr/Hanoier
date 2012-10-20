function Disk(num, width, height, color, dragHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.color = color;
	this.dragHandler = dragHandler;
	this.tower = null;
}

Disk.prototype.getNum = function() {
	return this.num;
}

Disk.prototype.getTower = function() {
	return this.tower;
}

Disk.prototype.setTower = function(tower) {
	this.tower = tower;
}

Disk.prototype.getElement = function() {
	return $("#disk" + this.num);
}

Disk.prototype.createElement = function() {
	return $("<canvas class='disk' id='disk" + this.num + "' width='" + this.width + "' height='" + this.height + "' />");
}

Disk.prototype.init = function() {
	this.draw();
	this.setDraggable(true);
	this.position();
}

Disk.prototype.draw = function() {
	var elem = this.getElement();
	var ctx = elem.get(0).getContext("2d");
	ctx.beginPath();
	ctx.rect(0, 0, this.width, this.height);
	ctx.fillStyle = this.color;
	ctx.closePath();
	ctx.fill();
}

Disk.prototype.setDraggable = function(enabled) {
	var elem = this.getElement();
	if (enabled)
		elem.draggable({ drag: this.dragHandler });
	else
		elem.draggable("destroy");
}

Disk.prototype.setDraggableRevert = function(enabled) {
	this.getElement().draggable("option", "revert", enabled);
}

Disk.prototype.position = function() {
	var elem = this.getElement();
	var off = this.tower.calcOffset(this.num, this.height);
	elem.position({
		at: "bottom",
		of: "#" + this.tower.getElement().attr("id"),
		offset: "0 " + off
	}); 
}
