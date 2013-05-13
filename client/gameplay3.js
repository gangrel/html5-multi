$(document).ready(function(){


	var b2 = {
		b2Vec2 : Box2D.Common.Math.b2Vec2,
		b2BodyDef : Box2D.Dynamics.b2BodyDef,
		b2Body : Box2D.Dynamics.b2Body,
	    b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
	    b2Fixture : Box2D.Dynamics.b2Fixture,
	    b2World : Box2D.Dynamics.b2World,
	    b2MassData : Box2D.Collision.Shapes.b2MassData,
	    b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
	    b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
	    b2DebugDraw : Box2D.Dynamics.b2DebugDraw
	}
   
	function rad(deg){
		return deg*Math.PI/180
	}
	function deg(rad){
		return rad*180/Math.PI
	}

	function GameEffect(maxTime, graphics){
		this.time = maxTime
		this.graphics = graphics
		scene.add(this.graphics)
	}

	GameEffect.prototype.update = function(delta){
		this.time-=delta
		if(this.time<0){
			scene.remove(this.graphics)
			return false
		}
		return true
	}

	function initGraphics(){
		rendererOpt = {clearColor:0x0000ff, clearAlpha:1.0}
		if(Detector.webgl){
			rendererOpt['antialias']=true
			renderer = new THREE.WebGLRenderer(rendererOpt)
			renderer.shadowMapEnabled = true
			renderer.shadowMapSoft = true
			console.log("abc")
		} else {
			renderer = new THREE.CanvasRenderer(rendererOpt)
		}

		canvasWidth = window.innerWidth
		canvasHeight = window.innerHeight

		renderer.setSize(canvasWidth, canvasHeight)

		$(renderer.domElement).attr("id","cvs")
		document.body.appendChild(renderer.domElement)

		scene = new THREE.Scene()

		camera = new THREE.PerspectiveCamera(45,canvasWidth/canvasHeight,1,100)
		camera.position.set(0,0,10)
		camera.lookAt(scene.position)
		scene.add(camera)

		projector = new THREE.Projector();
	}

	function initPhysics(){
		world = new b2.b2World(new b2.b2Vec2(0,0),true)
		
	}

	function initWorld(){
		var cubeGeo = new THREE.CubeGeometry(0.5,0.5,1.8)
		cubeGeo.applyMatrix(new THREE.Matrix4().makeRotationZ(rad(45)))
		cubeGeo.computeFaceNormals()
		cubeGeo.computeVertexNormals()
		cubeGeo.computeBoundingSphere()
		var cubeMat = new THREE.MeshPhongMaterial({vertexColors:THREE.FaceColors,color:0xffffff,ambient:0x111111})
		cube = new THREE.Mesh(cubeGeo,cubeMat)
		cube.castShadow = true
		cube.receiveShadow = true
		cube.position.set(0,0,0)
		cube.rotation.set(0,0,0)
		cube.dynamic = true
		for(var i =0;i<cubeGeo.faces.length;i++){
			cubeGeo.faces[i].color.setRGB(Math.random(),Math.random(),Math.random())
		}
		scene.add(cube)


		var geometry = new THREE.SphereGeometry(0.1)
		geometry.computeBoundingSphere()
		var material = new THREE.MeshBasicMaterial({color:0xffffff,ambient:0x111111})
		crosshair = new THREE.Mesh(geometry,material)
		crosshair.castShadow = false
		crosshair.receiveShadow = false
		crosshair.position.set(0,0,0)
		crosshair.rotation.set(0,0,0)
		crosshair.dynamic = true
		scene.add(crosshair)
		

		//planeGeo = new THREE.CubeGeometry(100,100,0.5,200,200,1)
		var planeGeo = new THREE.PlaneGeometry(100,100)
		planeGeo.computeFaceNormals()
		planeGeo.computeVertexNormals()
		planeGeo.computeBoundingSphere()
		var planeMat = new THREE.MeshPhongMaterial({color:0x00ff00,ambient:0x001100})
		plane = new THREE.Mesh(planeGeo,planeMat)
		plane.position.set(0,0,0)
		plane.rotation.set(0,0,0)
		plane.receiveShadow = true
		scene.add(plane)

		explosionGraphics = {geometry:new THREE.SphereGeometry(0.2),material:new THREE.MeshBasicMaterial({color:0xff0000,ambient:0x111111})}

		light = new THREE.SpotLight({color:0xffffff})
		light.castShadow = true
		light.shadowDarkness = 0.5
		light.position.set(10,0,1)
		//light.shadowCameraVisible = true
		light.shadowMapWidth = 2048
		light.shadowMapHeight = 2048
		light.shadowCameraNear = 1
		light.shadowCameraFar = 50
		light.target=cube
		scene.add(light)

		ambLight = new THREE.AmbientLight({color:0x050505})
		scene.add(ambLight)
	}

	function loadMap(){
		$.getJSON("map.json", function(map){
			console.log("json")
			var objects = map.objects
			var n = objects.length
			for(var i =0;i<n;i++){
				var mesh

				var obj = objects[i]
				var style = obj.graphics
				var height = style.height
				var vertices = obj.vertices
				if(obj.type == "poly"){
					// var geo = new THREE.Geometry()
					// for(var j = 0; j<vertices.length;j++){
					// 	geo.vertices.push(new THREE.Vector3(vertices[j][0],vertices[j][1],0))
					// 	geo.vertices.push(new THREE.Vector3(vertices[j][0],vertices[j][1],height))
					// }
					// for(var j =0;j<4;j++)
					// {

					// }
				} else if(obj.type == "rect"){
					var geo = new THREE.CubeGeometry(obj.length,obj.width,height)
					geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,height/2.0))

					var s = style.sideColor
					var t = style.topColor
					for(var j =0;j<4;j++){
						geo.faces[j].color.setHex(s)
						//geo.faces[j].color.setRGB(...s)
					}
					geo.faces[4].color.setHex(t)
					geo.faces[5].color.setHex(t)

					var material = new THREE.MeshLambertMaterial({vertexColors:THREE.FaceColors, ambient:0x111111})
					mesh = new THREE.Mesh(geo,material)
					mesh.castShadow = false
					mesh.receiveShadow = true
					mesh.position.set(obj.center[0],obj.center[1],0)
					mesh.rotation.z = rad(obj.rotation)
				}

				scene.add(mesh)
			}

		})
	}

	function initInput(){
		actionInp = {
			moveForward : "w",
			moveBackward : "s",
			strafeLeft : "a",
			strafeRight : "d",
			fire : "leftM",
			contFire : "leftM",
			secondary : "rightM",
			contSecondary : "rightM",
			nextWeapon : "scrollUp",
			previousWeapon : "scrollDown"
		}

		keyboard = new THREEx.KeyboardState()
		mouse = new THREEx.MouseState()
	}

	function getActions(){
		var actions = {};
		if(keyboard.down(actionInp.moveForward)){
			actions.moveForward = true
		}
		if(keyboard.down(actionInp.moveBackward)){
			actions.moveBackward = true
		}
		if(keyboard.down(actionInp.strafeLeft)){
			actions.strafeLeft = true
		}
		if(keyboard.down(actionInp.strafeRight)){
			actions.strafeRight = true
		}

		var fire = mouse.clicked(actionInp.fire)
		if(fire){
			actions.fire = fire
		}
		if(mouse.down(actionInp.contFire)){
			actions.contFire =true
		}

		var secondary = mouse.clicked(actionInp.secondary)
		if(secondary){
			actions.secondary = secondary
		}
		if(mouse.down(actionInp.contSecondary))
		{
			actions.contSecondary = true
		}

		var delta = mouse.getScrollDelta()
		if(delta>0){
			actions.nextWeapon = delta
		} else if(delta<0){
			actions.previousWeapon = delta
		}

		//====================
		var target = mouse.getTarget()
		var vector = new THREE.Vector3(
	    ( target.targetX / canvasWidth ) * 2 - 1,
    	- ( target.targetY / canvasHeight ) * 2 + 1,
    	0.5 );
		projector.unprojectVector( vector, camera );

		var dir = vector.sub( camera.position ).normalize();

		var ray = new THREE.Raycaster( camera.position, dir );

		var distance = - camera.position.z / dir.z;

		var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
		actions.targetX = pos.x
		actions.targetY = pos.y
		//=====================

		return actions
	}
	
	initGraphics()
	initInput()

	loadMap()
	initWorld()
	counter = 0
	updateCame = false
	slowSpeed = 0.1
	fastSpeed = 0.3

	effects = []
	objects = {}//tablica asocjacyjna, bo sortowanie po id
	lastTime = new Date().getTime()

	updates = []

	function updateWorld(){
		//tutaj miejsce na wprowadzenie aktualizacji stanu
		updateCame = false
		updates.length = 0
	}

	function sendUpdate(actions){
		// $.ajax({
	 //        type: "POST",
	 //        contentType: "application/json",
	 //        dataType: "json",
	 //        url: contextPath + "",
	 //        data : JSON.stringify(glEntries),
	 //        success: function(data) {
	 //            alert("Success!!!");
	 //        },
	 //        error: function (jqXHR, textStatus, errorThrown) {
	 //            alert(jqXHR + " : " + textStatus + " : " + errorThrown);
	 //        }
  //   	});
	}

	function render(time){
		requestAnimationFrame(render)

		deltaTime = (time - lastTime)/1000
		lastTime = time

		if(updateCame){
			updateWorld()
		}
		counter+=deltaTime*rad(30);

		for(i in effects){
			if(!effects[i].update(deltaTime)){
				effects.splice(i,1)
			}
		}

		light.position.set(cube.position.x+Math.cos(counter)*(Math.sin(counter)/2+1)*4,
			cube.position.y+Math.sin(counter)*(Math.sin(counter)/2+1)*4+1,1)

		actions = getActions()
		
		sendUpdate(actions)

		if(actions.fire)
			console.log(actions)

		crosshair.position.x= actions.targetX
		crosshair.position.y = actions.targetY

		cube.rotation.z = Math.atan2(actions.targetY - cube.position.y, actions.targetX - cube.position.x)
		
		var rot = cube.rotation.z
		if(actions.strafeRight){
			var rightDir = rot - Math.PI/2
			
			cube.position.x+=Math.cos(rightDir)*slowSpeed
			cube.position.y+=Math.sin(rightDir)*slowSpeed
		}
		if(actions.strafeLeft){
			var leftDir = rot + Math.PI/2
			cube.position.x+=Math.cos(leftDir)*slowSpeed
			cube.position.y+=Math.sin(leftDir)*slowSpeed
		}
		if(actions.moveForward){
			cube.position.x+=Math.cos(rot)*fastSpeed
			cube.position.y+=Math.sin(rot)*fastSpeed
		}
		if(actions.moveBackward){
			cube.position.x-=Math.cos(rot)*slowSpeed
			cube.position.y-=Math.sin(rot)*slowSpeed
		}

		if(actions.contFire){
			var expl = explosionGraphics
			var mesh = new THREE.Mesh(expl.geometry,expl.material)
			mesh.position.copy(crosshair.position)
			effects.push(new GameEffect(10,mesh))
		}

		camera.position.x = cube.position.x
		camera.position.y = cube.position.y
		
		renderer.render(scene,camera)
	}

	render(0)
	
})