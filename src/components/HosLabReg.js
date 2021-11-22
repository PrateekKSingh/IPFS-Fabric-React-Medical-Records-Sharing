import React from 'react';
import CreateKey from '../Utils/CreateKey';
import checkUserRegistration from '../Utils/CheckRegistration';
import showStatus from '../Utils/errorHandling';
 
const HosLabReg = () => {
  async function handleRegistration() {
    const gu_name = document.getElementById('hospital-or-laboratory-name')?.value
    // const gu_age = document.getElementById('general-user-age')?.value
    const gu_address = document.getElementById('hospital-or-laboratory-address')?.value
    //const gu_country = document.getElementById('general-user-country')?.value
    const gu_phonenumber = document.getElementById('hospital-or-laboratory-phonenumber')?.value
    const gu_emailaddress = document.getElementById('hospital-or-laboratory-emailaddress')?.value
    const gu_randomnumber = Math.random()
    try {
      const hl_object_cid = await CreateKey({ HosLabName: gu_name, HosLabAddress: gu_address,
        HosLabPhoneNumber: gu_phonenumber, HosLabEmailAddress: gu_emailaddress,
        HosLabRandomNumber: gu_randomnumber})
        //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
        console.info(hl_object_cid)
        var userType, userCIDExists
        //let user_cid_array = []
        const data = checkUserRegistration(hl_object_cid.toString())
        userType = data[0]
        userCIDExists = data[1]
        let user_cid_array = data[2]
        //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
        if (userCIDExists === false)
        {
          document.getElementById('register-hoisptal-or-laboratory-output').innerHTML = "<h3>" + hl_object_cid + "</h3>"
          user_cid_array.push({UserType: "H", UserCID: hl_object_cid.toString()})  //javascript array and local storage being used to persist data until blockchain is implemented
          console.info(user_cid_array)
          localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented    
          console.info(user_cid_array)
        }
        else
          document.getElementById('register-hospital-or-laboratory-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
      } catch (err) {
        showStatus(err.message, '#ea5037')
        console.error(err)
      }
    }
 
  return (
    <div className="pa4-l bg-snow mw7 mv5 center pa4">
    <h1 className="pa0 f2 ma0 mb4 aqua tc">Hospital/ Laboratory Registration</h1> 
    <h3>Enter Hospital/Laboratory details</h3>


    <div id="register-hospital-or-laboratory">
      <label for="hospital-or-laboratory-name" className="f5 ma0 pb2 tracked aqua fw4 db"
      >Hospital/Laboratory Name</label>
      <input
      className="input-reset bn black-80 bg-white pa3 w-100 mb3"
      id="hospital-or-laboratory-name"
      name="hospital-or-laboratory-name"
      type="text"
      required
      />

      <label for="hospital-or-laboratory-address" className="f5 ma0 pb2 tracked aqua fw4 db"
      >Hospital/Laboratory Address</label>
      <input
      className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
      id="hospital-or-laboratory-address"
      name="hospital-or-laboratory-address"
      type="text"
      required
      />

      <label for="hospital-or-laboratory-phonenumber" className="f5 ma0 pb2 tracked aqua fw4 db"
      >Hospital/Laboratory Phone Number</label>
      <input
      className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
      id="hospital-or-laboratory-phonenumber"
      name="hospital-or-laboratory-phonenumber"
      type="text"
      required
      />

      <label for="hospital-or-laboratory-emailaddress" className="f5 ma0 pb2 tracked aqua fw4 db"
      >Hospital/Laboratory Email address</label>
      <input
      className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
      id="hospital-or-laboratory-emailaddress"
      name="hospital-or-laboratory-emailaddress"
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
      id="register-hospital-or-laboratory-submit"
      type="submit"
      onClick={handleRegistration}
      >
      Register
      </button>
      </div>

      <h3>Output</h3>
      <div id="register-hoisptal-or-laboratory-output">Fill output here</div>
  </div>
  );
}

export default HosLabReg;
