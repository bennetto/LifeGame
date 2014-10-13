function Cell(_origineX,_origineY,_size,contain){
    var _this = this;
    
    var dead = true;
    var origineX = _origineX;
    var origineY = _origineY;
    var size = _size;
    var htmlCell  ;
    var g = contain;
	var holdHover = false;
	
	//create la balise svg
	_this.createCell = function(){
	    htmlCell =  g.rect(origineX,origineY, size, size).attr({
			fill: "none",
			size: size,
			"pointer-events": "visible",
		}).click(function() {
		 if (!dead) {
			    _this.killCell();
    			}
    			else {
    			    _this.aliveCell();
    			}
		}).hover(function(evt) {
		     if(mouseDownSvg){
    		    if(!(prevouisCell) || prevouisCell != _this)
    		    {
    		        if (!dead) {
    			    _this.killCell();
        			}
        			else {
        			    _this.aliveCell();
        			}
        			holdHover = true;
        		    }
        		    prevouisCell = _this;
    		    }
		});
		
		
		if(!dead)
		{	_this.aliveCell();
		
		}
	}
	
	_this.reDraw = function(_origineX,_origineY,_size)
	{
	    origineX = _origineX;
		origineY = _origineY;
		size = _size;
		
	    htmlCell.animate({x:origineX,y:origineY,height: size,width: size}, 1000)
		
	}
	
    //detruit la balise svg
	_this.destroyCell = function(){
	    htmlCell.remove();
	}
	
	
	_this.isDead = function()
    {
        return dead;
    }
    
	_this.killCell = function()
    {
    	htmlCell.animate({rx: size / 2,	ry: size / 2	}, 200, function() {
			htmlCell.animate({height: 0,width: 0,	x: origineX + size / 2,	y: origineY + size / 2
			}, 100, function() {
				htmlCell.attr("fill", "none");
				htmlCell.attr("height", size);
				htmlCell.attr("width", size);
				htmlCell.attr("x", origineX);
				htmlCell.attr("y", origineY);
				htmlCell.attr("rx", 0);
				htmlCell.attr("ry", 0);
			});
		});
		dead = true;
    }
	    
	_this.aliveCell = function()
    {
    	htmlCell.attr("height", 0);
		htmlCell.attr("width", 0);
		htmlCell.attr("fill", "green");
		htmlCell.attr("x", origineX + size / 2);
		htmlCell.attr("y", origineY + size / 2);
		htmlCell.attr("rx", size / 2);
		htmlCell.attr("ry", size / 2);

		htmlCell.animate({height: size,	width: size,x: origineX,y: origineY}, 100, function() {
			htmlCell.animate({rx: 0,	ry: 0	}, 200, function() {});
		});
		dead = false;
    }
	    
	 _this.aliveCellFast =  function()
	    {
	  
		htmlCell.attr("fill", "green");
		

		dead = false;
	    }
	    
	_this.killCellFast =  function()
	    {

				htmlCell.attr("fill", "none");
				
		dead = true;
	    }
	    
    _this.createCell();
    
    return this;
};