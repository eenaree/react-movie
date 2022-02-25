import { useState } from 'react';

const useInput = initialState => {
  const [value, setValue] = useState(initialState);
  const onChangeValue = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return [value, onChangeValue];
};

export default useInput;
