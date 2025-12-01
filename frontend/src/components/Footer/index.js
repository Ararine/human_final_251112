const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "16px 0",
        textAlign: "center",
        fontSize: "14px",
        color: "#888",
        borderTop: "1px solid #eee",
        marginTop: "40px",
      }}
    >
      © {new Date().getFullYear()} HomeFit. All rights reserved.
    </footer>
  );
};

export default Footer;
