let buttonSubmit = document.getElementById('submit'),
    authorizationWindow = document.getElementById('authorizationWindow'),
    selectCountry = document.getElementById('country'),
    userRole = document.getElementById('role'),
    userBirthdayDate = document.getElementById('userBirthday'),
    userLogin = document.getElementById('login'),
    userPassword = document.getElementById('password'),
    userName = document.getElementById('userName'),
    userEmail = document.getElementById('userEmail'),
    userBirthday = document.getElementById('userBirthday'),
    formUserInfo = document.getElementById('userLoginForm'),
    userCountry = 'Belarus',
    userCity = 'Minsk',
    userSchool = 'Lyceum#1';

//window.location.assign("http://localhost:63342/test");
sendRequest('POST', 'getCountries', null)
    .then(data => {
        console.log(formUserInfo);
        addDOMCountries(data, formUserInfo);
    });


buttonSubmit.addEventListener('click', function () {
    let user = {
        userLogin: userLogin.value,
        userPassword: userPassword.value,
        userName: userName.value,
        userEmail: userEmail.value,
        userBirthday: userBirthday.value,
        userRole: userRole.value,
        userCountry,
        userCity,
        userSchool
    };
    sendRequest('POST', 'signUp', JSON.stringify(user))
        .then(data => {
            let link = document.querySelector('link[rel=import]');
            let content = link.import.querySelector('#mainApp');
            document.body.appendChild(content.cloneNode(true));
            myCallback()
            sessionStorage.setItem('role', data[data.length - 1].role);
            sessionStorage.setItem('userId', data[data.length - 1].id);
            console.log(window.sessionStorage);
            document.body.removeChild(authorizationWindow);
            if(sessionStorage.getItem('role') === 'Admin'){
                let buttonAdminRoom = document.createElement('button');
                buttonAdminRoom.id = 'adminRoom';
                buttonAdminRoom.type = 'button';
                document.body.appendChild(buttonAdminRoom);
                buttonAdminRoom.addEventListener('click', function () {
                    let link = document.querySelector('link[data-value=importAdminRoom]');
                    let content = link.import.querySelector('#adminRoom');
                    document.body.appendChild(content.cloneNode(true));
                    let mainApp = document.getElementById('mainApp');
                    let removeElement = document.getElementById('addNewUser');
                    document.body.removeChild(mainApp);
                })
            }
        });
});

function changeSelect(parent, content, id, valueKey, contentKey) {
    let test = document.getElementById(id);
    if (!test) {
        let select = document.createElement('select');
        select.id = id;
        for (let i = 0; i < content.length; i++) {
            let option = document.createElement('option');

            for (let key in content[i]) {
                if (key === valueKey) {
                    option.dataset.value = content[i][key];
                    //option.setAttribute('data-value', content[i][key]);
                } else if (key === contentKey) {
                    option.value = content[i][key];
                    option.textContent = content[i][key];
                } else console.log(key, typeof key);
            }

            select.appendChild(option);
        }
        parent.appendChild(select);

    } else if (test) {
        parent.removeChild(test);
        let select = document.createElement('select');
        select.id = id;

        for (let i = 0; i < content.length; i++) {
            let option = document.createElement('option');

            for (let key in content[i]) {
                if (key === valueKey) {
                    option.dataset.value = content[i][key];
                    //option.setAttribute('data-value', content[i][key]);
                } else if (key === contentKey) {
                    option.value = content[i][key];
                    option.textContent = content[i][key];
                }
            }

            select.appendChild(option);
        }
        parent.appendChild(select);
    }
}

function sendRequest(method, url, data) {
    return new Promise(function (resolve, rej) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, 'http://localhost:8010/' + url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onload = function () {
            resolve(JSON.parse(xhr.response));
        };
        //xhr.onerror = rej();
    });
}

function addDOMCountries(data, changeSelectElement) {
    changeSelect(changeSelectElement, data, 'country', null, 'countryName');
    let selectCountry = document.getElementById('country');
    selectCountry.addEventListener('change', function () {
        userCountry = selectCountry.value;
        sendRequest('POST', 'getCity', JSON.stringify({userCountry: selectCountry.value}))
            .then(data => {
                changeSelect(changeSelectElement, data, 'cities', 'cityId', 'cityName');
                let selectCities = document.getElementById('cities');
                selectCities.addEventListener('change', function (event) {
                    for (let i = 0; i < selectCities.children.length; i++) {
                        if (selectCities.children[i].value === selectCities.value) {
                            sendRequest('POST', 'getSchool', JSON.stringify({userCityId: selectCities.children[i].dataset.value}))
                                .then(data => {
                                    userCity = selectCities.value;
                                    changeSelect(changeSelectElement, data, 'schools', null, 'schoolName');
                                    let selectSchool = document.getElementById('schools');

                                    selectSchool.addEventListener('change', function () {
                                        userSchool = selectSchool.value;
                                        console.log(selectSchool.value)
                                    });
                                })

                        }
                    }
                });
            });
    });
}


// I KNOW HOW DOES IT WORK

function myCallback() {

    let usersInfo = document.getElementById('allUsers');

    function showAllUsers(element) {
        sendRequest('POST', 'getAllUsers', JSON.stringify({data: null}))
            .then(data => {
                //console.log(data);
                for (let i = 0; i < data.length; i++) {
                    createNewUser(element, data[i]);
                }
            })
    }

    usersInfo.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit')) {
            editUserFront(event.target.parentNode.id);
        } else if (event.target.classList.contains('delete')) {
            deleteUser(event.target.parentNode.id, event.target.parentNode);
        } else if (event.target.classList.contains('info')) {
            getInfo(event.target.parentNode.id);
        }
    });

    showAllUsers(usersInfo);

    function editUserFront(id) {
        if (sessionStorage.getItem('role') === 'Guest') {
            alert('userRole = Guest');
        } else {
            let modal = document.getElementById('modalWindowEdit');
            if (!modal) {
                createModalWindow(id);
            } else if (modal) {
                document.body.removeChild(modal);
                createModalWindow(id);
            }
            let buttonEdit = document.getElementById('complittedUserEdit');
            buttonEdit.addEventListener('click', function (event) {
                console.log(event.target.parentNode.id);
                let editedLogin = document.getElementById('editUserLogin');
                let editedPassword = document.getElementById('editUserPassword');
                let editedName = document.getElementById('editUserName');
                let editedEmail = document.getElementById('editUserEmail');
                let editedBirthday = document.getElementById('editUserBirthday');

                let editedUser = {
                    id: event.target.parentNode.id,
                    userLogin: editedLogin.value,
                    userPassword: editedPassword.value,
                    userName: editedName.value,
                    userEmail: editedEmail.value,
                    userBirthday: editedBirthday.value,
                    role: sessionStorage.getItem('role'),
                    userId: sessionStorage.getItem('userId'),
                };
                sendRequest('POST', 'editUser', JSON.stringify(editedUser))
                    .then(data => {
                        if (!data.ERROR) {
                            changeUserInfo(data[0].name, event.target.parentNode.id, 'Name');
                            changeUserInfo(data[0].login, event.target.parentNode.id, 'Login');
                            //changeUserInfo(data[0].password, event.target.parentNode.id , 'Password');
                            changeUserInfo(data[0].email, event.target.parentNode.id, 'Email');
                            //changeUserInfo(data[0].birthday, event.target.parentNode.id , 'Birthday');
                            console.log(data);
                            document.body.removeChild(modal);
                        } else if (data.ERROR) {
                            document.body.removeChild(modal);
                            alert(data.ERROR)
                        }
                    })
            });
        }

    }

    function deleteUser(id, element) {
        sendRequest('POST', 'deleteUser', JSON.stringify(
            {
                id: id,
                role: sessionStorage.getItem('role'),
                userId: sessionStorage.getItem('userId')
            }))
            .then(data => {
                if (!data.ERROR) {
                    usersInfo.removeChild(element);
                } else if (data.ERROR) {
                    alert(data.ERROR);
                }
            })
    }

    function getInfo(id) {
        sendRequest('POST', 'getInfoFromCurrentUser', JSON.stringify(
            {
                id: id,
                role: sessionStorage.getItem('role'),
                userId: sessionStorage.getItem('userId'),
            }))
            .then(data => {
                console.log(sessionStorage.getItem('role'))
                if (!data.ERROR) {
                    console.log(data);
                } else alert(data.ERROR);
            })
    }


    function changeUserInfo(data, id, className) {
        let userInfo = document.getElementsByClassName('user' + className + id);
        console.log(userInfo[0]);
        userInfo[0].textContent = data;
    }

    function createModalWindow(id) {
        let modalWindow = document.createElement('div');
        modalWindow.id = 'modalWindowEdit';
        modalWindow.className = 'fixed';
        let form = document.createElement('form');
        form.id = id;

        let editLogin = document.createElement('input');
        editLogin.type = 'text';
        editLogin.id = 'editUserLogin';
        editLogin.placeholder = 'Enter new login';
        form.appendChild(editLogin);

        let editPassword = document.createElement('input');
        editPassword.type = 'password';
        editPassword.id = 'editUserPassword';
        editPassword.placeholder = 'Enter new Password';
        form.appendChild(editPassword);

        let editName = document.createElement('input');
        editName.type = 'text';
        editName.id = 'editUserName';
        editName.placeholder = 'Enter new Name';
        form.appendChild(editName);

        let editEmail = document.createElement('input');
        editEmail.type = 'email';
        editEmail.id = 'editUserEmail';
        editEmail.placeholder = 'Enter new Email';
        form.appendChild(editEmail);

        let editBirthday = document.createElement('input');
        editBirthday.type = 'date';
        editBirthday.id = 'editUserBirthday';
        form.appendChild(editBirthday);

        let buttonEdit = document.createElement('button');
        buttonEdit.type = 'button';
        buttonEdit.id = 'complittedUserEdit';
        buttonEdit.textContent = 'Edit this user';
        form.appendChild(buttonEdit);

        modalWindow.appendChild(form);
        document.body.appendChild(modalWindow);

    }

    function createNewUser(element, data) {
        let newUser = document.createElement('div');
        newUser.className = 'personInfo';
        newUser.id = data.id;

        let newUserName = document.createElement('div');
        newUserName.textContent = data.name;
        newUserName.classList.add('span');
        newUserName.classList.add('userName' + data.id);
        newUser.appendChild(newUserName);

        let userEmail = document.createElement('div');
        userEmail.textContent = data.email;
        userEmail.classList.add('span');
        userEmail.classList.add('userEmail' + data.id);
        newUser.appendChild(userEmail);

        let userCountry = document.createElement('div');
        userCountry.textContent = data.country;
        userCountry.classList.add('span');
        userCountry.classList.add('userCountry' + data.id);
        newUser.appendChild(userCountry);

        let userLogin = document.createElement('div');
        userLogin.textContent = data.login;
        userLogin.classList.add('span');
        userLogin.classList.add('userLogin' + data.id);
        newUser.appendChild(userLogin);

        let userCity = document.createElement('div');
        userCity.textContent = data.city;
        userCity.classList.add('span');
        userCity.classList.add('userCity' + data.id);
        newUser.appendChild(userCity);

        let userSchool = document.createElement('div');
        userSchool.textContent = data.school;
        userSchool.classList.add('span');
        userSchool.classList.add('userSchool' + data.id);
        newUser.appendChild(userSchool);

        let userRole = document.createElement('div');
        userRole.textContent = data.role;
        userRole.classList.add('span');
        userRole.classList.add('userRole' + data.id);
        newUser.appendChild(userRole);

        let newBtnEdit = document.createElement('button');
        newBtnEdit.textContent = 'Edit';
        newBtnEdit.className = 'edit';
        newUser.appendChild(newBtnEdit);

        let newBtnDelete = document.createElement('button');
        newBtnDelete.textContent = 'Delete';
        newBtnDelete.className = 'delete';
        newUser.appendChild(newBtnDelete);

        let newBtnInfo = document.createElement('button');
        newBtnInfo.textContent = 'Info';
        newBtnInfo.className = 'info';
        newUser.appendChild(newBtnInfo);

        element.appendChild(newUser);
    }

    let buttonCreateNewUser = document.getElementById('createNewUser');
    buttonCreateNewUser.addEventListener('click', function () {
        let link = document.querySelector('link[data-value=importAddNewUserHTML]');
        console.log(link);
        let content = link.import.querySelector('#addNewUser');
        document.body.appendChild(content.cloneNode(true));
        let mainApp = document.getElementById('mainApp');
        let removeElement = document.getElementById('addNewUser');
        document.body.removeChild(mainApp);
        functionForCreateNewUser(mainApp, removeElement);


        //myCallback()
        //sessionStorage.setItem('role', data[data.length - 1].role);
        //sessionStorage.setItem('userId', data[data.length - 1].id);
        console.log(window.sessionStorage);

        /*sendRequest('POST', 'editUser', JSON.stringify(user))
            .then(data => {

                document.body.appendChild(pageToCreateNewUser.cloneNode(true));
                functionForCreateNewUser();
                //sessionStorage.setItem('role', data[data.length - 1].role);
                //sessionStorage.setItem('userId', data[data.length - 1].id);
                console.log(window.sessionStorage);
                document.body.removeChild(document.getElementById('mainApp'));
            });*/
    });


    function functionForCreateNewUser(appendElement, removeElement, content) {
        let formForAddNewUser = document.getElementById('formForAdd'),
            buttonAddNewUserInDB = document.getElementById('addNewUserInDB');


        sendRequest('POST', 'getCountries', JSON.stringify({data: null}))
            .then(data => {
                console.log(data);
                addDOMCountries(data, formForAddNewUser);
            });


        buttonAddNewUserInDB.addEventListener('click', function () {
            let newUser = {
                userLogin: document.getElementById('createNewLogin').value,
                userPassword: document.getElementById('createNewPassword').value,
                userName: document.getElementById('createNewName').value,
                userEmail: document.getElementById('createNewEmail').value,
                userBirthday: document.getElementById('createNewBirthday').value,
                userCountry: document.getElementById('country').value,
                userRole: document.getElementById('createNewRole').value,
                userCity: document.getElementById('cities').value,
                userSchool: document.getElementById('schools').value,
            };
            sendRequest('POST', 'createNewUser', JSON.stringify(newUser))
                .then(data => {
                    if (!data.ERROR) {
                        document.body.appendChild(appendElement);
                        sendRequest('POST', 'getLastUser', JSON.stringify({data: null}))
                            .then(data =>{
                                createNewUser(appendElement, data[0]);
                            });
                        removeElement.remove();
                        console.log(data);
                    }
                })
        });
    }
}




