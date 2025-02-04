var camera, scene, renderer,orbitControls,clock,delta;
(function(win){
    win.mainTopo=function(){
        var nodeJson={'f1':[],'f2':[],'f3':[],'f4':[],'s1':[],'s2':[],'s3':[],'s4':[]};
        //创建元素画布
        container=document.getElementById('roomTopo')
        //document.body.appendChild(container)
        //创建场景
        scene=new THREE.Scene();
        //创建相机
        camera=new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1000)
        camera.position.set(100,300,100)//相机位置
        camera.lookAt(new THREE.Vector3(0,0,0))//相机观看物体的位置
        //渲染整个场景
        renderer=new THREE.WebGLRenderer({antiakuas:true,alpha: true})
        renderer.setClearColor(new THREE.Color(0xffffff),0)//整个画布的背景颜色
        renderer.setSize(window.innerWidth,window.innerHeight)
        renderer.shadowMapEnabled=true;
        container.appendChild(renderer.domElement)
    
    
        orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
        orbitControls.autoRotate = false;//将自动旋转关闭
        clock = new THREE.Clock();//用于更新轨道控制器
    
    
        //光源
        var ambientLight=new THREE.AmbientLight(0x606060)//自然光
        scene.add(ambientLight)
        // var directionalLight=new THREE.DirectionalLight(0xffffff)//平行光源
        // directionalLight.position.set(1,0.75,0.5).normalize()
        //scene.add(directionalLight)
        var spotLight=new THREE.SpotLight(0xffffff)
        spotLight.position.set(-200,160,85)
        spotLight.castShadow=true
        scene.add(spotLight)
    
    
        //axis()
    
    
        //plane()
        for(var i=0;i<roomDev.result.nodeindex.first.length;i++){
            cube(i*20,5)
            nodeJson[roomDev.result.nodeindex.first[i]['nodecode']]=[i*20,5]
        }
        //plane2()
        for(var i=0;i<roomDev.result.nodeindex.sceond.length;i++){
            cube(i*20,55)
            nodeJson[roomDev.result.nodeindex.sceond[i]['nodecode']]=[i*20,55]
        }
        for(var i=0;i<roomDev.result.linearray.length;i++){
            var l1=nodeJson[roomDev.result.linearray[i]['linestart']]
            var l2=nodeJson[roomDev.result.linearray[i]['lineend']]
            line(l1,l2)
        }
        
    }
    
    function axis(){
        var axesHelper = new THREE.AxesHelper( 150 );
        scene.add( axesHelper );
    }
    win.renderTopo=function(){
        delta = clock.getDelta();
        orbitControls.update(delta);
        requestAnimationFrame(render);
        renderer.render(scene,camera)
    }
    //第一层
    function plane(){
        var planeGeo=new THREE.PlaneGeometry(100,100,10,10)
        var planeMat=new THREE.MeshLambertMaterial({color:0x666666,wireframe:false})
        var planeMesh=new THREE.Mesh(planeGeo,planeMat)
        planeMesh.position.set(0,0,20)
        planeMesh.receiveShadow=true
        planeMesh.rotation.x=-0.5*Math.PI
        scene.add(planeMesh)
    }
    //第二层
    function plane2(){
        var planeGeo=new THREE.PlaneGeometry(100,100,10,10)
        var planeMat=new THREE.MeshLambertMaterial({color:0x666666,wireframe:false})
        var planeMesh=new THREE.Mesh(planeGeo,planeMat)
        planeMesh.position.set(0,50,20)
        planeMesh.receiveShadow=true
        planeMesh.rotation.x=-0.5*Math.PI
        scene.add(planeMesh)
    }
    
    function cube(x,y){
        let geometry=new THREE.BoxGeometry(10,10,10,5,5,5)
        let map=new THREE.TextureLoader().load('/InternetofThings/assets/img/dev.png')
        let material=new THREE.MeshPhongMaterial({map:map})
        let box=new THREE.Mesh(geometry,material)
        box.position.set(x,y,0)
        scene.add(box)
    }
    function sphere(){
        var sphereGeo=new THREE.SphereGeometry(16,40,40)
        var sphereMat=new THREE.MeshLambertMaterial({color:0x0000ff,wireframe:false})
        var sphereMesh=new THREE.Mesh(sphereGeo,sphereMat)
        sphereMesh.position.set(-25,10,0)
        sphereMesh.castShadow=true
        sphereMesh.receiveShadow=true
        scene.add(sphereMesh)
    }
    function line(l1,l2){
        const curve = new THREE.CatmullRomCurve3(
        [
            //起点
            new THREE.Vector3(l1[0],l1[1], 0),
    
            //终点
            new THREE.Vector3(l2[0],l2[1], 0),
        ],
        true,
        );
        // 绘制曲线
        const geometry = new THREE.Geometry();
        // 初始化曲线的顶点
        geometry.vertices = curve.getSpacedPoints(50);
        const material = new THREE.LineBasicMaterial({ color:0x0000ff });
        const curveObject = new THREE.Line(geometry, material);
        scene.add(curveObject)
    }
})(window)

