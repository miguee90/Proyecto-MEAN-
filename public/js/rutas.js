angular.module('educa', ['ui.router','btford.socket-io'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.ejs',
				controller: 'ctrlLogin'
            })
			.state('home',{
				url:'/home',
				templateUrl:'/views/home.ejs',
				controller:'ctrlHome'
			})
			.state('info',{
				url:'/info',
				templateUrl:'/views/info.ejs',
				controller:'ctrlInfo'
			})
			.state('chat',{
				url:'/chat',
				templateUrl:'/views/chat.ejs',
				controller:'ctrlChat'
			})
		
        $urlRouterProvider.otherwise('login');
    })
	.factory('Socket',['socketFactory',function(socketFactory){
		return socketFactory();
	}])
	.factory('comunes',function($http,$q){
		var comunes={};
		 comunes.usuario={};	
		comunes.alumnos=[];
		
	
		comunes.getAll=function()
        {
			var defered=$q.defer();
			var promesa=defered.promise;
			
            $http.get('/info')
            .success(function(data){
                defered.resolve(data);
                
            })
			.error(function(err){
				defered.reject(err);
			});
			
			return promesa;
        }	
	
		comunes.logea=function(user){
				return $http.post('/login',user)
					.success(function(data){
					
						comunes.usuario=data;
						return comunes.usuario
        		})
		}
		
		comunes.addAlumno=function(alumno)
		{
			var defered=$q.defer();
			var promesa=defered.promise;
			
			$http.post('/info',alumno)
			.success(function(data){
				defered.resolve(data);
			})
			.error(function(err){
				defered.reject(err);
			});
			
			return promesa;
		}
		
		return comunes;
	})
	.controller('ctrlChat', function($scope,$state,$location,comunes){
		$scope.menuItem=0;
	
		$scope.getClass = function (path) {
		  if ($location.path() === path) {
			return 'active';
		  } else {
			return '';
		  }
		}
	})
	.controller('ctrlLogin', function($scope, $state,comunes) {
		$scope.mensajes=[];
	
		$scope.logear=function()
		{
			$scope.mensajes=[];
			comunes.logea($scope.user);
			
			if(comunes.usuario==null)
			{
				$scope.mensajes.push("Nombre de usuario invalido");
				$state.go('login');
			}
			else if(comunes.usuario.username!=$scope.user.username)
			{
				$scope.mensajes.push("Nombre de usuario invalido");
				$state.go('login');
			}
			else if(comunes.usuario.password!=$scope.user.password)
			{
				$scope.mensajes.push("Contraseña incorrecta");
				$state.go('login');
			}
			else
				$state.go('home');
		}
	})
	.controller('ctrlHome', function($scope,$state,$location,comunes){
		$scope.menuItem=0;
	
		$scope.getClass = function (path) {
		  if ($location.path() === path) {
			return 'active';
		  } else {
			return '';
		  }
		}
	})
	.controller('ctrlInfo', function($scope,$state,$location,comunes){
		$scope.menuItem=0;
		$scope.alumno={};
		$scope.boton={};
		$scope.boton.alumno=false;
		$scope.boton.profesor=false;
		$scope.boton.alta=false;
		$scope.mensaje="";
		$scope.alumnos=[];
		
		comunes.getAll()
		.then(function(data){
			$scope.alumnos=data;
		});
		
		$scope.addAlumno=function()
		{
			comunes.addAlumno($scope.alumno)
			.then(function(data){
				$scope.alumnos.push(data);
				console.log($scope.alumnos);
				$scope.boton.alumno=false;
				$scope.mensaje="Alumno agregado exitosamente"
			});
		}
		
		$scope.getClass = function (path) {
		  if ($location.path() === path) {
			return 'active';
		  } else {
			return '';
		  }
		}
		
		$scope.clickAlumno = function () {
		  	$scope.boton.alumno=true;
			$scope.boton.profesor=false;
			$scope.mensaje="";
			$scope.alumno.nombre="";
			$scope.alumno.clave="";
			$scope.alumno.grado="";
		}
		
		$scope.addProf=function()
		{
			$scope.boton.alta=true;
		}
		
		$scope.clickProfe = function () {
		  	$scope.boton.alumno=false;
			$scope.boton.profesor=true;
			$scope.mensaje="";
			$scope.alumno.nombre="";
			$scope.alumno.clave="";
			$scope.alumno.grado="";
		}
		
		$scope.cierraAlta=function()
		{
			$scope.boton.alta=false;
		}
	})