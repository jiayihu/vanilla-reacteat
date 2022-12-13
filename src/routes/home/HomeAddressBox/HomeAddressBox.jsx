import './HomeAddressBox.css';

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from '../../../ui/Field/Field';
import { InputText } from '../../../ui/InputText/InputText';
import { Label } from '../../../ui/Label/Label';
import { InputToggle } from '../../../ui/InputToggle/InputToggle';
import { Button } from '../../../ui/Button/Button';
import { useLocalStorage } from '../../shared/hooks/use-localstorage';

export function HomeAddressBox(props) {
  const { onSubmit } = props;
  const [address, setAddress] = useLocalStorage('REACTEAT_ADDRESS', '');
  const [agree, setAgree] = useState(false);

  const handleAddressChange = useCallback((event) => setAddress(event.target.value), [setAddress]);
  const handleAgreeChange = useCallback(() => setAgree(!agree), [agree]);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit({
        address,
        locationAgreement: agree,
      });
    },
    [address, agree, onSubmit],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="home-address-box">
        <h2>Your location</h2>
        <p>In order to see available venues, please enter your address</p>
        <Field>
          <Label htmlFor="address">Your address</Label>
          <InputText id="address" value={address} onChange={handleAddressChange} />
        </Field>

        <InputToggle id="location" checked={agree} onChange={handleAgreeChange}>
          I agree to share my location in order to get tailored offers
        </InputToggle>

        <div className="mt-3">
          <Button type="submit" large block disabled={!address}>
            Show restaurants
          </Button>
        </div>
      </div>
    </form>
  );
}

HomeAddressBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
