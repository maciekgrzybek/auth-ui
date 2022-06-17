import { css } from '@stitches/core'
import { createClient } from '@supabase/supabase-js'
import { useDarkMode } from 'storybook-dark-mode'
import { Auth } from '.'
import { Button, Message } from '../UI'
import { clientUrl, clientKey } from '../../test-utils/clientDetails'

const supabase = createClient(clientUrl, clientKey)

export default {
  title: 'Auth/Apperanace',
  component: Auth,
}

const Container = (props: any) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Message>Signed in: {user.email}</Message>
        <Button onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return (
    <div style={{ maxWidth: '320px', margin: 'auto' }}>{props.children}</div>
  )
}

export const Default = (args: any) => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth
          dark={useDarkMode() ? true : false}
          supabaseClient={supabase}
          providers={['google', 'facebook']}
          appearance={{
            theme: 'supabase',
            prependedClassName: 'jonnys-awesome-login',
            variables: {
              light: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
          }}
        />
      </Container>
    </Auth.UserContextProvider>
  )
}

Default.args = {}
