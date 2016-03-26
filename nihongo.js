(function(){
    angular.module('a',["ngRoute"])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/quiz', {
            templateUrl: 'mainQuiz.html',
            controller: 'quizController'
        })
        .otherwise({
            templateUrl: 'optionsMenu.html',
            controller: 'optionsController'
	});
    })
    .service('optionsService', function(){
        this.verbList=[];
        this.conJlist=[];
        this.conjugations={};
        this.setVerbList=function(vl){
          this.verbList=vl;
        };
        this.setConJlist=function(cl){
          this.conJlist=cl;  
        };
        this.setConjugations=function(conJ){
            this.conjugations=conJ;
        };
        this.getConjugationLogic=function(){
            return this.conjugations;
        };
        this.getVerb=function(p){
            return this.verbList[p];
        };
        this.getConJ=function(p){
            return this.conJlist[p];
        };
        this.ranVerb=function(){
            return this.verbList[Math.floor(Math.random()*this.verbList.length)];
        };
        this.ranConJ=function(){
            return this.conJlist[Math.floor(Math.random()*this.conJlist.length)];
        };
    });
})();