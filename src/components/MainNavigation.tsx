import Link from "next/link";
import type NavigationItem from "../models/NavigationItem";

type NavigationProps = {
  items: Array<NavigationItem>;
};

const MainNavigation: React.FC<NavigationProps> = ({
  items
}) => {
  return (
    <nav>
      <ul>
        <li>My eComm</li>
        {
          items.map(
            (item, i) =>
              <li key={i}>
                <Link href={item.url}>
                  {item.text}
                </Link>
              </li>
          )
        }
      </ul>
    </nav>
  );
};

export default MainNavigation;