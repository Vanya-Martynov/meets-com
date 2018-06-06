let deleteSchoolValue = document.getElementById('schoolNameToDelete'),
    buttonDeleteSchool = document.getElementById('deleteSchoolFromDB');

let buttonDeleteSchoolFromCityFromDB = document.getElementById('deleteSchoolFromCityFromDB');
console.log(buttonDeleteSchoolFromCityFromDB)


buttonDeleteSchool.addEventListener('click',function () {
    console.log(deleteSchoolValue.value);
    sendRequest('POST', 'deleteSchool', JSON.stringify({schoolName: deleteSchoolValue.value}))
        .then(data =>{
            console.log(data)
        })
});

buttonDeleteSchoolFromCityFromDB.addEventListener('click', function () {
    sendRequest('POST', 'deleteSchoolFromCity', JSON.stringify(
        {
            cityName: 'Mogilev',
            schoolName: 'School#1',
        }))
});




















































































function sendRequest(method, url, data) {
    return new Promise(function (resolve,rej) {
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
        sendRequest('POST','getCity', JSON.stringify({userCountry: selectCountry.value}))
            .then(data =>{
                changeSelect(changeSelectElement , data, 'cities', 'cityId', 'cityName');
                let selectCities = document.getElementById('cities');
                selectCities.addEventListener('change', function (event) {
                    for(let i = 0; i < selectCities.children.length; i++){
                        if(selectCities.children[i].value === selectCities.value){
                            sendRequest('POST', 'getSchool', JSON.stringify({userCityId: selectCities.children[i].dataset.value}))
                                .then(data => {
                                    userCity = selectCities.value;
                                    changeSelect(changeSelectElement, data, 'schools', null, 'schoolName');
                                    let selectSchool = document.getElementById('schools');

                                    selectSchool.addEventListener('change', function () {
                                        userSchool = selectSchool.value;
                                    });
                                })

                        }
                    }
                });
            });
    });
}


function changeSelect(parent, content, id, valueKey, contentKey) {

    let test = document.getElementById(id);
    if(!test){
        let select = document.createElement('select');
        select.id = id;
        for(let i = 0; i < content.length; i++){
            let option = document.createElement('option');

            for(let key in content[i]){
                if(key === valueKey){
                    option.dataset.value = content[i][key];
                    //option.setAttribute('data-value', content[i][key]);
                }else if(key === contentKey){
                    option.value = content[i][key];
                    option.textContent = content[i][key];
                }else console.log(key, typeof key);
            }

            select.appendChild(option);
        }
        parent.appendChild(select);
    }else if(test){
        parent.removeChild(test);
        let select = document.createElement('select');
        select.id = id;

        for(let i = 0; i < content.length; i++){
            let option = document.createElement('option');

            for(let key in content[i]){
                if(key ===  valueKey){
                    option.dataset.value = content[i][key];
                    //option.setAttribute('data-value', content[i][key]);
                }else if(key === contentKey){
                    option.value = content[i][key];
                    option.textContent = content[i][key];
                }
            }

            select.appendChild(option);
        }
        parent.appendChild(select);
    }
}
