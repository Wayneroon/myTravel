'use strict'


// define([ 'app' ],function() {
//
//     console.log("home init");
//
//     console.log();
//     // console.log(firebase);
//
//     return function($scope,$http ) {

var homeCtrl = angular.module('homeCtrl', []);


homeCtrl.controller('homeCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    // console.log(ngMaterial);

    console.log(firebase);

    $scope.writePost = function (ev) {
        $mdDialog.show({
            controller: HomeController,
            templateUrl: 'partials/dialog/post.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
        // .then(function (answer) {
        //     $scope.status = 'You said the information was "' + answer + '".';
        // }, function () {
        //     $scope.status = 'You cancelled the dialog.';
        // });

        function HomeController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.post = function () {
                console.log('data upload : ' + $scope);

                // var ref = new Firebase('https://mytravel-12b37.firebaseio.com/');

                //firebase 서버와 동기화를 합니다.
                // var sync = $firebase(ref);

                //서버에 저장된 데이터를 동기적으로 담아줄 배열선언. 세부내용은 Firebase API참조!
                // $scope.chats = sync.$asArray();

                // A post entry.
                $scope.postData = {
                    username: $rootScope.user.displayName,
                    uid: $rootScope.user.uid,
                    body: $scope.post.content,
                    title: $scope.post.title,
                    backgroundColor: '#ffffff',
                    fontColor: '#000000',
                    location: null,
                    starCount: 0,
                    public: false,
                    timestamp: Date.now(),
                    // stars
                    // comments
                    // resources
                    // tag
                };

                $scope.uploadResource = {
                    filename: null,
                    format: null,
                    location: null,
                    width: 0,
                    height: 0,
                };
                // 이미지 모바일 너비를 기준으로 비율 계산 필요.

                // 내용에서 @로 시작해서 ' '로 끝나는 단어를 array로 담는다.
                // $scope.tagnames = $scope.post.content.split('#');


                // [END post_stars_transaction]


                var database = firebase.database();
                console.log($scope.postData);
                // Get a key for a new Post.
                console.log(database);
                var newPostKey = database.ref('posts').push().key;
                // var newPostKey = firebase.database().ref().child('posts').push().key;

                firebase.database().ref('/posts/' + newPostKey).set($scope.postData);

                // // Write the new post's data simultaneously in the posts list and the user's post list.
                // var updates = {};
                // updates['/posts/' + newPostKey] = postData;
                // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                //
                // firebase.database().ref().update(updates);

                $mdDialog.hide();
            };


            $scope.post_resource = function (ev) {
                $scope.goFont = false;
                $mdDialog.show({
                    skipHide: true,
                    controller: PostResourceController,
                    templateUrl: 'partials/dialog/post_resource.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });
            };
            $scope.post_location = function (ev) {
                $scope.goFont = false;
                $mdDialog.show({
                    skipHide: true,
                    controller: PostLocationController,
                    templateUrl: 'partials/dialog/post_location.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });
            };
            $scope.post_font = function () {
                console.log("font");
                $scope.goFont = true;

                $scope.data = {
                    selectedIndex: 0,
                    bottom: true
                };

                $scope.next = function () {
                    $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
                };
                $scope.previous = function () {
                    $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
                };
                console.log($scope.data.selectedIndex);

                $scope.post = function () {

                    $mdDialog.hide();
                };
            };


        }

        function PostResourceController($scope, $mdDialog) {
            if ($scope.isPC) {
                // pc일때 파일 업로드
            } else {

            }

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.ok = function (answer) {

                $mdDialog.hide(answer);
            };
        }

        function PostLocationController($scope, $mdDialog) {

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.ok = function () {

                $mdDialog.hide(answer);
            };
        }

    }


    $scope.logout = function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            location.replace("#login");
        }, function (error) {
            // An error happened.
        });
    }
}]);

// }


// });