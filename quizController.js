(function(){
    angular.module('a')
    .controller('quizController',['$scope','$location','$timeout','optionsService',function($scope,$location,$timeout,optionsService){
        $scope.wrongAnswers={
            1:false,
            2:false,
            0:false
        };
        $scope.redirect=function(){
            if((optionsService.conJlist.length===0)
                    ||(optionsService.verbList.length===0)){
                $location.path("/");
            }else{
                //START QUIZ
                console.log(optionsService.conJlist);
                $scope.quiz=false;
                $scope.english='';
                var getverb=optionsService.ranVerb();
                $scope.verb=new verb(getverb.japanese,getverb.english,getverb.verbType,optionsService.getConjugationLogic());
                $scope.verb.conjugation(optionsService.ranConJ());
                $scope.answerList=makeAnswerList($scope.verb.english);
            }  
        };
        function nextVerb(){
            $scope.wrongAnswers[0]=false;
            $scope.wrongAnswers[1]=false;
            $scope.wrongAnswers[2]=false;
            var getverb=optionsService.ranVerb();
            while(getverb.japanese===$scope.verb.japanese){
                //loop until a verb different from the current verb is choosen
                getverb=optionsService.ranVerb();
            }
            $scope.english='';
            $scope.verb.changeVerb(getverb.japanese,getverb.english,getverb.verbType);
            $scope.verb.conjugation(optionsService.ranConJ());
            $scope.answerList=makeAnswerList($scope.verb.english);
        };
        function makeAnswerList(correctEnglish){
            var correctPosition=Math.floor(Math.random()*100);
            var answerList=['','',''];
            var wrongAnswers = pickWrongAnswers();
            answerList[correctPosition%3]=correctEnglish;
            answerList[(correctPosition+1)%3]=wrongAnswers[0];
            answerList[(correctPosition+2)%3]=wrongAnswers[1];
            return answerList;
            function pickWrongAnswers(){
                var wrong1=optionsService.ranVerb().english;
                var wrong2=optionsService.ranVerb().english;
                while((correctEnglish===wrong1)
                       ||(correctEnglish===wrong2)
                            ||(wrong2===wrong1)){
                    wrong1=optionsService.ranVerb().english;
                    wrong2=optionsService.ranVerb().english;
                }
                return [wrong1,wrong2];
            }
        }
        $scope.ans=function(usrAns){
            if($scope.answerList[usrAns]===$scope.verb.english){
                $scope.english=$scope.answerList[usrAns];
                $timeout(function() {
                    nextVerb();
                }, 1000);
            }
            else{
                $scope.wrongAnswers[usrAns]=true;
            }
        };
      $scope.redirect();
    }]);

    function verb(j,e,t,l){//japanese,english,type,logic
        this.japanese=j;
        this.english=e;
        this.verbType=t;
        this.conjugationLogic=l;
        this.verbForm='';
        this.changeVerb=function(j,e,t){
            this.japanese=j;
            this.english=e;
            this.verbType=t;
            this.verbForm='';
        };
        this.conjugation=function(conjugationToDo){
            var endLength=0;
            if((this.japanese==='いく')
                ||(this.japanese==='ある')){
                endLength=2;
            }else if(this.verbType==='i'){
                endLength=2;
            }else{
                endLength=1;
            }
            this.verbForm= this.japanese.substr(0,this.japanese.length-endLength)
                    +this.conjugationLogic[this.verbType]
                        [this.japanese.substr(this.japanese.length-endLength)]
                        [conjugationToDo];
        };
    }
})();