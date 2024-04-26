import SignInForm from "../_components/sign-in-form"

function SignInPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-6">Login to your account</h1>
      <SignInForm />
      <p className="mt-6 text-center">Already have an account? <Link className="text-blue-500 underline" href="/sign-in">Login</Link> instead</p>
      
    </div>
  )
}
export default SignInPage


