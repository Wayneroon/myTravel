'use strict'


define(['app'], function () {

    // [START buttoncallback]
    function toggleEmailSignIn() {
        console.log("toggleEmailSignIn");
        if (!firebase.auth().currentUser) {

            // [START email]
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
                alert('이메일 주소를 적어주세요.');
                return;
            }
            if (password.length < 4) {
                alert('패스워드를 적어주세요.');
                return;
            }
            // -> angular로 바꾸자

            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });


        } else {
            location.replace("#home");

            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
    }
// [END buttoncallback]

// [START buttoncallback]
    function toggleFacebookSignIn() {
        if (!firebase.auth().currentUser) {

            // [START createprovider]
            var provider = new firebase.auth.FacebookAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('user_birthday');

            // [END addscopes]
            // [START facebook signin]
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                location.replace("#home");

            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                    // If you are using multiple auth providers on your app you should handle linking
                    // the user's accounts here.
                } else {
                    console.error(error);
                }
                // [END_EXCLUDE]
            });
            // [END signin]
        } else {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
    }
// [END buttoncallback]

// [START buttoncallback]
    function toggleGoogleSignIn() {
        if (!firebase.auth().currentUser) {

            // [START createprovider]
            var provider = new firebase.auth.GoogleAuthProvider();

            // [END createprovider]
            // [START addscopes]
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // [END addscopes]
            // [START facebook signin]

            // [START google signin]
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                // [START_EXCLUDE]
                // $('quickstart-oauthtoken').textContent = token;
                // [END_EXCLUDE]

                // writeUserData(user, password);

                location.replace("#home");
            }).catch(function (error) {
// Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
// The email of the user's account used.
                var email = error.email;
// The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
// [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
// If you are using multiple auth providers on your app you should handle linking
// the user's accounts here.
                } else {
                    console.error(error);
                }
// [END_EXCLUDE]
            });
// [END signin]


        } else {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
    }

    function toggleKakaoSignIn() {
        console.log("toggleKakaoSignIn");


        // 카카오 로그인 버튼을 생성합니다.
        Kakao.Auth.createLoginButton({
            container: '#kakao-sign-in',
            success: function (authObj) {
                alert(JSON.stringify(authObj));
            },
            fail: function (err) {
                alert(JSON.stringify(err));
            }
        });

    }

// [END buttoncallback]

    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END createwithemail]
        writeUserData(email, password);
    }

    function writeUserData(name, email) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayName = name.split("@")[0];
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;

                console.log("uid : " + uid);
                firebase.database().ref('users/' + uid).set({
                    username: displayName,
                    email: email
                });

                location.replace("#main");

            }
        });
    }

    function sendPasswordReset() {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            // Password Reset Email Sent!
            // [START_EXCLUDE]
            alert('Password를 초기화하여 Email로 전송하였습니다!');

            // var user = firebase.auth().currentUser;
            // var newPassword = getASecureRandomPassword();
            //
            // user.updatePassword(newPassword).then(function() {
            //     // Update successful.
            // }, function(error) {
            //     // An error happened.
            // });

            // [END_EXCLUDE]
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
    }


// Listening for auth state changes.
// [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            location.replace("#home");
        } else {
            // User is signed out.
            document.getElementById('email-sign-in').addEventListener('click', toggleEmailSignIn, false);
            document.getElementById('email-sign-up').addEventListener('click', handleSignUp, false);
            document.getElementById('facebook-sign-in').addEventListener('click', toggleFacebookSignIn, false);
            document.getElementById('google-sign-in').addEventListener('click', toggleGoogleSignIn, false);
            document.getElementById('kakao-sign-in').addEventListener('click', toggleKakaoSignIn, false);
            document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
        }
    });

});
