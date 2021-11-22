import React from 'react';
import { Button } from 'react-bootstrap'

function ChangeConfidentiality(props) {
 
  return (
    <div className='pa4-l bg-snow mw7 mv5 center pa4'>
      Welcome to Change Confidentiality<br/>
      <Button onClick={() => {props.switchProps('saveFile')}}>Go back to Save IPFS</Button>
    </div>
  );
}
 
export default ChangeConfidentiality;
