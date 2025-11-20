const TermsSection = ({ agreeTerms, setAgreeTerms }) => {
  return (
    <section className="signup-section">
      <h3 className="section-title">약관 동의</h3>

      <div className="form-row checkbox-row">
        <input
          id="agreeTerms"
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <label htmlFor="agreeTerms">
          [필수] 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.
        </label>
      </div>
    </section>
  );
};

export default TermsSection;
