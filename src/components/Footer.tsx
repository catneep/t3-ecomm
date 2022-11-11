import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-wrap w-full items-center pt-9 pb-7 text-gray-400 bg-gray-700">
      <div className="w-full text-center">
        <Link href='https://github.com/catneep'>
          Made with ♥
        </Link>
      </div>
      <div className="w-full text-center">
        © 2022
      </div>
    </footer>
  );
}

export default Footer;