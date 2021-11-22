import React from 'react';
import CreateKey from '../Utils/CreateKey';
import checkUserRegistration from '../Utils/CheckRegistration';
import showStatus from '../Utils/errorHandling';

const DocReg = () => {
    async function handleRegistration() {
        const gu_name = document.getElementById('doctor-name')?.value
        const gu_speciality = document.getElementById('doctor-speciality')?.value
        const gu_registrationnumber = document.getElementById('doctor-registrationnumber')?.value
        const gu_randomnumber = Math.random()
        try {
          const d_object_cid = await CreateKey({ DocName: gu_name, DocSpeciality: gu_speciality,
            DocRegistrationnumber: gu_registrationnumber, DocRandomNumber: gu_randomnumber})
            //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
            console.info(d_object_cid)
            var userType, userCIDExists
            //let user_cid_array = []
            const data = checkUserRegistration(d_object_cid.toString())
            userType = data[0]
            userCIDExists = data[1]
            let user_cid_array = data[2]
            //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
            if (userCIDExists === false)
            {
                document.getElementById('register-doctor-output').innerHTML = "<h3>" + d_object_cid + "</h3>"
                user_cid_array.push({UserType: "D", UserCID: d_object_cid.toString()})  //javascript array and local storage being used to persist data until blockchain is implemented
                localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented    
                console.info(user_cid_array)
            }
            else
              document.getElementById('register-doctor-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
          } catch (err) {
            showStatus(err.message, '#ea5037')
            console.error(err)
          }
        }

    return (
        <main className="pa4-l bg-snow mw7 mv5 center pa4">
            <h1 className="pa0 f2 ma0 mb4 aqua tc">Doctor Registration</h1>
            <h3>Enter Doctor details</h3>

            <div id="register-doctor">
                <label for="doctor-name" className="f5 ma0 pb2 tracked aqua fw4 db">Name</label>
                <input
                    className="input-reset bn black-80 bg-white pa3 w-100 mb3"
                    id="doctor-name"
                    name="doctor-name"
                    type="text"
                    required
                />

                <label for="doctor-speciality" className="f5 ma0 pb2 tracked aqua fw4 db">Doctor Speciality</label>
                <input
                    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
                    id="doctor-speciality"
                    name="doctor-speciality"
                    type="text"
                    required
                />

                <label for="doctor-registrationnumber" className="f5 ma0 pb2 tracked aqua fw4 db"
                >Doctor Registration Number</label>
                <input
                    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
                    id="doctor-registrationnumber"
                    name="doctor-registrationnumber"
                    type="text"
                    required
                />

                <button
                    className="
button-reset
pv3
tc
bn
bg-animate bg-black-80
hover-bg-aqua
white
pointer
w-100
"
                    id="register-doctor-submit"
                    type="submit"
                    onClick={handleRegistration}
                >
                    Register
                </button>
            </div>

            <h3>Output</h3>
            <div id="register-doctor-output">Fill output here</div>
        </main>
    );
}

export default DocReg