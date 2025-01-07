import ThemeToggle from "./shared/ThemeToggle";

const Navbar = () => {
  return (
    <div className="m-4 p-4 flex items-center justify-between bg-secondary rounded">
      <div className="">Navbar</div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
