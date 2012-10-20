var NUM_TOWERS = 3;
var NUM_DISKS = 2;

var TOWER_WIDTH = 300;
var TOWER_HEIGHT = 200;
var TOWER_OFFSET = 100;
var TOWER_XWIDTH = 6;
var TOWER_COLOR = "black";

var DISK_WIDTHS = [ 50, 100, 150, 200, 250, 300 ] ;
var DISK_HEIGHT = 30;
var DISK_COLORS = [ "black", "red", "blue", "green", "yellow", "white" ];


$(function() {
	new Game().init();
});

function Game() {
	this.towers = [];
	this.disks = [];
}

Game.prototype.init = function() {
	this.createTowers();
	this.createDisks();
	this.initTowers();
	this.initDisks();
	this.updateDraggableDisks();
	$(window).resize(this.handleResize.bind(this));
}

Game.prototype.createTowers = function() {
	for (var i = 0; i < NUM_TOWERS; i++) {
		var tower = new Tower(i, TOWER_WIDTH, TOWER_HEIGHT, TOWER_OFFSET, TOWER_XWIDTH, TOWER_COLOR, this.handleDrop.bind(this));
		this.towers.push(tower);
		$("body").append(tower.createElement());
	}
}

Game.prototype.initTowers = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].init();
	}
}

Game.prototype.createDisks = function() {
	for (var i = 0; i < NUM_DISKS; i++) {
		var disk = new Disk(i, DISK_WIDTHS[i], DISK_HEIGHT, DISK_COLORS[i], this.handleDrag.bind(this))
		this.disks.push(disk);
		$("body").append(disk.createElement());
	}
	for (var j = NUM_DISKS - 1; j >= 0; j--) {
		this.towers[0].addDisk(this.disks[j]);
		this.disks[j].setTower(this.towers[0]);
	}
}

Game.prototype.initDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].init();
	}
}

Game.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].updateDraggableDisks(); 
	}
}

Game.prototype.handleResize = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].position();
	}
}

Game.prototype.handleDrag = function(event, ui) {
	this.getDisk($(event.target)).setDraggableRevert(true);
}

Game.prototype.handleDrop = function(event, ui) {
	var tower = this.getTower($(event.target));
	var disk = this.getDisk(ui.draggable);
	if (tower.canPlaceDisk(disk)) {
		disk.setDraggableRevert(false);
		tower.moveDisk(disk);
		disk.position();
		this.updateDraggableDisks();
		this.checkSolved();
	}	 
}

Game.prototype.checkSolved = function() {
	if (this.towers[this.towers.length - 1].getDisks().length == this.disks.length) {
		alert("Congratulations! The world is finally now going to end.");
	}
}

Game.prototype.getTower = function(elem) {
	return this.towers[getNum(elem)];
}

Game.prototype.getDisk = function(elem) {
	return this.disks[getNum(elem)];
}

function getNum(o) {
	return getLast(o.attr("id"));
}

function getLast(s) {
	return s.charAt(s.length - 1);
}
