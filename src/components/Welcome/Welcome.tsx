import Link from "next/link";

function Welcome() {
  return (
    <>
      <h1>Welcome to GraphiQL Clone!</h1>
      <Link href="/auth">SignIn / SignUp Page</Link>
    </>
  )
}

export default Welcome;