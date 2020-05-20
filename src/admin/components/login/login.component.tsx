import React, {useState} from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';
import {VpnKey as KeyIcon} from '@material-ui/icons';
import styled from 'styled-components';
import {checkAdminCredentials} from '../../../shared/mongodbConnection';

export interface Props {
  setCredentials: (credentials: string) => void;
}

const StyledPaper = styled(Paper)({
  padding: 12,
  margin: 10,
});

const FormContainer = styled('div')({
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  display: 'flex',
});

export default function Login(props: Props) {
  const [stateCredentials, setStateCredentials] = useState<string>('');
  const [errorHint, setErrorHint] = useState<string | undefined>(undefined);
  const [checking, setChecking] = useState<boolean>(false);

  const handleCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setStateCredentials(event.target.value);
  const handleLogin = () => {
    setChecking(true);
    checkAdminCredentials(stateCredentials).then((valid: boolean) => {
      setChecking(false);
      valid
        ? props.setCredentials(stateCredentials)
        : setErrorHint('Invalid credentials.');
    });
  };

  return (
    <Grid item xs={12} md={9} lg={6} style={{flexGrow: 1}}>
      <StyledPaper>
        <FormContainer>
          <TextField
            label="Database API key"
            fullWidth
            error={!!errorHint}
            helperText={errorHint}
            disabled={checking}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            placeholder="l00k5l1kethi5..."
            value={stateCredentials}
            onChange={handleCredentialsChange}
          />
          <Button
            style={{alignSelf: 'center', marginTop: 15}}
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={checking || !stateCredentials}
          >
            Log in
          </Button>
        </FormContainer>
      </StyledPaper>
    </Grid>
  );
}
