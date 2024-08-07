const Footer = () => {
  return (
    <>
      <footer className="w-full p-5 text-center">
        <p className="text-sm text-muted-foreground ">
          &copy; {new Date().getFullYear()} Expense Tracker. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};
export default Footer;
