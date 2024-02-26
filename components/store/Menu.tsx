import React, { useState } from "react";
import Link from 'next/link'
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Store", url: "/" },
  { id: 2, name: "About", url: "https://www.sbcest.com" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Notebooks", doc_count: 11,  },
  { id: 2, name: "Desktops", doc_count: 8 },
  { id: 3, name: "Tablets", doc_count: 64 },
  { id: 4, name: "Gaming Components", doc_count: 107 },
];

const Menu = () => {
  const [showCatMenu, setShowCatMenu] = useState(false);

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => (
        <li
          key={item.id}
          className="cursor-pointer flex items-center gap-2 relative"
          onMouseEnter={() => {
            setShowCatMenu(item.subMenu);
          }}
          onMouseLeave={() => {
            setShowCatMenu(false);
          }}
        >
          {item.subMenu ? (
            <>
              {item.name}
              <BsChevronDown size={14} />
              {showCatMenu && (
                <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                  {subMenuData.map(({ id, name, doc_count }) => (
                    <li
                      key={id}
                      className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md"
                    >
                      {name}
                      <span className="opacity-50 text-sm">{`(${doc_count})`}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link href={item.url}>{item.name}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
