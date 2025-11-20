import AccountSection from "./sections/AccountSection";
import BasicInfoSection from "./sections/BasicInfoSection";
import TermsSection from "./sections/TermsSection";

const SignUpForm = ({
  form,
  handleChange,
  agreeTerms,
  setAgreeTerms,
  handleSubmit,
}) => {
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <AccountSection form={form} handleChange={handleChange} />
      <BasicInfoSection form={form} handleChange={handleChange} />
      <TermsSection agreeTerms={agreeTerms} setAgreeTerms={setAgreeTerms} />

      <div className="signup-actions">
        <button type="submit" className="btn-primary">
          가입하기
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
