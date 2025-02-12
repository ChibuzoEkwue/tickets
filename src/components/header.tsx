import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="container flex h-[7vh] w-full items-center justify-between border-b-[1px] border-gray-200">
      <nav className="flex w-full items-center justify-between">
        <h2 className="scroll-m-20 text-lg font-thin tracking-wide">Tix</h2>

        <ul className="hidden items-center gap-4 lg:flex">
          <li className="text-center text-base font-thin">Events</li>
          <li className="text-center text-base font-thin">Categories</li>
          <li className="text-center text-base font-thin">Wishlist</li>
        </ul>

        <Button>My tickets</Button>
      </nav>
    </header>
  );
};

export default Header;
