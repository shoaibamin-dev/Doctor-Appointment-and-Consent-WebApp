


$(document).ready(function () {
    localStorage.clear()
});



function userSubmit() {
    var email = $("#email").val();
    var password = $("#password").val();

    // Authentication 


    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            localStorage.setItem("google-signin", true)
            localStorage.setItem("google-name", user.displayName)

            $('#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc6').addClass('hide');
            $('#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc5').removeClass('hide');

            showUserData();



            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...

            console.log(error)


            alert("There is an error signin in with Google method, please try again later.")


        });




}

function showUserData() {


    $(".google-name").text(localStorage.getItem("google-name"))


    // DATABASE


    firebase.database().ref('/').once('value').then((snapshot) => {

        var completeSnapshot = snapshot.val()

        localStorage.setItem("firebase-data",
            JSON.stringify(completeSnapshot["users"]))


        localStorage.setItem("firebase-lic",
            JSON.stringify(completeSnapshot["LIC"]))



        getNames();



    });


}

function getNames() {

    var completeSnapshot = JSON.parse(localStorage.getItem("firebase-data"))


    var names = (Object.keys(completeSnapshot));

    $('select[data-id="select-hcp_name"]').empty();

    for (let i = 0; i < names.length; i++) {
        const name = names[i];

        $('select[data-id="select-hcp_name"]').append(`
                    <option value=${name}>${name.replace('_', ' ')}</option>
                `)

    }


    showData(names[0])

}


function showData(key) {

    console.log(key)

    var completeSnapshot = JSON.parse(localStorage.getItem("firebase-data"))
    var user = completeSnapshot[key];
    localStorage.setItem("firebase-single", JSON.stringify(key))




    // LIC ------------------>
    var lics = JSON.parse(localStorage.getItem("firebase-lic"))




    $('select[data-id="select-hcp_lic"]').empty();

    for (let i = 0; i < lics.length; i++) {
        const lic = lics[i];

        $('select[data-id="select-hcp_lic"]').append(`
                    <option value=${lic}>${lic}</option>
                `)

    }

    $('select[data-id="select-hcp_lic"]').val(user["SelfLIC"])

    // LIC <------------------


    // STATUS ------------------>

    $('select[data-id="select-hcp_status"]').empty();

    $('select[data-id="select-hcp_status"]').append(`  
               <option value="No Status">No Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending Approval">Pending Approval</option>
             `)



    $('select[data-id="select-hcp_status"]').val(user["HCPConsentHistory"] ? user["HCPConsentHistory"][user["HCPConsentHistory"].length - 1]["ConsentStatus"] : "No Status")


    // STATUS <------------------



    // POSTCODE ------------------>

    $("#postal-code").text(user["PostalCode"])

    // POSTCODE <------------------

    // LAST UPDATE ------------------>

    $("#last-date").text(user["Date"])


    // LAST UPDATE <------------------

    // LAST UID ------------------>

    // $("#last-uid").text(user["UserID"])
    $('#last-uid').text(localStorage.getItem('google-name'))

    // LAST UID <------------------

    // HCP EMAIL ------------------>

    $("#hcp-email").text(user["Email"])

    // HCP EMAIL <------------------

    // AddressLine1 ------------------>

    $("#address-line-1").text(user["AddressLine1"])

    // AddressLine1 <------------------

    // AddressLine2 ------------------>

    $("#address-line-2").text(user["AddressLine2"])

    // AddressLine2 <------------------

    // CONTACT ------------------>

    $("#contact-phone").text(user["Contact"])

    // CONTACT <------------------

    // COUNTRY ------------------>

    $("#country").text(user["Country"])

    // COUNTRY <------------------

    // CITY ------------------>

    $("#city").text(user["City"])


    // CITY <------------------


    // STATE ------------------>

    $("#state").text(user["State"])


    // STATE <------------------

    // PROVINCE ------------------>

    $("#province").text(user["Province"])


    // PROVINCE <------------------

    // COMMENT ------------------>

    $("#comment").text(user["Comments"])


    // COMMENT <------------------

    // HISTORY ------------------>


    var HCPConsentHistory = [];
    try {
        HCPConsentHistory = Object.entries(user["HCPConsentHistory"]);
    }
    catch (err) { }
    // console.log(Object.entries(HCPConsentHistory))


    $("#table-history tbody").empty();

    for (let i = 0; i < HCPConsentHistory.length; i++) {
        const history = HCPConsentHistory[i][1];


        $("#table-history tbody").append(`
                <tr>
                            <td>${history["Date"]}</td>
                            <td>${history["ConsentStatus"]}</td>
                            <td>${history["IssuedBy"]}</td>
                            <td>${history["UserID"]}</td>
                            <td>${i + 40400}</td>
                            <td><a target="_blank" href=${history["ImageURL"]}><img height="30" src=${history["ImageURL"]}></a></td>
                            <td>${history["Comment"]}</td>
                           

                        </tr>
            `)




    }



    // HISTORY <------------------


}


function showLicData(lic) {

    console.log(lic)

    var completeSnapshot = JSON.parse(localStorage.getItem("firebase-data"))
    var user;
    var username;


    for (var key in completeSnapshot) {
        data = completeSnapshot[key];
        if (data["SelfLIC"] === lic) {
            user = completeSnapshot[key];
            console.log("key", key)
            username = key;
            localStorage.setItem("firebase-single", JSON.stringify(key))
            break;
        }
    }


    // NAME ------------------>

    $(`select[data-id="select-hcp_name"]`).val(username).attr('selected', true);
    // $(`select[data-id="select-hcp_name"] [value=${username}]`).attr('selected', true).change();
    // $('select[data-id="select-hcp_name"]').val(JSON.parse(key.replace('_', ' ')))

    // NAME <------------------

    // LIC ------------------>
    var lics = JSON.parse(localStorage.getItem("firebase-lic"))
    console.log(lics)


    $('select[data-id="select-hcp_lic"]').empty();

    for (let i = 0; i < lics.length; i++) {
        const lic = lics[i];

        $('select[data-id="select-hcp_lic"]').append(`
                    <option value=${lic}>${lic}</option>
                `)

    }

    $('select[data-id="select-hcp_lic"]').val(user["SelfLIC"])

    // LIC <------------------


    // STATUS ------------------>

    $('select[data-id="select-hcp_status"]').empty();

    $('select[data-id="select-hcp_status"]').append(`  
               <option value="No Status">No Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending Approval">Pending Approval</option>
             `)



    $('select[data-id="select-hcp_status"]').val(user["HCPConsentHistory"] ? user["HCPConsentHistory"][user["HCPConsentHistory"].length - 1]["ConsentStatus"] : "No Status")


    // STATUS <------------------


    // POSTCODE ------------------>

    $("#postal-code").text(user["PostalCode"])

    // POSTCODE <------------------

    // LAST UPDATE ------------------>

    $("#last-date").text(user["Date"])


    // LAST UPDATE <------------------

    // LAST UID ------------------>

    $("#last-uid").text(user["UserID"])


    // LAST UID <------------------

    // HCP EMAIL ------------------>

    $("#hcp-email").text(user["Email"])

    // HCP EMAIL <------------------

    // AddressLine1 ------------------>

    $("#address-line-1").text(user["AddressLine1"])

    // AddressLine1 <------------------

    // AddressLine2 ------------------>

    $("#address-line-2").text(user["AddressLine2"])

    // AddressLine2 <------------------

    // CONTACT ------------------>

    $("#contact-phone").text(user["Contact"])

    // CONTACT <------------------

    // COUNTRY ------------------>

    $("#country").text(user["Country"])

    // COUNTRY <------------------

    // CITY ------------------>

    $("#city").text(user["City"])


    // CITY <------------------


    // STATE ------------------>

    $("#state").text(user["State"])


    // STATE <------------------

    // PROVINCE ------------------>

    $("#province").text(user["Province"])


    // PROVINCE <------------------

    // COMMENT ------------------>

    $("#comment").text(user["Comments"])


    // COMMENT <------------------

    // HISTORY ------------------>


    var HCPConsentHistory = [];
    try {
        HCPConsentHistory = Object.entries(user["HCPConsentHistory"]);
    }
    catch (err) { }
    // console.log(Object.entries(HCPConsentHistory))


    $("#table-history tbody").empty();

    for (let i = 0; i < HCPConsentHistory.length; i++) {
        const history = HCPConsentHistory[i][1];


        $("#table-history tbody").append(`
                <tr>
                            <td>${history["Date"]}</td>
                            <td>${history["ConsentStatus"]}</td>
                            <td>${history["IssuedBy"]}</td>
                            <td>${history["UserID"]}</td>
                            <td><a target="_blank" href=${history["ImageURL"]}><img height="30" src=${history["ImageURL"]}></a></td>
                            <td>${history["Comment"]}</td>
                           

                        </tr>
            `)




    }



    // HISTORY <------------------


}


function recordHCP() {

    var ufdate = $("#hcp-date").val();
    var unfdate = new Date(ufdate);
    var month = unfdate.toLocaleString('default', { month: 'long' });
    var date = month + "-" + unfdate.getDate() + "-" + unfdate.getFullYear()


    var name = $("#hcp-name").val();
    var email = $("#hcp-emaill").val();
    var status = $("#hcp-status").val();
    var userid = $("#hcp-uid").val();
    var addressline1 = $("#hcp-address11").val();
    var addressline2 = $("#hcp-address22").val();
    var phone = $("#hcp-phonee").val();
    var city = $("#hcp-city").val();
    var stateprovince = $("#hcp-stateprovince").val();
    var postalcode = $("#hcp-postalcode").val();
    var country = $("#hcp-country").val();
    var comments = $("#hcp-comments").val();
    // var licenceids = $("#hcp-licenceids").val().split(',');
    var selflic = $("#hcp-selflic").val();

    alert("Your record is being saved, please wait for the message.")

    var hcpObj = {
        AddressLine1: addressline1,
        AddressLine2: addressline2,
        City: city,
        Comments: comments,
        Contact: phone,
        Country: country,
        Date: date,
        Email: email,
        PostalCode: postalcode,
        Province: '',
        SelfLIC: selflic,
        State: stateprovince,
        UserID: userid
    }

    var ref = firebase.database().ref("/users");
    var licRef = firebase.database().ref("/LIC");
    ref.child(name.replace(' ', '_')).set(hcpObj)
        .then(function () {

            licRef.once('value', snap => {
                var lics = [...snap.val()];
                if (lics.indexOf(selflic) === -1) {
                    lics.push(selflic);

                    return licRef.set(lics).then(function () {



                        alert("Record has been saved!");

                        $("#hcp-name").val("");
                        $("#hcp-uid").val("");
                        $("#hcp-emaill").val("");
                        $("#hcp-status").val("");
                        $("#hcp-address11").val("");
                        $("#hcp-address22").val("");
                        $("#hcp-phonee").val("");
                        $("#hcp-city").val("");
                        $("#hcp-stateprovince").val("");
                        $("#hcp-postalcode").val("");
                        $("#hcp-country").val("");
                        $("#hcp-comments").val("");
                        // $("#hcp-licenceids").val("");
                        $("#hcp-selflic").val("");



                    })
                        .catch(function () {
                            alert("Something went wrong in file upload, please try again.")
                        })


                }


                alert("Record has been saved!");

                $("#hcp-name").val("");
                $("#hcp-uid").val("");
                $("#hcp-emaill").val("");
                $("#hcp-status").val("");
                $("#hcp-address11").val("");
                $("#hcp-address22").val("");
                $("#hcp-phonee").val("");
                $("#hcp-city").val("");
                $("#hcp-stateprovince").val("");
                $("#hcp-postalcode").val("");
                $("#hcp-country").val("");
                $("#hcp-comments").val("");
                // $("#hcp-licenceids").val("");
                $("#hcp-selflic").val("");


            })



        })
        .catch(err => {
            alert("Something went wrong in file upload, please try again.")
        })

    return false;



}

function recordSubmit() {
    var ufdate = $("#record-date").val();
    var unfdate = new Date(ufdate);
    var month = unfdate.toLocaleString('default', { month: 'long' });
    var date = month + "-" + unfdate.getDate() + "-" + unfdate.getFullYear()


    var name = $("#hcp-name").val();
    var email = $("#hcp-email").val();
    var status = $("#record-status").val();
    var userid = $("#record-uid").val();
    var file = $("#record-file").prop('files')[0];
    var comments = $("#record-comments").val();




    console.log(date, status, userid, file, comments)


    alert("Your record is being saved, please wait for the message.")

    if (file) {

        var storageRef = firebase.storage().ref();
        var childRef = storageRef.child(file.name);

        try {
            childRef.put(file).then((snapshot) => {

                childRef.getDownloadURL()
                    .then((url) => {



                        insertDB(comments, status, date, url, userid);





                        // ref.child("HCPConsentHistory").push(objectData, (error) => {
                        //     if (error) {
                        //         alert("Something went wrong in saving the data.")
                        //     } else {

                        //         $("#record-date").val("");
                        //         $("#record-uid").val("");
                        //         $("#record-file").empty();
                        //         $("#record-comments").val("")

                        //         ref.set({
                        //             UserID: userid,
                        //             Date: date,
                        //             Comments: comment
                        //         })


                        //         var fdata = JSON.parse(localStorage.getItem("firebase-data"));
                        //         fdata["UserID"] = userid;
                        //         fdata["Date"] = date;
                        //         fdata["Comments"] = comment;
                        //         fdata["HCPConsentHistory"].push(objectData)
                        //         localStorage.setItem("firebase-data", JSON.stringify(fdata))
                        //         alert("Record saved successfully.")


                        //     }
                        // })




                    }).catch(err => {
                        alert("Something went wrong in file upload, please try again.")
                    })
            });
        }
        catch (err) {
            alert("Something went wrong, please try again.")

        }

    }
    else {
        insertDB(comments, status, date, "", userid);

    }

    return false;

}

function insertDB(comments, status, date, url, userid) {
    var url = url;

    var name = JSON.parse(localStorage.getItem("firebase-single"));

    var ref = firebase.database().ref("/users/" + name);

    var objectData = {
        Comment: comments,
        ConsentStatus: status,
        Date: date,
        ImageURL: url,
        UserID: userid,
        IssuedBy: localStorage.getItem("google-name")
    }

    ref.get().then((snapshot) => {
        if (snapshot.exists()) {
            var userObject = snapshot.val();

            userObject["UserID"] = userid;
            userObject["Date"] = date;
            userObject["Comments"] = comments;
            userObject["HCPConsentHistory"] = userObject["HCPConsentHistory"] || [];
            userObject["HCPConsentHistory"].push(objectData)

            ref.set(userObject, (error) => {
                if (error) {
                    alert("Something went wrong in saving the data.")
                } else {


                    var localStorageData = JSON.parse(localStorage.getItem("firebase-data"));
                    localStorageData[name] = { ...userObject };

                    localStorage.setItem("firebase-data", JSON.stringify(localStorageData))

                    $("#record-date").val("");
                    $("#record-uid").val("");
                    $("#record-file").val(null)
                    $("#record-comments").val("")

                    showData(name)

                    alert("Record saved successfully.")
                }
            })

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function addHCP() {
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc5").addClass("hide")
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1ld7").removeClass("hide")
}

function addRecord() {
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc5").addClass("hide")
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1ld6").removeClass("hide")
}

function goBack() {
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1ld6").addClass("hide")
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1ld7").addClass("hide")
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc5").removeClass("hide")
}


function logout() {

    localStorage.clear();
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc5").addClass("hide")
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1ld6").addClass("hide")
    $("#N6s45nqg5mKU6vIcDwNvzCizUL9B1lc6").removeClass("hide")
}

$('select[data-id="select-hcp_name"]').change(function () {


    showData($(this).val())



});


$('select[data-id="select-hcp_lic"]').change(function () {


    showLicData($(this).val())



});




