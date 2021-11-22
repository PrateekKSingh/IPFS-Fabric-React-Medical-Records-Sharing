import React from 'react';
import CreateKey from '../Utils/CreateKey';
import checkUserRegistration from '../Utils/CheckRegistration'
import showStatus from '../Utils/errorHandling'

const GeneralUserReg = () => {
  async function handleRegistration() {
    const gu_name = document.getElementById('general-user-name')?.value
    const gu_age = document.getElementById('general-user-age')?.value
    const gu_address = document.getElementById('general-user-address')?.value
    const gu_country = document.getElementById('general-user-country')?.value
    const gu_phonenumber = document.getElementById('general-user-phonenumber')?.value
    const gu_emailaddress = document.getElementById('general-user-emailaddress')?.value
    const gu_randomnumber = Math.random()
    try {
    const gu_object_cid = await CreateKey({ GeneralUserName: gu_name, GeneralUserAge: gu_age, GeneralUserAddress: gu_address,
      GeneralUserCountry: gu_country, GeneralUserPhoneNumber: gu_phonenumber, GeneralUserEmailAddress: gu_emailaddress,
      GeneralUserRandomNumber: gu_randomnumber})
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
      console.info(gu_object_cid)
      var userType, userCIDExists
      const data = checkUserRegistration(gu_object_cid.toString())
      userType = data[0]
      userCIDExists = data[1]
      let user_cid_array = data[2]
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
      if (userCIDExists === false)
      {
        document.getElementById('register-general-user-output').innerHTML = "<h3>" + gu_object_cid + "</h3>"
        user_cid_array.push({UserType: "G", UserCID: gu_object_cid.toString()}) //javascript array and local storage being used to persist data until blockchain is implemented
        localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented
        
      }
      else
        document.getElementById('register-general-user-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
    } catch (err) {
      showStatus(err.message, '#ea5037')
      console.error(err)
    }
  }
  return (
    <>
      <div className="pa4-l bg-snow mw7 mv5 center pa4">
        <h1 className="pa0 f2 ma0 mb4 aqua tc">General User Registration</h1>
        <h3>Enter General User details</h3>


        <div id="register-general-user">
          <label for="general-user-name" className="f5 ma0 pb2 tracked aqua fw4 db"
          >Name</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3"
            id="general-user-name"
            name="general-user-name"
            type="text"
            required
          />

          <label for="general-user-age" className="f5 ma0 pb2 tracked aqua fw4 db"
          >Age</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
            id="general-user-age"
            name="general-user-age"
            type="text"
          />

          <label for="general-user-address" className="f5 ma0 pb2 tracked aqua fw4 db"
          >Address</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
            id="general-user-address"
            name="general-user-address"
            type="text"
          />

          <label for="general-user-country" className="f5 ma0 pb2 tracked aqua fw4 db"
          >Country</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
            id="general-user-country"
            name="general-user-country"
            type="text"
            required
          />

          <label for="general-user-phonenumber" className="f5 ma0 pb2 tracked aqua fw4 db"
          >Phone Number</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
            id="general-user-phonenumber"
            name="general-user-phonenumber"
            type="text"
          />

          <label for="general-user-emailaddress" className="f5 ma0 pb2 tracked aqua fw4 db"
          >Email address</label>
          <input
            className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
            id="general-user-emailaddress"
            name="general-user-emailaddress"
            type="text"
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
            id="register-general-user-submit"
            type="submit"
            onClick={handleRegistration}
          >
            Register
          </button>
        </div>

        <h3>Output</h3>
        <div id="register-general-user-output">Fill output here</div>
    </div>
    </>
  );
}

export default GeneralUserReg;
