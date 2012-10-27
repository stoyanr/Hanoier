var NUM_TOWERS = 3;

var TOWER_WIDTH = 240;
var TOWER_HEIGHT = 280;
var TOWER_XWIDTH = 10;

var DISK_WIDTHS = [ 50, 80, 110, 140, 170, 200, 230 ] ;
var DISK_HEIGHT = 36;

var FONT_SIZE = 14;
var FONT_FACE = "Arial";

var VICTORY_MESSAGE = "Congratulations! The world is finally now going to end.";

$(function() {
	new Game().init();
	$("#startOver").click(function() {
		new Game().init();;
	});
});

function Game() {
	this.numDisks = $("#numDisks").val();
	this.towers = [];
	this.disks = [];
}

Game.prototype.init = function() {
	this.clean();
	this.createTowers();
	this.createDisks();
	this.initTowers();
	this.initDisks();
	this.positionDisks();
	this.updateDraggableDisks();
	$(window).resize(this.handleResize.bind(this));
}

Game.prototype.clean = function() {
	$("#game").empty();
	$("#images").empty();
}

Game.prototype.createTowers = function() {
	for (var i = 0; i < NUM_TOWERS; i++) {
		var tower = new Tower(i, TOWER_WIDTH, TOWER_HEIGHT, TOWER_XWIDTH, this.handleDrop.bind(this));
		this.towers.push(tower);
		$("#game").append(tower.createElement());
	}
	$("#images").append(tower.createImageElement());
}

Game.prototype.initTowers = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].init();
	}
}

Game.prototype.createDisks = function() {
	for (var i = 0; i < this.numDisks; i++) {
		var disk = new Disk(i, DISK_WIDTHS[i], DISK_HEIGHT, FONT_SIZE, FONT_FACE, this.handleDrag.bind(this))
		this.disks.push(disk);
		$("#game").append(disk.createElement());
		$("#images").append(disk.createImageElement());
	}
	for (var j = this.numDisks - 1; j >= 0; j--) {
		this.towers[0].addDisk(this.disks[j]);
		this.disks[j].setTower(this.towers[0]);
	}
}

Game.prototype.initDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].init();
	}
}

Game.prototype.positionDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].position(this.zoom);
	}
}

Game.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.towers.length; i++) {
		this.towers[i].updateDraggableDisks(); 
	}
}

Game.prototype.handleResize = function() {
	this.positionDisks();
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
		disk.position(this.zoom);
		this.updateDraggableDisks();
		this.checkSolved();
	}	 
}

Game.prototype.checkSolved = function() {
	if (this.towers[this.towers.length - 1].getDisks().length == this.disks.length) {
		alert(VICTORY_MESSAGE);
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
