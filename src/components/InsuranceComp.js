import React from 'react';
import CreateKey from '../Utils/CreateKey';
import checkUserRegistration from '../Utils/CheckRegistration';
import showStatus from '../Utils/errorHandling';

const InsuranceComp = () => {
    async function handleRegistration() {
        const gu_name = document.getElementById('insurancecompany-name')?.value
        // const gu_age = document.getElementById('general-user-age')?.value
        const gu_address = document.getElementById('insurancecompany-address')?.value
        //const gu_country = document.getElementById('general-user-country')?.value
        const gu_phonenumber = document.getElementById('insurancecompany-phonenumber')?.value
        const gu_emailaddress = document.getElementById('insurancecompany-emailaddress')?.value
        const gu_randomnumber = Math.random()
        try {
          const ic_object_cid = await CreateKey({ InsuranceCompName: gu_name, InsuranceCompAddress: gu_address,
            InsuranceCompPhoneNumber: gu_phonenumber, InsuranceCompEmailAddress: gu_emailaddress,
            InsuranceCompRandomNumber: gu_randomnumber})
            //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
            console.info(ic_object_cid)
            var userType, userCIDExists
            //let user_cid_array = []
            const data = checkUserRegistration(ic_object_cid.toString())
            userType = data[0]
            userCIDExists = data[1]
            let user_cid_array = data[2]
            //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
            if (userCIDExists === false)
            {
                document.getElementById('register-insurancecompany-output').innerHTML = "<h3>" + ic_object_cid + "</h3>"
                user_cid_array.push({UserType: "I", UserCID: ic_object_cid.toString()})  //javascript array and local storage being used to persist data until blockchain is implemented
                console.info(user_cid_array)
                localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented    
                console.info(user_cid_array)
            }
            else
              document.getElementById('register-insurancecompany-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
          } catch (err) {
            showStatus(err.message, '#ea5037')
            console.error(err)
          }
        }
    return (
    <main className="pa4-l bg-snow mw7 mv5 center pa4">
        <h1 className="pa0 f2 ma0 mb4 aqua tc">Insurance Company Registration</h1>
        <h3>Enter Insurance company details</h3>

        <div id="register-insurancecompany">
            <label for="insurancecompany-name" className="f5 ma0 pb2 tracked aqua fw4 db"
            >Insurance Company Name</label>
            <input
                className="input-reset bn black-80 bg-white pa3 w-100 mb3"
                id="insurancecompany-name"
                name="insurancecompany-name"
                type="text"
                required
            />

            <label for="insurancecompany-address" className="f5 ma0 pb2 tracked aqua fw4 db"
            >Insurance Company Address</label>
            <input
                className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
                id="insurancecompany-address"
                name="insuracecompany-address"
                type="text"
                required
            />

            <label for="insurancecompany-phonenumber" className="f5 ma0 pb2 tracked aqua fw4 db"
            >Insurance Company Phone Number</label>
            <input
                className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
                id="insurancecompany-phonenumber"
                name="insurancecompany-phonenumber"
                type="text"
                required
            />

            <label for="insurancecompany-emailaddress" className="f5 ma0 pb2 tracked aqua fw4 db"
            >Insurance Company Email address</label>
            <input
                className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
                id="insurancecompany-emailaddress"
                name="insurancecompany-emailaddress"
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
                id="register-insurancecompany-submit"
                type="submit"
                onClick={handleRegistration}
            >
                Register
            </button>
        </div>

        <h3>Output</h3>
        <div id="register-insurancecompany-output">Fill output here</div>
    </main>
    )
}
export default InsuranceComp