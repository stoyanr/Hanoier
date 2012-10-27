/*
 * $Id: $
 *
 * Copyright (C) 2012 Stoyan Rachev (stoyanr@gmail.com)
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 */
 
function Disk(num, width, height, fontSize, fontFace, dragHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.fontSize = fontSize;
	this.fontFace = fontFace;
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

Disk.prototype.getImageElement = function() {
	return $("#diskimg" + this.num);
}

Disk.prototype.createElement = function() {
	return $("<canvas class='disk' id='disk" + this.num + "' width='" + this.width + "' height='" + this.height + "' />");
}

Disk.prototype.createImageElement = function() {
	return $("<img id='diskimg" + this.num +"' src='img/disk" + this.num + ".gif' />");
}

Disk.prototype.init = function() {
	this.draw();
	this.setDraggable(true);
}

Disk.prototype.draw = function() {
	this.getImageElement().load(this.loadImage.bind(this));
}

Disk.prototype.loadImage = function(event) {
	var elem = this.getElement();
	var ctx = elem.get(0).getContext("2d");
	var img = $(event.target);
	ctx.drawImage(img.get(0), 0, 0, this.width, this.height);
	ctx.font = this.fontSize + "px " + this.fontFace;
	ctx.strokeText(this.num + 1, (this.width - this.fontSize) / 2 + 2, (this.height + this.fontSize) / 2);
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(0, 0, this.width, this.height);
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

Disk.prototype.position = function(zoom) {
	var elem = this.getElement();
	var top = this.tower.calcDiskTop(this.num, this.height);
	var left = this.tower.calcDiskLeft(this.width);
	elem.css({ position:"absolute", top:top, left:left });
}
