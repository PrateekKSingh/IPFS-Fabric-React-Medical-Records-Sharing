import React, {useState} from 'react';
import checkUserRegistration from '../Utils/CheckRegistration';
import showStatus from '../Utils/errorHandling';
import * as IPFS from 'ipfs-core'
import { getInstanceIPFS } from '../Utils/CreateKey'
import SaveFile from './SaveFile';
import FilePermissionsScreen from './FilePermissionsScreen'
import ChangeConfidentiality from './ChangeConfidentiality'
import AddUserPermissions from './AddUserPermissions'

function Login() {

    let [genUserType, setGeneralType] = useState(false)
    let [Comp, setComponent] = useState('saveFile')

    async function handleLogin(){
        try {
            const login_key = document.getElementById('login-key').value
            const ipfs_core = await getInstanceIPFS();
            //Check whether CID entered already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
            var userType, userCIDExists 
            const data = checkUserRegistration(login_key)
            userType = data[0]
            userCIDExists = data[1]
            if(userType === 'G') {
                setGeneralType(true)
            }
            console.info(userType, userCIDExists)
            //Check whether CID entered already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
            if (userCIDExists === false)
            {
              //Make any previously shown screen hidden
              document.getElementById('main-general-user-details').setAttribute("hidden","true")
              document.getElementById('main-hospital-or-laboratory-details').setAttribute("hidden","true")
              document.getElementById('main-doctor-details').setAttribute("hidden","true")
              document.getElementById('main-incurance-company-details').setAttribute("hidden","true")
              document.getElementById('login-user-output').innerHTML = "<h3>" + "No user registered with this key." + "</h3>"
            }
            else
            {
                let mainId
              switch (userType)
              {
                case "G":
                  userType = "General User"
                  mainId = "main-general-user-details"
                  break;
                case "H":
                  userType = "Hospital or Laboratory"
                  mainId = "main-hospital-or-laboratory-details"
                  break;
                case "D":
                  userType = "Doctor"
                  mainId = "main-doctor-details"
                  break;
                case "I":
                  userType = "Insurance Company"
                  mainId = "main-incurance-company-details"
                  break;
              }
              document.getElementById('login-user-output').innerHTML = "<h3>" + "User is of the type "+userType + ". Login is successful." + "</h3>"
              //Now hide all the screens and then show the corresponding screen. Hiding screens is necessary because on a single page the user can 
              //login twice and in that case if he logs in again a different user type, the initial screen which became visible should get hidden 
              document.getElementById('main-general-user-details').setAttribute("hidden","true")
              document.getElementById('main-hospital-or-laboratory-details').setAttribute("hidden","true")
              document.getElementById('main-doctor-details').setAttribute("hidden","true")
              document.getElementById('main-incurance-company-details').setAttribute("hidden","true")
              document.getElementById(mainId).removeAttribute("hidden")
              let g_user_name, g_user_age, g_user_address, g_user_country, g_user_phonenumber, g_user_emailaddress, h_or_l_name, h_or_l_address, h_or_l_phonenumber, h_or_l_emailaddress,
              d_name, d_speciality, d_registrationnumber, ic_name, ic_address, ic_phonenumber, ic_emailaddress
              //Now another switch case to fetch values of corresponding user from IPFS based on his IPFS and to show these values on screen
              switch (userType)
              {
                case "General User":
                  //Get data about the logged in user in different variables 
                  g_user_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserName'})
                  g_user_age = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserAge'})
                  g_user_address = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserAddress'})
                  g_user_country = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserCountry'})
                  g_user_phonenumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserPhoneNumber'})
                  g_user_emailaddress = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserEmailAddress'})
                  //Bind the variables fethched with the input textboxes on screen
                  document.getElementById('general-user-name-retrieved').value = g_user_name.value
                  document.getElementById('general-user-age-retrieved').value = g_user_age.value
                  document.getElementById('general-user-address-retrieved').value = g_user_address.value
                  document.getElementById('general-user-country-retrieved').value = g_user_country.value
                  document.getElementById('general-user-phonenumber-retrieved').value = g_user_phonenumber.value
                  document.getElementById('general-user-emailaddress-retrieved').value = g_user_emailaddress.value
                  break;
                case "Hospital or Laboratory":
                  //Get data about the logged in user in different variables 
                  h_or_l_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HosLabName'})
                  h_or_l_address = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HosLabAddress'})
                  h_or_l_phonenumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HosLabPhoneNumber'})
                  h_or_l_emailaddress = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HosLabEmailAddress'})
                  //Bind the variables fethched with the input textboxes on screen
                  document.getElementById('hospital-or-laboratory-name-retrieved').value = h_or_l_name.value
                  document.getElementById('hospital-or-laboratory-address-retrieved').value = h_or_l_address.value
                  document.getElementById('hospital-or-laboratory-phonenumber-retrieved').value = h_or_l_phonenumber.value
                  document.getElementById('hospital-or-laboratory-emailaddress-retrieved').value = h_or_l_emailaddress.value
                  break;
                case "Doctor":
                  //Get data about the logged in user in different variables 
                  d_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/DocName'})
                  d_speciality = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/DocSpeciality'})
                  d_registrationnumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/DocRegistrationnumber'})
                  //Bind the variables fethched with the input textboxes on screen
                  document.getElementById('doctor-name-retrieved').value = d_name.value
                  document.getElementById('doctor-speciality-retrieved').value = d_speciality.value
                  document.getElementById('doctor-registrationnumber-retrieved').value = d_registrationnumber.value
                  break;
                case "Insurance Company":
                  //Get data about the logged in user in different variables 
                  ic_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompName'})
                  ic_address = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompAddress'})
                  ic_phonenumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompPhoneNumber'})
                  ic_emailaddress = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompEmailAddress'})
                  //Bind the variables fethched with the input textboxes on screen
                  document.getElementById('insurance-company-name-retrieved').value = ic_name.value
                  document.getElementById('insurance-company-address-retrieved').value = ic_address.value
                  document.getElementById('insurance-company-phonenumber-retrieved').value = ic_phonenumber.value
                  document.getElementById('insurance-company-emailaddress-retrieved').value = ic_emailaddress.value
                  break;
              } 
            } 
          } catch (err) {
            showStatus(err.message, '#ea5037')
            //console.error(err)
          }
        }

        function handleComps(data) {
            console.log('getting hit')
                setComponent(data)
        }
    return (
        <div>
        <main className="pa4-l bg-snow mw7 mv5 center pa4">
            <h1 className="pa0 f2 ma0 mb4 aqua tc">User Login</h1>
            <h3>Enter Key</h3>

            <div id="login-user">
                <label for="login-key" className="f5 ma0 pb2 tracked aqua fw4 db"
                >Login Key</label
                >
                <input
                    className="input-reset bn black-80 bg-white pa3 w-100 mb3"
                    id="login-key"
                    name="login-key"
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
                    id="login-user-submit"
                    type="submit"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>

            <h3>Output</h3>
            <div id="login-user-output">Fill output here</div>
        </main>
        <main className="pa4-l bg-snow mw7 mv5 center pa4" id="main-general-user-details" hidden>
    <h1 className="pa0 f2 ma0 mb4 aqua tc">General User Screen</h1> 
    <h3>General User details</h3>
    <form id="general-user-retrieved">
    <label for="general-user-name-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
    >Name</label
    >
    <input
    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
    id="general-user-name-retrieved"
    name="general-user-name-retrieved"
    type="text"
    disabled={true}
    />

    <label for="general-user-age-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
    >Age</label
    >
    <input
    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
    id="general-user-age-retrieved"
    name="general-user-age-retrieved"
    type="text"
    disabled={true}
    />

    <label for="general-user-address-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
    >Address</label
    >
    <input
    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
    id="general-user-address-retrieved"
    name="general-user-address-retrieved"
    type="text"
    disabled={true}/>

    <label for="general-user-country-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
    >Country</label
    >
    <input
    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
    id="general-user-country-retrieved"
    name="general-user-country-retrieved"
    type="text"
    disabled={true}/>

    <label for="general-user-phonenumber-retrievedr" className="f5 ma0 pb2 tracked aqua fw4 db"
    >Phone Number</label
    >
    <input
    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
    id="general-user-phonenumber-retrieved"
    name="general-user-phonenumber-retrieved"
    type="text"
    disabled={true}
    />

    <label for="general-user-emailaddress-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
    >Email address</label>
    <input
    className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
    id="general-user-emailaddress-retrieved"
    name="general-user-emailaddress-retrieved"
    type="text"
    disabled={true}/>
  </form>
</main>

<main className="pa4-l bg-snow mw7 mv5 center pa4" id="main-hospital-or-laboratory-details" hidden>
  <h1 className="pa0 f2 ma0 mb4 aqua tc">Hospital/Laboratory Screen</h1> 
  <h3>Hospital/Laboratory details</h3>
  <form id="hospital-or-laboratory-retrieved">
  <label for="hospital-or-laboratory-name-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Name</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="hospital-or-laboratory-name-retrieved"
  name="hospital-or-laboratory-name-retrieved"
  type="text"
  disabled={true}
  />

  <label for="hospital-or-laboratory-address-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Address</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="hospital-or-laboratory-address-retrieved"
  name="hospital-or-laboratory-address-retrieved"
  type="text"
  disabled={true}/>

  <label for="hospital-or-laboratory-phonenumber-retrievedr" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Phone Number</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="hospital-or-laboratory-phonenumber-retrieved"
  name="hospital-or-laboratory-phonenumber-retrieved"
  type="text"
  disabled={true}
  />

  <label for="hospital-or-laboratory-emailaddress-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Email address</label>
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="hospital-or-laboratory-emailaddress-retrieved"
  name="hospital-or-laboratory-emailaddress-retrieved"
  type="text"
  disabled={true}/>

</form>
</main>

<main className="pa4-l bg-snow mw7 mv5 center pa4" id="main-doctor-details" hidden>
  <h1 className="pa0 f2 ma0 mb4 aqua tc">Doctor Screen</h1> 
  <h3>Doctor details</h3>
  <form id="doctor-retrieved">
  <label for="doctor-name-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Name</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="doctor-name-retrieved"
  name="doctor-name-retrieved"
  type="text"
  disabled={true}
  />

  <label for="doctor-speciality-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Doctor Speciality</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="doctor-speciality-retrieved"
  name="doctor-speciality-retrieved"
  type="text"
  disabled={true}/>

  <label for="doctor-registrationnumber-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Phone Number</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="doctor-registrationnumber-retrieved"
  name="doctor-registrationnumber-retrieved"
  type="text"
  disabled={true}
  />
</form>
</main>

<main className="pa4-l bg-snow mw7 mv5 center pa4" id="main-incurance-company-details" hidden>
  <h1 className="pa0 f2 ma0 mb4 aqua tc">Insurance Company Screen</h1> 
  <h3>Insurance Company details</h3>
  <form id="insurance-company-retrieved">
  <label for="insurance-company-name-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Name</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="insurance-company-name-retrieved"
  name="insurance-company-name-retrieved"
  type="text"
  disabled={true}
  />

  <label for="insurance-company-address-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Address</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="insurance-company-address-retrieved"
  name="insurance-company-address-retrieved"
  type="text"
  disabled={true}/>

  <label for="insurance-company-phonenumber-retrievedr" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Phone Number</label
  >
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="insurance-company-phonenumber-retrieved"
  name="insurance-company-phonenumber-retrieved"
  type="text"
  disabled={true}
  />

  <label for="insurance-company-emailaddress-retrieved" className="f5 ma0 pb2 tracked aqua fw4 db"
  >Email address</label>
  <input
  className="input-reset bn black-80 bg-white pa3 w-100 mb3 ft"
  id="insurance-company-emailaddress-retrieved"
  name="insurance-company-emailaddress-retrieved"
  type="text"
  disabled={true}/>
</form>
</main>
{genUserType ? (Comp === 'saveFile' ? <SaveFile switchProps={handleComps} />: (Comp === 'fileperms'? <FilePermissionsScreen switchProps={handleComps}/>: (Comp === 'changeConfi' ? <ChangeConfidentiality switchProps={handleComps}/>:(Comp === 'addUserPerms'? <AddUserPermissions switchProps={handleComps} />:null)))): null}
</div>
    )
}
export default Login