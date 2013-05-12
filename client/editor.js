(function(){

	THREEx.KeyboardState.ALIAS['delete'] = 46

	function rad(deg){
		return deg*Math.PI/180
	}
	function deg(rad){
		return rad*180/Math.PI
	}

	// function defval(value, def){
	// 		if(typeof(a)==='undefined') return def;
	// 		else return value;
	// }
	// function Pose(x,y,rotation){
	// 	this.x = defval(x,0);
	// 	this.y = defval(y,0);
	// 	this.rotation = defval(rotation,0);
	// }

	function Wall(x,y){
		//this.length = 1
		//this.width = 1
		var geometry = new THREE.PlaneGeometry(1,1)
		var material = new THREE.MeshPhongMaterial({color:0xff0000})
		this.mesh = new THREE.Mesh(geometry,material)
		this.mesh.scale.x = x || 1
		this.mesh.scale.y = y || 1
		//this.mesh.scale.x = this.length
		//this.mesh.scale.y = this.width
		this.mesh.matrixAutoUpdate = true
		scene.add(this.mesh)

		// this.length = 1;
		// this.width = 1;
	}
	Wall.prototype = {
		toString : function(){
			//this.mesh.updateMatrixWorld();
			var n = this.mesh.geometry.vertices.length
			var vertices = this.geometry.vertices

			var s = "rect\n"

			// for(var i =0;i<n;i++){
			// 	var vertex = vertices[i].clone()
			// 	vertex.applyMatrix(this.mesh.matrixWorld)
			// 	s+=vertex.x+" "+vertex.y+"\n"
			// }
			
			// var vecx = this.length/2*Math.cos(this.pose.rotation), 
			// 	vecy = this.length/2*Math.sin(this.pose.rotation);
			// var xm1 = this.pose.x-vecx, ym1 = this.pose.y-vecy, 
			// 	xm2 = this.pose.x+vecx, ym2 = this.pose.y+vecy;
			// var wvecx = this.width/2*Math.cos(this.pose.rotation+Math.PI/2), 
			// 	wvecy = this.width/2*Math.sin(this.pose.rotation+Math.PI/2);
			// var x1 = xm1 + wvecx, y1 = ym1 + wvecy,
			// 	x2 = xm2 + wvecx, y2 = ym2 + wvecy,
			// 	x3 = xm2 - wvecx, y3 = ym2 - wvecy,
			// 	x4 = xm1 - wvecx, y4 = ym1 - wvecy;

			return s+"topColor:0x000000;sideColor:0xff0000;height:3.0";
		},
		toStringJSON : function(){
			var m = this.mesh
			var s = "{\n\t\"type\":\"rect\",\n\"center\":["+m.position.x+","+m.position.y+"],\n\t"+
				"\"rotation\":"+deg(m.rotation.z)+",\n\t\"width\":"+m.scale.y+",\n\t\"length\":"+m.scale.x+
				",\n\t\"graphics\":{\"topColor\":\"0x111111\",\"sideColor\":\"0xff0000\",\"height\":3.0} \n}"
			return s
		},
		resize : function(length,width){
			this.mesh.scale.x=length
			this.mesh.scale.y=width
			// this.length = length
			// this.width = width
		}

	}

	mapName = "test";
	entities = [];


	function showFile(){
		var s ="map_b2d "+mapName+"\n"+entities.length;
		for(i=0;i<entities.length;i++){
			s=s+entities[i].toString()+"\n"
		}
		var div = document.getElementById("file")
		if(div===undefined){
			document.createElement('textarea');
			div.id = "file"
			document.body.appendChild(div);
		}
		div.innerText = s;
		
	}

	function showJSON(){
		var s = "{\n\"objects\":[\n"
		var n = entities.length
		for(i=0;i<n;i++){
			s=s+entities[i].toStringJSON()
			if(i!=n-1) s+=","
			s+="\n"
		}
		s+="]\n}"

		$("<textarea/>").attr('id',"file").text(s).appendTo(document.body)
		// var div = document.getElementById("file")
		// if(div===undefined){
		// 	document.createElement('textarea');
		// 	div.id = "file"
		// 	document.body.appendChild(div);
		// }
		// div.innerText = s;
	}

	width = window.innerWidth
	height = window.innerHeight
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({clearColor: 0x777777, clearAlpha:0xffffff});
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	var ambientLight = new THREE.AmbientLight(0x333333);
	scene.add(ambientLight);

	keyboard = new THREEx.KeyboardState();

	//camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 100 )
	camera = new THREE.PerspectiveCamera( 45, width/height, 1, 200 );
	scene.add(camera)
	camera.position.set(0,0,10)
	camera.rotation.set(0,0,0)
	//camera.lookAt(scene.position)

	var geometry = new THREE.CircleGeometry(0.5)
	var material = new THREE.MeshNormalMaterial({color:0xff0000})
	center = new THREE.Mesh(geometry, material);
	scene.add(center)

	var curr  = 0,
		entN = 0

	function trim(value, min, max){
		if(value<min){
			value=min
		} else if(value>max){
			value=max
		}
		return value
	}

	function entC(){
		return entities[trim(curr,0,entN-1)];
	}

	function render(){
		requestAnimationFrame(render);

		curr=trim(curr,0,entN-1)
		
		var trans = 0.1
		var rot = rad(1)
		if(entN>0){
			if(keyboard.pressed("o")){
				curr = (curr-1)
				if(curr<0) curr=0
				console.log("obecny curr:"+curr)
			}
			if(keyboard.pressed("p")){
				curr = (curr+1)
				if(curr>entN-1) curr=entN-1
				console.log("obecny curr:"+curr)
			}
			if(keyboard.down("w")){
				entities[curr].mesh.position.y+=trans
			}
			if(keyboard.down("s")){
				entities[curr].mesh.position.y-=trans
			}
			if(keyboard.down("a")){
				entities[curr].mesh.position.x-=trans
			}
			if(keyboard.down("d")){
				entities[curr].mesh.position.x+=trans
			}
			
			if(keyboard.pressed("shift+q")){
				entities[curr].mesh.rotation.z-=rad(90)
			} else if(keyboard.pressed("q")){
				entities[curr].mesh.rotation.z-=rot
			}
			if(keyboard.pressed("shift+e")){
				entities[curr].mesh.rotation.z+=rad(90)
			} else if(keyboard.pressed("e")){
				entities[curr].mesh.rotation.z+=rot
			}

			if(keyboard.down("m")){
				var e = entC()
				e.resize(trim(e.mesh.scale.x+1,1,20),e.width)
			}
			if(keyboard.down("n")){
				var e = entC()
				e.resize(trim(e.mesh.scale.x-1,1,20),e.width)
			}
		}
		
		if(keyboard.pressed("space")){
			var newEnt = new Wall()
			newEnt.resize(10,1)
			curr = entN
			entities.push(newEnt)
			entN++
			console.log("tworze nowa sciane, teraz liczba elem.:"+entN)
		}
		if(keyboard.pressed("delete")){
			if(entN>0){
				scene.remove(entC().mesh)
				entities.splice(curr,1)
				entN--
				curr=trim(curr,0,entN-1)
				console.log("usuwam sciane, teraz liczba elem.:"+entN)
			}
		}

		if(keyboard.down("up")){
			camera.position.z-=1
		}
		if(keyboard.down("down")){
			camera.position.z+=1
		}

		if(keyboard.pressed("y")){
			showJSON()
		}

		var e = entC()

		if(entN>0){
		camera.position.x = e.mesh.position.x
		camera.position.y = e.mesh.position.y
	}

		// for(var i=0;i<entities.length;i++){
		// 	entities[i].update();
		// }

		// if(keyboard.pressed("q")){
		// 	camera.position.z+=0.1;
		// }
		// if(keyboard.pressed("z")){
		// 	camera.position.z-=0.1;
		// }
		// if(keyboard.pressed("up")){
		// 	camera.rotation.x+=0.1;
		// }
		// if(keyboard.pressed("down")){
		// 	camera.rotation.x-=0.1;
		// }
		// if(keyboard.pressed("left")){
		// 	camera.rotation.y+=0.1;
		// }
		// if(keyboard.pressed("right")){
		// 	camera.rotation.y-=0.1;
		// }

		//var cam = camera.get();

		//console.log(camera.pose.x+" "+camera.pose.y+" "+camera.pose.rotation);
		renderer.render(scene,camera);

	}

	render()
})();