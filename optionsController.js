(function(){
    angular.module('a')
    .controller('optionsController',['$scope','$http','optionsService',function($scope,$http,optionsService){
            $scope.options={
                upto:true,//true to revise up to that chapter false to rivise that chapter
                chapter:3,
                conJlist:{
                    dictionary:true,
                    masu:true,
                    te:false,
                    ta:false,
                    potential:false,
                    volitional:false,
                    ba:false,
                    passive:false,
                    causative:false,
                    'causative-passive':false
                }
            };
            $scope.checkConjValid=function(){
                return  $scope.options.conJlist.dictionary ||
                        $scope.options.conJlist.masu ||
                        $scope.options.conJlist.te ||
                        $scope.options.conJlist.ta ||
                        $scope.options.conJlist.potential ||
                        $scope.options.conJlist.volitional ||
                        $scope.options.conJlist.ba ||
                        $scope.options.conJlist.passive ||
                        $scope.options.conJlist.causative ||
                        $scope.options.conJlist['causative-passive'];
            };
            $scope.chapters=[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
            $scope.getDictionary=function(){
                $http.get('dictionary.json')
                .then(function(response) {
                    $scope.dictionary = response.data;
                    $scope.updateVerbList();
                });
            };
            $scope.getConjugation=function(){
                $http.get('conjugation.json')
                .then(function(response) {
                    optionsService.setConjugations(response.data);
                    $scope.updateConJList();
                });
            };
            $scope.checkAll=function(a){
                for(var v in $scope.options.conJlist){
                    $scope.options.conJlist[v]=a;
                }
                $scope.updateConJList();
            };
            $scope.updateConJList=function(){
                var conj=[];
                for(var v in $scope.options.conJlist){
                  if($scope.options.conJlist[v]){
                        conj.push(v);
                    }
                }
                optionsService.setConJlist(conj);
            };
            $scope.updateVerbList=function(){
                var verbs=[];
                if($scope.options.upto){
                    for(var chap=3;chap<=$scope.options.chapter;chap++){
                        verbs=verbs.concat($scope.dictionary[chap]);
                    }
                }else{
                    verbs=$scope.dictionary[$scope.options.chapter];
                }
                optionsService.setVerbList(verbs);
            };
            $scope.getConjugation();
            $scope.getDictionary();
    }]);
})();