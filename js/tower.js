function Tower(num, width, height, offset, xwidth, color, dropHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.offset = offset;
	this.xwidth = xwidth;
	this.color = color;
	this.dropHandler = dropHandler;
	this.disks = [];
}

Tower.prototype.getNum = function() {
	return this.num;
}

Tower.prototype.getDisks = function() {
	return this.disks;
}

Tower.prototype.getElement = function() {
	return $("#tower" + this.num);
}

Tower.prototype.createElement = function() {
	return $("<canvas class='tower' id='tower" + this.num + "' width='" + this.width + "' height='" + this.height + "' />");
}

Tower.prototype.init = function() {
	this.draw();
	this.setDroppable();
}

Tower.prototype.draw = function() {
	var elem = this.getElement();
	elem.offset({ top : this.offset, left : this.offset + this.num * (this.width + 2) });
	var ctx = elem.get(0).getContext("2d");  
	ctx.fillStyle = this.color;
	ctx.fillRect((this.width - this.xwidth) / 2, 0, this.xwidth, this.height - this.xwidth);
	ctx.fillRect(0, this.height - this.xwidth, this.width, this.xwidth);
}

Tower.prototype.setDroppable = function() {
	this.getElement().droppable({ drop: this.dropHandler });
}

Tower.prototype.addDisk = function(disk) {
	this.disks.push(disk);
}

Tower.prototype.removeDisk = function(disk) {
	this.disks.splice(this.disks.indexOf(disk), 1);
}

Tower.prototype.canPlaceDisk = function(disk) {
	var result = true;
	if (this.disks.length > 0) {
		var topDisk = this.disks[this.disks.length - 1];
		if (topDisk.getNum() < disk.getNum()) {
			result = false;
		}
	}
	return result;
}

Tower.prototype.moveDisk = function(disk) {
	var oldTower = disk.getTower();
	oldTower.removeDisk(disk);
	this.addDisk(disk);
	disk.setTower(this);
}

Tower.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].setDraggable(i == this.disks.length - 1);
	}
}

Tower.prototype.calcOffset = function(num, height) {
	var elem = this.getElement();
	var result = -this.xwidth;
	for (var i = 0; i < this.disks.length; i++) {
		var numx = this.disks[i].getNum();
		result -= (num != numx)? height : height / 2;
		if (num == numx) {
			break;
		}
	}
	return result;
}