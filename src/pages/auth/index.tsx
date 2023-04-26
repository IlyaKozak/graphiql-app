import Head from 'next/head'
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'

export default function Auth() {
  return (
    <>
      <Head>
        <title>GraphiQL Clone - Auth Page</title>
        <meta name="description" content="GraphiQL Clone - Auth Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Auth Page</h1>
      <SignIn />
      <SignUp />
    </>
  )
}