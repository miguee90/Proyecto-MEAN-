angular.module('educa', ['ui.router'])
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
		
        $urlRouterProvider.otherwise('login');
    })
	.factory('comunes',function($http){
		var comunes={};
		 comunes.usuario={};	
	
		comunes.logea=function(user){
				return $http.post('/login',user)
					.success(function(data){
					
						comunes.usuario=data;
						return comunes.usuario
        		})
		}
		
		return comunes;
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
		$scope.boton={};
		$scope.boton.alumno=false;
		$scope.boton.profesor=false;
	
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
		}
		
		$scope.clickProfe = function () {
		  	$scope.boton.alumno=false;
			$scope.boton.profesor=true;
		}
	})