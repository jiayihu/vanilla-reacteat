import './HomeAddressBox.css';

import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button } from '../../../ui/Button/Button';
import { Field } from '../../../ui/Field/Field';
import { InputText } from '../../../ui/InputText/InputText';
import { InputToggle } from '../../../ui/InputToggle/InputToggle';
import { Label } from '../../../ui/Label/Label';
import { useLocalStorage } from '../../shared/hooks/use-localstorage';

export type AddressData = { address: string; locationAgreement: boolean };

type Props = {
  onSubmit: (data: AddressData) => void;
};

export function HomeAddressBox(props: Props) {
  const { onSubmit } = props;
  const [address, setAddress] = useLocalStorage('REACTEAT_ADDRESS', '');
  const [agree, setAgree] = useState(false);

  const handleAddressChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value),
    [setAddress],
  );
  const handleAgreeChange = useCallback(() => setAgree(!agree), [agree]);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
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
          <span>I agree to share my location in order to get tailored offers</span>
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
