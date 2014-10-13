
var mouseDownSvg = false;
var prevouisCell;

function GameLife(svgId){
   var _this = this;
   var cellTab; 
   
   	var cellTab = new Array();
   	var cellDeadTab
	var s = Snap(svgId);
	var svg = $(svgId);
	var g = s.g();
   
   	var isRunnig = false;
	var intervalFrame;
   
   svg.mousedown(function() {
        mouseDownSvg = true;
    }).mouseup(function() {
        mouseDownSvg = false;  
    });


	_this.reScale = function(_size){
		var realSize = _size;
		var scaleSize = realSize/10;
		g.animate({ transform:"scale("+scaleSize+")" },500,mina.linear,function(){
				_this.generateGrid(realSize);
			
		});
		
	}
	
	_this.isRunnig  = function () {
	    return isRunnig;
	};
   
   _this.generateGrid = function (_size) {
	
		var nbPxX = svg.width();
		var nbPxY = svg.height();
	
		var size = 10;
		var realSize = _size;
	
		var nbCellX = parseInt(nbPxX / realSize);
		var nbCellY = parseInt(nbPxY / realSize);
	
		
		//delete cell outdoor
		if(cellTab.length > nbCellX)
		{
			var dateStart = new Date();
			for (var i = nbCellX; i < cellTab.length; i++) {
				cellTab[i].forEach(function(obj){
					obj.destroyCell();
				})
			}
			cellTab.splice(nbCellX, cellTab.length);
				var date = new Date();
		console.log(date-dateStart)
		}
	
			var dateStart = new Date();
		for (var i = 0; i < nbCellX; i++) {
			if (cellTab[i] == undefined) //creation tab
			{
				cellTab[i] = new Array(nbCellY);
			}else if(cellTab[i].length > nbCellY)	//delete cell outdoor
			{
				
				for (var j = nbCellY; j < cellTab[i].length; j++) {
					cellTab[i][j].destroyCell();
				}
				cellTab[i].splice(nbCellY, cellTab[i].length);
			}	
			
			for (var j = 0; j < nbCellY; j++) {
				if(cellTab[i] && cellTab[i][j]) // si cell exist 
				{
					cellTab[i][j].reDraw(i*size,j*size,size);
				}else
				{
					cellTab[i][j] = new Cell(i*size,j*size,size,g) // create cell
				}
			}
		}
		
		var date = new Date();
		console.log(date-dateStart)
		console.log(" ")
	}
	
	
	var frameSecond = 0;
	var calculFps;
	_this.launchGame = function(fps) {
			
			var tempInterval = 1/fps*1000
	
	    isRunnig = true;
	    	console.log("start game ");
	    intervalFrame = setInterval(function() {
	        _this.generateFrame();
	        frameSecond++;
	    }, tempInterval);
	    
	    calculFps = setInterval(function() {
	         $("#printFps").text(frameSecond);
	         frameSecond = 0;
	    }, 1000);
	}
	
	_this.changeFps = function(fps)
	{
		_this.stopGame();
		_this.launchGame(fps);
	}
	_this.stopGame = function() {
	    console.log("stop game ");
	   window.clearInterval( intervalFrame);
	    window.clearInterval( calculFps);
	     isRunnig = false;
	}
	
    _this.generateFrame = function() {
      
        cellDeadTab = new Array(cellTab.length);
		
			cellTab.forEach(function(obj,i){
			cellDeadTab[i] = new Array(obj.length);
			obj.forEach(function(cell,j){
				cellDeadTab[i][j] = cell.isDead();
			});
		});
		
		
		cellTab.forEach(function(obj,i){
    		obj.forEach(function(cell,j){
    			var nbCellLiveArround=0 ;
    			
    			for (var i2 = i-1; i2 <= i+1; i2++) {
    				for (var j2 = j-1; j2 <= j+1; j2++) {
    						//	console.log("i",i,'j',j,"i2",i2,'j2',j2);
    					if(!(i==i2 && j==j2)){
    						if( i2>=0 && j2>=0 && i2<cellTab.length && j2<obj.length && !cellDeadTab[i2][j2] )
    						{
    							//console.log("i",i,'j',j,"i2",i2,'j2',j2,"nbCellLiveArround++");
    							nbCellLiveArround++;
    						}
    					}
    				}
    			}
    			
    			
    			if(!cell.isDead() && (nbCellLiveArround<=1 || nbCellLiveArround>3))
    			{
    				cell.killCellFast(); // kill
    				//console.log("i",i,'j',j,"kill");
    			}else if(cell.isDead() && nbCellLiveArround == 3){
    				cell.aliveCellFast(); //Alive
    					//console.log("i",i,'j',j,"alive");
    			}
    			
    		});
    	});
    }
    
        return this;
};